async function getBucket(client, localRatelimitCache, hash) {
  if (client.redis) {
    try {
      const rawBucket = await client.redis.get(`gluon.paths.${hash}`);

      if (rawBucket) return JSON.parse(rawBucket);
      else return {};
    } catch (error) {
      console.error(error);

      return localRatelimitCache.get(`gluon.paths.${hash}`);
    }
  } else return localRatelimitCache.get(`gluon.paths.${hash}`);
}

export default getBucket;
