import { redisClient } from "#src/util/general/redisClient.js";
import { localRatelimitCache } from "./localRatelimitCache.js";
export async function getBucket(hash) {
  try {
    const rawBucket = await redisClient.get(`gluon.paths.${hash}`);
    if (rawBucket) {
      try {
        return JSON.parse(rawBucket);
      } catch (err) {
        console.error("Failed to parse Redis bucket:", err);
      }
    }
  } catch (error) {
    console.error("Redis error (getBucket):", error);
  }
  return localRatelimitCache.get(`gluon.paths.${hash}`) ?? null;
}
export async function setBucket(hash, bucket) {
  let expireFromCache =
    Math.ceil((bucket.reset * 1000 - Date.now()) / 1000) + 60;
  if (expireFromCache < 0) expireFromCache = 60;
  if (expireFromCache > 2592000) expireFromCache = 2592000;
  try {
    await redisClient.set(
      `gluon.paths.${hash}`,
      JSON.stringify(bucket),
      "EX",
      expireFromCache,
    );
    localRatelimitCache.set(`gluon.paths.${hash}`, bucket, expireFromCache);
  } catch (error) {
    console.error("Redis error (setBucket):", error);
    localRatelimitCache.set(`gluon.paths.${hash}`, bucket, expireFromCache);
    throw error;
  }
}
export async function handleBucket(
  ratelimitBucket,
  ratelimitRemaining,
  ratelimitReset,
  hash,
  retryAfter = 0,
) {
  if (!ratelimitBucket || !ratelimitRemaining || !ratelimitReset) return;
  const bucket = {
    remaining: retryAfter ? 0 : parseInt(ratelimitRemaining),
    reset: retryAfter
      ? Date.now() / 1000 + retryAfter
      : parseFloat(ratelimitReset),
  };
  await setBucket(hash, bucket);
}
//# sourceMappingURL=bucket.js.map
