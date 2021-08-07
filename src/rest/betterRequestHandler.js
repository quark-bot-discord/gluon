const fetch = require("node-fetch");
const FormData = require("form-data");
const { createReadStream } = require("fs");
const RequestQueue = require("request-queue");

class BetterRequestHandler {

    constructor(client, baseURL, name, version, token) {

        console.log("BETTER REQUEST HANDLER");

        this.client = client;

        this.baseURL = baseURL;
        this.version = version;
        this.requestURL = `${this.baseURL}/v${this.version}`;
        this.requestQueue = new RequestQueue({ TTL: 60 });

        this.token = token;
        this.authorization = `Bot ${this.token}`;
        this.name = name;

        this.endpoints = require("./endpoints");

        this.requestQueue.on("next", (bucket, data) => {
            try {
                this.http(data.request, data.params, data.body, data.resolve, data.reject);
            } catch (_) {

            } finally {
                this.requestQueue.completed(bucket);
            }
        });

    }

    handleBucket(ratelimitBucket, ratelimitRemaining, ratelimitReset, method, path) {

        if (!ratelimitBucket)
            return;

        const bucket = {
            remaining: parseInt(ratelimitRemaining),
            reset: parseFloat(ratelimitReset)
        };

        this.client.redis.set(`gluon.buckets.${ratelimitBucket}`, JSON.stringify(bucket), "EX", Math.ceil(ratelimitReset - (new Date().getTime() / 1000)));

        this.client.redis.set(`gluon.paths.${path}.${method}`, ratelimitBucket, "EX", Math.ceil(ratelimitReset - (new Date().getTime() / 1000)));

    }

    async makeRequest(request, params, body, resolve, reject) {
        return new Promise(async (_resolve, _reject) => {

            const actualRequest = this.endpoints[request];

            const path = actualRequest.path(params);

            const bucket = await this.client.redis.get(`gluon.paths.${path}.${actualRequest.method}`);

            this.requestQueue.add(bucket, {
                request: request,
                params: params,
                body: body,
                resolve: resolve ? resolve : _resolve,
                reject: reject ? reject : _reject
            });

        });
    }

    async http(request, params, body, resolve, reject) {

        const actualRequest = this.endpoints[request];

        const path = actualRequest.path(params);

        const bucket = await this.client.redis.get(`gluon.paths.${path}.${actualRequest.method}`);

        let bucketInfo;
        if (bucket) {
            bucketInfo = await this.client.redis.get(`gluon.buckets.${bucket}`);
            if (bucketInfo)
                bucketInfo = JSON.parse(bucketInfo);
        }

        if (!bucketInfo || bucketInfo.remaining != 0 || (bucketInfo.remaining == 0 && (new Date().getTime() / 1000) > bucketInfo.reset)) {

            const serialize = (obj) => {
                let str = [];
                for (let p in obj)
                    if (obj.hasOwnProperty(p))
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            };

            let headers = {
                "Authorization": this.authorization,
                "User-Agent": this.name,
                "Accept": "application/json"
            };

            let form;
            if (body && body.files) {
                form = new FormData();
                for (let i = 0; i < body.files.length; i++)
                    form.append(body.files[i].name, createReadStream(body.files[i].attachment), body.files[i].name);
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

            this.handleBucket(res.headers.get("x-ratelimit-bucket"), res.headers.get("x-ratelimit-remaining"), res.headers.get("x-ratelimit-reset"), actualRequest.method, path);

            if (res.status >= 200 && res.status < 300)
                return resolve(json);
            else {
                const requestResult = {
                    status: res.status,
                    json: json,
                    method: actualRequest.method,
                    endpoint: actualRequest.path(params),
                    shards: this.client.shardIds
                };
                return reject(requestResult);
            }

        } else
            this.requestQueue.retryLater(bucket, false, bucketInfo.reset - (new Date().getTime() / 1000));

    }

}

module.exports = BetterRequestHandler;