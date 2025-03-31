export interface Bucket {
  remaining: number;
  reset: number;
}
export declare function getBucket(hash: string): Promise<Bucket | null>;
export declare function setBucket(hash: string, bucket: Bucket): Promise<void>;
export declare function handleBucket(
  ratelimitBucket: string | null,
  ratelimitRemaining: string | null,
  ratelimitReset: string | null,
  hash: string,
  retryAfter?: number,
): Promise<void>;
