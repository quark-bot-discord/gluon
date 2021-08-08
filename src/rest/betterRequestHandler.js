const fetch = require("node-fetch");
const FormData = require("form-data");
const { createReadStream } = require("fs");
const RequestQueue = require("request-queue");
const { default: Bottleneck } = require("bottleneck");

class BetterRequestHandler {

    constructor(client, baseURL, name, version, token) {

        console.log("BETTER REQUEST HANDLER");

        this.client = client;

        this.baseURL = baseURL;
        this.version = version;
        this.requestURL = `${this.baseURL}/v${this.version}`;
        this.requestQueue = new RequestQueue(this.client.redis);

        this.token = token;
        this.authorization = `Bot ${this.token}`;
        this.name = name;

        this.limiter = {};

        this.endpoints = require("./endpoints");

        this.requestQueue.on("next", (routePath, data) => {
            try {
                this.http(routePath, data.request, data.params, data.body, data.stack, data.resolve, data.reject);
            } catch (_) {

            }
        });

    }

    async handleBucket(ratelimitBucket, ratelimitRemaining, ratelimitReset, method, path) {

        if (!ratelimitBucket)
            return;

        const bucket = {
            remaining: parseInt(ratelimitRemaining),
            reset: parseFloat(ratelimitReset),
            bucket: ratelimitBucket
        };

        await this.client.redis.set(`gluon.paths.${path}.${method}`, JSON.stringify(bucket), "EX", Math.ceil(ratelimitReset - (new Date().getTime() / 1000)) + 2);

    }

    async makeRequest(request, params, body, resolve, reject) {
        return new Promise(async (_resolve, _reject) => {

            const actualRequest = this.endpoints[request];

            const path = actualRequest.path(params);

            const pathMethod = `${actualRequest.method}_${path}`;

            if (!this.limiter[pathMethod])
                this.limiter[pathMethod] = new Bottleneck({ maxConcurrent: 1, minTime: 500 });

            let stack;
            try {
                throw new Error("Stack trace");
            } catch (e) {
                stack = e.stack;
            }

            this.limiter[pathMethod].schedule(() => this.requestQueue.add(pathMethod, {
                request: request,
                params: params,
                body: body,
                resolve: resolve ? resolve : _resolve,
                reject: reject ? reject : _reject,
                stack: stack
            }));

        });
    }

    async http(routePath, request, params, body, stack, resolve, reject) {

        const actualRequest = this.endpoints[request];

        const path = actualRequest.path(params);

        const bucket = JSON.parse(await this.client.redis.get(`gluon.paths.${path}.${actualRequest.method}`) || "{}") || {};

        if (!bucket || bucket.remaining != 0 || (bucket.remaining == 0 && (new Date().getTime() / 1000) > bucket.reset)) {

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

            await this.handleBucket(res.headers.get("x-ratelimit-bucket"), res.headers.get("x-ratelimit-remaining"), res.headers.get("x-ratelimit-reset"), actualRequest.method, path);

            if (res.status >= 200 && res.status < 300)
                resolve(json);
            else {
                const requestResult = {
                    status: res.status,
                    json: json,
                    method: actualRequest.method,
                    endpoint: actualRequest.path(params),
                    shards: this.client.shardIds,
                    stack: stack
                };
                reject(requestResult);
            }

            this.requestQueue.completed(routePath);

        } else
            this.limiter[routePath].schedule(() => this.requestQueue.retryLater(routePath, false, ((bucket.reset + 2) - (new Date().getTime() / 1000))));
    }

}

module.exports = BetterRequestHandler;