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
            reset: ratelimitReset
        };

        /* sets the bucket id of the endpoint that was just requested */
        /* bucket ids can be the same per endpoint */
        /* they can also change without notice */
        /* best to keep updating it to ensure it always stays up-to-date for each endpoint */
        /* crucial for if the bot is running for extended periods of time without restarts too */
        this.endpoints[requestName].bucket = ratelimitBucket;

    }

    /**
    * Attempts the next queued request and removed the current one from the "in-progress" list
    */
    nextRequest(currentRequest) {
        /* stops blocking new requests made */
        /* ideally, the next request that should be made should be one in the queue */
        /* however, at just the wrong timing, a newer request can "slip in" */
        /* not the largest issue in the world, but it makes sense to follow the queue */
        /* so removing the current request from the "in-progress" list should be done as late as possible */
        if (currentRequest) {
            this.inProgressRequests.splice(this.inProgressRequests.indexOf(currentRequest), 1);
            if (this.endpoints[currentRequest].bucket)
                this.inProgressBuckets.splice(this.inProgressBuckets.indexOf(this.endpoints[currentRequest].bucket), 1);
        }

        /* if there are remaining requests in the request queue, they can be attempted */
        if (this.requestQueue.length != 0) {

            const nextRequest = this.requestQueue.shift();

            this.makeRequest(nextRequest.request, nextRequest.params, nextRequest.body);

        }

    }
    /* and we'll need to call this function some other way too in order to clear the remaining requests queue */
    /* otherwise requests become stagnant until more requests are made (which is obviously not what we want) */
    /* currently is only ever called at the end of a request */

    /**
     * Makes the request if possible, otherwise will queue the request for later
     * @param {string} request Name of the request, defined in ./endpoints.js
     * @param {string[]} params Array of params to include in the URL, in the order they should be in
     * @param {object} body The request body
     */
    async makeRequest(request, params, body) {
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
                    (new Date().getTime() > this.bucket[this.endpoints[request]]?.reset)) :
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
            console.log(res.status);
            const json = await res.json();
            console.log(json);

            /* update the bucket data */
            this.handleBucket(request, res.headers.get("x-ratelimit-bucket"), res.headers.get("x-ratelimit-remaining"), res.headers.get("x-ratelimit-reset"));
            /* prompts the next request */
            this.nextRequest(request);
            /* the request also needs to be returned */
            /* we need to figure out how to return data from delayed requests too, because this queuing system makes it quite a challenge */
            /* im thinking we could have a separate fetchData() function which will fetch data and return it */
            /* and then just leave this one to make a requests but not fetch data */
            /* the fetchData() function would ideally be less clogged up, run on the exact same system as this function, but we could include timing functions to delay requests and slow it down */
            /* though we still need to figure this one out */
        } else {
            /* i am wondering if it would make more sense to have a request queue per bucket id? */
            this.requestQueue.push({
                request: request,
                params: params,
                body: body
            });

        }

    }

}

module.exports = RequestHandler;