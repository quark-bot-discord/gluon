const fetch = require("node-fetch");
const endpoints = require("./endpoints/endpoints");

class RequestHandler {
    constructor(baseURL, version, token) {

        this.baseURL = baseURL;
        this.version = version;
        this.requestURL = `${this.baseURL}/v${this.version}`;
        this.requestQueue = [];
        this.bucket = {};

        this.token = token;
        this.authorization = `Bot ${this.token}`;

        this.endpoints = endpoints;

        this.inProgress = [];

    }

    handleBucket(requestName, ratelimitBucket, ratelimitRemaining, ratelimitReset) {
        console.log(ratelimitBucket);
        this.bucket[ratelimitBucket] = {
            remaining: ratelimitRemaining,
            reset: ratelimitReset
        };

        this.endpoints[requestName].bucket = ratelimitBucket;

    }

    nextRequest() {

        if (this.requestQueue.length != 0) {

            const nextRequest = this.requestQueue.shift();

            this.makeRequest(nextRequest.request, nextRequest.params, nextRequest.body);

        }

    }

    async makeRequest(request, params, body) {

        if (!this.inProgress.includes(request) && !(this.bucket[this.endpoints[request].bucket]?.remaining == 0 && new Date().getTime() < this.bucket[this.endpoints[request]]?.reset)) {

            this.inProgress.push(request);

            const actualRequest = this.endpoints[request];

            const res = await fetch(`${this.requestURL}${actualRequest.path()}`, {
                method: actualRequest.method,
                headers: {
                    "Authorization": this.authorization
                }
            });
            console.log(res.status);
            const json = await res.json();
            // console.log(res.headers);
            console.log(json);
    
            this.handleBucket(request, res.headers.get("x-ratelimit-bucket"), res.headers.get("x-ratelimit-remaining"), res.headers.get("x-ratelimit-reset"));

            this.inProgress.splice(this.inProgress.indexOf(request), 1);

            this.nextRequest();

        } else {

            this.requestQueue.push({
                request: request,
                params: params,
                body: body
            });

        }

    }

}

module.exports = RequestHandler;