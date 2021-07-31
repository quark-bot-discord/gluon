const fetch = require("node-fetch");
const FormData = require("form-data");
const endpoints = require("./endpoints");
const { createReadStream } = require("fs");
const NodeCache = require("node-cache");

class RequestHandler {

    constructor(baseURL, name, version, token) {

        this.baseURL = baseURL;
        this.version = version;
        this.requestURL = `${this.baseURL}/v${this.version}`;
        this.requestQueue = [];
        this.bucket = new NodeCache({ checkperiod: 60, stdTTL: 600 });

        this.token = token;
        this.authorization = `Bot ${this.token}`;
        this.name = name;

        this.endpoints = endpoints;

        this.inProgressRequests = [];
        this.inProgressBuckets = [];

        this.delayInitiated = false;

        this.buckets = new NodeCache({ checkperiod: 60, stdTTL: 600 });

    }

    /**
     * Sets the bucket information, should be called after every request to keep data up-to-date
     * @param {string} ratelimitBucket Ratelimit bucket id
     * @param {integer} ratelimitRemaining Number of requests remaining until 429s will be hit
     * @param {integer} ratelimitReset Unix timestamp of when the ratelimitRemaining will reset
     */
    handleBucket(ratelimitBucket, ratelimitRemaining, ratelimitReset, path) {

        if (!ratelimitBucket)
            return;

        const bucket = {
            remaining: ratelimitRemaining,
            reset: parseFloat(ratelimitReset)
        };

        this.bucket.set(ratelimitBucket, bucket, Math.ceil(ratelimitReset - new Date().getTime() / 1000));

        /* sets the bucket id of the endpoint that was just requested */
        /* bucket ids can be the same per endpoint */
        /* they can also change without notice */
        /* best to keep updating it to ensure it always stays up-to-date for each endpoint */
        /* crucial for if the bot is running for extended periods of time without restarts too */
        this.buckets.set(path, ratelimitBucket, Math.ceil(ratelimitReset - new Date().getTime() / 1000));

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
     * @param {function} resolve The function to resolve the promise, so the data can be returned to the correct place
     * @param {function} reject The function to reject the promise, to make clear the request has failed
     */
    async makeRequest(request, params, body, resolve, reject) {
        return new Promise(async (_resolve, _reject) => {

            /* fetch the request data from ./endpoints.js */
            /* important it is fetched from there, as bucket ids are also stored there with that data */
            const actualRequest = this.endpoints[request];

            /* determines the path of the request, needed for handling ratelimit buckets */
            const path = actualRequest.path(params);

            const bucket = this.buckets.get(path);

            /* if there are none of the same bucket (or request if bucket is null) in progress, and also that the bucket has requests remaining */
            if (
                /* checks if there is actually a set bucket id for this request yet */
                /* there won't be if this is the first request */
                (bucket ?
                    !this.inProgressBuckets.includes(bucket) :
                    /* if there isn't, simply check the requests that are in progress */
                    /* this should not be completely relied on as I believe bucket ids *can* also vary on the same endpoint */
                    /* but with different params */
                    /* either way, the bucket id is the only truly reliable way of monitoring ratelimits */
                    !this.inProgressRequests.includes(path)
                )
                &&
                /* again, check if there is a valid bucket id attached to this request */
                (bucket ?
                    /* now check if there are greater than 0 remaining requests available for this bucket */
                    (this.bucket.get(bucket)?.remaining != 0 ?
                        /* if there are, this should return true so the request can be made */
                        (true) :
                        /* otherwise check if the bucket reset time has reset */
                        /* which would reset our remaining requests back to the original value */
                        /* so we can proceed with the request if this is the case */
                        (((new Date().getTime() / 1000) - 2) > this.bucket.get(bucket)?.reset)) :
                    /* yeah im so lost but i am 99% sure this works */
                    (true)
                )
            ) {
                /* add the current request to the "in-progress" list*/
                /* only one request of each bucket id should ever take place at a time */
                this.inProgressRequests.push(path);
                if (bucket)
                    this.inProgressBuckets.push(bucket);

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
                        headers[key] = value;

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

                /* update the bucket data */
                this.handleBucket(res.headers.get("x-ratelimit-bucket"), res.headers.get("x-ratelimit-remaining"), res.headers.get("x-ratelimit-reset"), path);

                /* stops blocking new requests made */
                /* ideally, the next request that should be made should be one in the queue */
                /* however, at just the wrong timing, a newer request can "slip in" */
                /* not the largest issue in the world, but it makes sense to follow the queue */
                /* so removing the current request from the "in-progress" list should be done as late as possible */
                this.inProgressRequests.splice(this.inProgressRequests.indexOf(path), 1);
                if (bucket)
                    this.inProgressBuckets.splice(this.inProgressBuckets.indexOf(bucket), 1);

                this.nextRequest();

                if (res.status >= 200 && res.status < 300)
                    return resolve ? resolve(json) : _resolve(json);
                else {
                    if (res.status == 429)
                        this.handleBucket(res.headers.get("x-ratelimit-bucket"), 0, (new Date().getTime() / 1000) + json.retry_after + 5, path);
                    const requestResult = {
                        status: res.status,
                        json: json,
                        method: actualRequest.method,
                        endpoint: actualRequest.path(params)
                    };
                    return reject ? reject(requestResult) : _reject(requestResult);
                }

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