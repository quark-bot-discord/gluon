const fetch = require("node-fetch");
const FormData = require("form-data");
const { createReadStream } = require("fs");
const RequestQueue = require("request-queue");
const calculateHash = require("hash.js/lib/hash/sha/256");
const NodeCache = require("node-cache");
const { VERSION } = require("../..");

class BetterRequestHandler {

    constructor(client, baseURL, name, version, token) {

        this.client = client;

        this.baseURL = baseURL;
        this.version = version;
        this.requestURL = `${this.baseURL}/v${this.version}`;
        this.requestQueue = new RequestQueue();
        if (!this.client.redis)
            this.localRatelimitCache = new NodeCache({ stdTTL: 60, checkperiod: 60 });

        this.token = token;
        this.authorization = `Bot ${this.token}`;
        this.name = name;

        this.latency = 1;

        this.endpoints = require("./endpoints");

        this.requestQueue.on("next", (hash, data) => {
            try {
                this.http(hash, data.request, data.params, data.body, data.resolve, data.reject);
            } catch (_) {

            }
        });

    }

    async handleBucket(ratelimitBucket, ratelimitRemaining, ratelimitReset, hash) {

        if (!ratelimitBucket)
            return;

        const bucket = {
            remaining: parseInt(ratelimitRemaining),
            reset: parseFloat(ratelimitReset),
            bucket: ratelimitBucket
        };

        const expireFromCache = Math.ceil((ratelimitReset + this.latency) - (new Date().getTime() / 1000)) + 60;

        this.client.redis ?
            await this.client.redis.set(`gluon.paths.${hash}`, JSON.stringify(bucket), "EX", expireFromCache)
            : this.localRatelimitCache.set(`gluon.paths.${hash}`, bucket, expireFromCache);

    }

    async makeRequest(request, params, body, resolve, reject) {
        return new Promise(async (_resolve, _reject) => {

            const actualRequest = this.endpoints[request];

            let toHash = actualRequest.method + actualRequest.path([]);
            if (params)
                toHash += (params.map((value, index) => {
                    if (actualRequest.majorParams.includes(index))
                        return value;
                // eslint-disable-next-line quotes
                }).join(''));
            const hash = calculateHash().update(toHash).digest("hex");

            this.requestQueue.add(hash, {
                request: request,
                params: params,
                body: body,
                resolve: resolve ? resolve : _resolve,
                reject: reject ? reject : _reject
            });

        });
    }

    async http(hash, request, params, body, resolve, reject) {

        const actualRequest = this.endpoints[request];

        const path = actualRequest.path(params);

        let bucket;
        if (this.client.redis)
            bucket = JSON.parse(await this.client.redis.get(`gluon.paths.${hash}`) || "{}");
        else
            bucket = this.localRatelimitCache.get(`gluon.paths.${hash}`);

        if (!bucket || bucket.remaining != 0 || (bucket.remaining == 0 && (new Date().getTime() / 1000) > bucket.reset + this.latency)) {

            const serialize = (obj) => {
                let str = [];
                for (let p in obj)
                    if (obj.hasOwnProperty(p))
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            };

            let headers = {
                "Authorization": this.authorization,
                "User-Agent": `DiscordBot (${require("../../package.json").repository.url.slice(4)}, ${VERSION}) ${this.name}`,
                "Accept": "application/json"
            };

            let form;
            if (body && body.files) {
                form = new FormData();
                for (let i = 0; i < body.files.length; i++)
                    form.append(body.files[i].name, body.files[i].stream ? body.files[i].stream : createReadStream(body.files[i].attachment), body.files[i].name);
                delete body.files;
                form.append("payload_json", JSON.stringify(body));
                Object.assign(headers, form.getHeaders());
            } else if (actualRequest.method != "GET" && actualRequest.method != "DELETE")
                headers["Content-Type"] = "application/json";

            if (actualRequest.useHeaders)
                for (const [key, value] of Object.entries(body))
                    headers[key] = encodeURIComponent(value);

            /* actually make the request */
            const res = await fetch(`${this.requestURL}${path}${body && (actualRequest.method == "GET" || actualRequest.method == "DELETE") && actualRequest.useHeaders != true ? "?" + serialize(body) : ""}`, {
                method: actualRequest.method,
                headers: headers,
                body: form ? form : (body && (actualRequest.method != "GET" && actualRequest.method != "DELETE") && actualRequest.useHeaders != true ? JSON.stringify(body) : undefined),
                compress: true
            });

            let json;

            try {

                json = await res.json();

            } catch (error) {

                json = null;

            }

            await this.handleBucket(res.headers.get("x-ratelimit-bucket"), res.headers.get("x-ratelimit-remaining"), res.headers.get("x-ratelimit-reset"), hash);

            if (res.ok)
                resolve(json);
            else {
                const requestResult = {
                    status: res.status,
                    json: json,
                    method: actualRequest.method,
                    endpoint: actualRequest.path(params),
                    shards: this.client.shardIds
                };
                reject(requestResult);
            }

            this.client.emit("requestCompleted", { status: res.status, method: actualRequest.method, endpoint: actualRequest.path(params), hash: hash });

            this.requestQueue.completed(hash);

        } else {
            let retryNextIn = Math.ceil(bucket.reset - (new Date().getTime() / 1000));
            if (retryNextIn < 1)
                retryNextIn = 1;
            this.requestQueue.retryLater(hash, false, retryNextIn);
        }
    }

}

module.exports = BetterRequestHandler;