const fetch = require("node-fetch");
const endpoints = require("./endpoints");

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

        this.inProgressRequests = [];
        this.inProgressBuckets = [];

    }

    handleBucket(requestName, ratelimitBucket, ratelimitRemaining, ratelimitReset) {

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
        
        // if there are none of the same bucket (or request if bucket is null) in progress, and also that the bucket has requests remaining
        if (
            (this.endpoints[request].bucket != null ? !this.inProgressBuckets.includes(this.endpoints[request].bucket) : !this.inProgressRequests.includes(request))
            &&
            (this.endpoints[request].bucket != null ? 
                (this.bucket[this.endpoints[request].bucket]?.remaining != 0 ?
                    (true) :
                    (new Date().getTime() > this.bucket[this.endpoints[request]]?.reset)) : 
                (true))
            ) {

            this.inProgressRequests.push(request);

            if (this.endpoints[request].bucket) 
                this.inProgressBuckets.push(this.endpoints[request].bucket);
            
            const actualRequest = this.endpoints[request];

            const res = await fetch(`${this.requestURL}${actualRequest.path()}`, {
                method: actualRequest.method,
                headers: {
                    "Authorization": this.authorization
                }
            });
            console.log(res.status);
            const json = await res.json();
            console.log(json);
            this.inProgressRequests.splice(this.inProgressRequests.indexOf(request), 1);

            if (this.endpoints[request].bucket)
                this.inProgressBuckets.splice(this.inProgressBuckets.indexOf(this.endpoints[request].bucket), 1);

            this.handleBucket(request, res.headers.get("x-ratelimit-bucket"), res.headers.get("x-ratelimit-remaining"), res.headers.get("x-ratelimit-reset"));

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