async function getBucket(client, localRatelimitCache, hash) {

    if (client.redis) {

        try {

            let rawBucket = await client.redis.get(`gluon.paths.${hash}`) || "{}";

            return JSON.parse(rawBucket);

        } catch (error) {

            console.log(error);

            return localRatelimitCache.get(`gluon.paths.${hash}`);

        }

    } else
        return localRatelimitCache.get(`gluon.paths.${hash}`);

}

module.exports = getBucket;