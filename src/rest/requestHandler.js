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

        this.delayInitiated = false;

    }

    /**
     * Sets the bucket information, should be called after every request to keep data up-to-date
     * @param {string} requestName Name of the request, defined in ./endpoints.js
     * @param {string} ratelimitBucket Ratelimit bucket id
     * @param {integer} ratelimitRemaining Number of requests remaining until 429s will be hit
     * @param {integer} ratelimitReset Unix timestamp of when the ratelimitRemaining will reset
     */
    handleBucket(requestName, ratelimitBucket, ratelimitRemaining, ratelimitReset) {

        this.bucket[ratelimitBucket] = {
            remaining: ratelimitRemaining,
            reset: parseFloat(ratelimitReset)
        };

        /* sets the bucket id of the endpoint that was just requested */
        /* bucket ids can be the same per endpoint */
        /* they can also change without notice */
        /* best to keep updating it to ensure it always stays up-to-date for each endpoint */
        /* crucial for if the bot is running for extended periods of time without restarts too */
        this.endpoints[requestName].bucket = ratelimitBucket;

    }

    /**
    * Attempts the next queued request and removes the current one from the "in-progress" list
    */
    nextRequest() {

        /* if there are remaining requests in the request queue, they can be attempted */
        if (this.requestQueue.length != 0) {

            const nextRequest = this.requestQueue.shift();
            this.makeRequest(nextRequest.request, nextRequest.params, nextRequest.body, nextRequest.resolve, nextRequest.reject);

        }

    }

    /**
     * Makes the request if possible, otherwise will queue the request for later
     * @param {string} request Name of the request, defined in ./endpoints.js
     * @param {string[]} params Array of params to include in the URL, in the order they should be in
     * @param {object} body The request body
     */
    async makeRequest(request, params, body, resolve, reject) {
        return new Promise(async (_resolve, _reject) => {

            /* if there are none of the same bucket (or request if bucket is null) in progress, and also that the bucket has requests remaining */
            if (
                /* checks if there is actually a set bucket id for this request yet */
                /* there won't be if this is the first request */
                (this.endpoints[request].bucket != null ?
                    !this.inProgressBuckets.includes(this.endpoints[request].bucket) :
                    /* if there isn't, simply check the requests that are in progress */
                    /* this should not be completely relied on as I believe bucket ids *can* also vary on the same endpoint */
                    /* but with different params */
                    /* either way, the bucket id is the only truly reliable way of monitoring ratelimits */
                    !this.inProgressRequests.includes(request)
                )
                &&
                /* again, check if there is a valid bucket id attached to this request */
                (this.endpoints[request].bucket != null ?
                    /* now check if there are greater than 0 remaining requests available for this bucket */
                    (this.bucket[this.endpoints[request].bucket]?.remaining != 0 ?
                        /* if there are, this should return true so the request can be made */
                        (true) :
                        /* otherwise check if the bucket reset time has reset */
                        /* which would reset our remaining requests back to the original value */
                        /* so we can proceed with the request if this is the case */
                        ((new Date().getTime() / 1000) > this.bucket[this.endpoints[request].bucket]?.reset)) :
                    /* yeah im so lost but i am 99% sure this works */
                    (true)
                )
            ) {
                /* add the current request to the "in-progress" list*/
                /* only one request of each bucket id should ever take place at a time */
                this.inProgressRequests.push(request);
                if (this.endpoints[request].bucket)
                    this.inProgressBuckets.push(this.endpoints[request].bucket);
                /* fetch the request data from ./endpoints.js */
                /* important it is fetched from there, as bucket ids are also stored there with that data */
                const actualRequest = this.endpoints[request];
                /* actually make the request */
                const res = await fetch(`${this.requestURL}${actualRequest.path()}`, {
                    method: actualRequest.method,
                    headers: {
                        "Authorization": this.authorization
                    }
                });
                // console.log(res.status);
                const json = await res.json();

                /* update the bucket data */
                this.handleBucket(request, res.headers.get("x-ratelimit-bucket"), res.headers.get("x-ratelimit-remaining"), res.headers.get("x-ratelimit-reset"));

                /* stops blocking new requests made */
                /* ideally, the next request that should be made should be one in the queue */
                /* however, at just the wrong timing, a newer request can "slip in" */
                /* not the largest issue in the world, but it makes sense to follow the queue */
                /* so removing the current request from the "in-progress" list should be done as late as possible */
                this.inProgressRequests.splice(this.inProgressRequests.indexOf(request), 1);
                if (this.endpoints[request].bucket)
                    this.inProgressBuckets.splice(this.inProgressBuckets.indexOf(this.endpoints[request].bucket), 1);

                this.nextRequest();

                if (res.status >= 200 && res.status < 300)
                    return resolve ? resolve(json) : _resolve(json);
                else
                    return reject ? reject(json) : _reject(json);

            } else {
                /* i am wondering if it would make more sense to have a request queue per bucket id? */
                this.requestQueue.push({
                    request: request,
                    params: params,
                    body: body,
                    resolve: resolve ? resolve : _resolve,
                    reject: reject ? reject : _reject
                });

                if (this.delayInitiated == false) {

                    this.delayInitiated = true;

                    setTimeout((async () => {

                        this.delayInitiated = false;
                        this.nextRequest();

                    }), 1000);

                }

            }

        });
    }

}

module.exports = RequestHandler;