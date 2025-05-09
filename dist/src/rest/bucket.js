import { redisClient } from "#src/util/general/redisClient.js";
import { localRatelimitCache } from "./localRatelimitCache.js";
export async function getBucket(hash) {
  const key = `gluon.paths.${hash}`;
  try {
    const rawBucket = await redisClient.get(key);
    if (rawBucket) {
      try {
        return JSON.parse(rawBucket);
      } catch (err) {
        console.error("[Bucket] Failed to parse Redis value:", err);
      }
    }
  } catch (error) {
    console.error("[Bucket] Redis error in getBucket:", error);
  }
  const fallback = localRatelimitCache.get(key) ?? null;
  if (fallback) {
    console.warn("[Bucket] Using local cache for bucket:", hash);
  }
  return fallback;
}
export async function setBucket(hash, bucket) {
  const key = `gluon.paths.${hash}`;
  let expireFromCache =
    Math.ceil((bucket.reset * 1000 - Date.now()) / 1000) + 60;
  if (expireFromCache < 0) expireFromCache = 60;
  if (expireFromCache > 2592000) expireFromCache = 2592000;
  try {
    await redisClient.set(key, JSON.stringify(bucket), "EX", expireFromCache);
    localRatelimitCache.set(key, bucket, expireFromCache);
  } catch (error) {
    console.error("[Bucket] Redis error in setBucket:", error);
    localRatelimitCache.set(key, bucket, expireFromCache);
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
  if (!ratelimitBucket || !ratelimitRemaining || !ratelimitReset) {
    console.warn("[Bucket] Missing headers: ", {
      ratelimitBucket,
      ratelimitRemaining,
      ratelimitReset,
    });
    return;
  }
  const remaining = parseInt(ratelimitRemaining);
  const reset = retryAfter
    ? Date.now() / 1000 + retryAfter
    : parseFloat(ratelimitReset);
  const bucket = {
    remaining: isNaN(remaining) ? 1 : remaining,
    reset: Number.isFinite(reset) ? reset : Date.now() / 1000 + 1,
  };
  await setBucket(hash, bucket);
}
//# sourceMappingURL=bucket.js.map
