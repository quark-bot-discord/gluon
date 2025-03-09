export interface Bucket {
  remaining: number;
  reset: number;
}
/**
 * Retrieves a bucket from the Redis cache using the provided hash.
 * If the bucket is not found in Redis, an empty object is returned.
 * In case of an error, it retrieves the bucket from the local rate limit cache.
 *
 * @param {string} hash - The hash key used to identify the bucket in the cache.
 * @returns {Promise<object>} - A promise that resolves to the bucket object.
 */
export declare function getBucket(hash: string): Promise<Bucket | null>;
/**
 * Sets a bucket in both Redis and local cache with an expiration time.
 *
 * @param {string} hash - The unique identifier for the bucket.
 * @param {Bucket} bucket - The bucket object containing rate limit information.
 * @returns {Promise<void>} A promise that resolves when the bucket is set.
 *
 * The expiration time is calculated based on the bucket's reset time.
 * If the calculated expiration time is less than 0, it defaults to 60 seconds.
 * If the calculated expiration time is greater than 2592000 seconds (30 days), it defaults to 2592000 seconds.
 *
 * In case of an error while setting the bucket in Redis, the bucket is still set in the local cache,
 * and the error is rethrown.
 *
 * @throws Will throw an error if setting the bucket in Redis fails.
 */
export declare function setBucket(hash: string, bucket: Bucket): Promise<void>;
/**
 * Handles the rate limit bucket by setting its remaining requests and reset time.
 *
 * @param ratelimitBucket - The identifier for the rate limit bucket. If null, the function returns early.
 * @param ratelimitRemaining - The number of remaining requests in the rate limit bucket. If null, the function returns early.
 * @param ratelimitReset - The time at which the rate limit bucket will reset. If null, the function returns early.
 * @param hash - A unique identifier for the bucket.
 * @param retryAfter - The time in seconds to wait before retrying the request. Defaults to 0.
 *
 * @returns A promise that resolves when the bucket has been set.
 */
export declare function handleBucket(
  ratelimitBucket: string | null,
  ratelimitRemaining: string | null,
  ratelimitReset: string | null,
  hash: string,
  retryAfter?: number,
): Promise<void>;
