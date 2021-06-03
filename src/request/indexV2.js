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

    tryRequests() {

        let counter = 0;
        
        while (counter < this.requestQueue.length) {
            console.log(2);
            if (this.token) {
                console.log(1);
                if (this.bucket[this.endpoints[this.requestQueue[counter].request].bucket]?.remaining == 0 && new Date().getTime() < this.bucket[this.endpoints[this.requestQueue[counter].request]]?.reset) {

                    const requestItem = this.requestQueue.shift();
                    this.requestQueue.push(requestItem);

                } else {
                    console.log(this.requestQueue[counter]);
                    const requestToMake = this.requestQueue[counter];
                    this.requestQueue.splice(counter, 1);
                    Promise.all([this.makeRequest(requestToMake)]);

                }

                counter++;


            }

        }

    }

    handleBucket(requestName, ratelimitBucket, ratelimitRemaining, ratelimitReset) {
        console.log(ratelimitBucket);
        this.bucket[ratelimitBucket] = {
            remaining: ratelimitRemaining,
            reset: ratelimitReset
        };

        this.endpoints[requestName].bucket = ratelimitBucket;

    }

    addRequest(req, params, body) {

        this.requestQueue.push({
            request: req,
            params: params,
            body: body
        });

        this.tryRequests();

    }

    nextRequest() {

        

    }

    async makeRequest(request, params, body) {

        if (!this.inProgress.includes(request)) {

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