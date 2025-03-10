/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";
import sinon from "sinon";
import { redisClient } from "#src/util/general/redisClient.js";
import { localRatelimitCache } from "../localRatelimitCache.js";
import { getBucket, setBucket, handleBucket } from "../bucket.js";
describe("Bucket Tests", function () {
  afterEach(function () {
    sinon.restore();
  });
  describe("getBucket", function () {
    it("should return the bucket from Redis if it exists", async function () {
      const hash = "testHash";
      const bucket = { remaining: 10, reset: 1000 };
      sinon.stub(redisClient, "get").resolves(JSON.stringify(bucket));
      const result = await getBucket(hash);
      expect(result).to.deep.equal(bucket);
    });
    it("should return null if the bucket does not exist in Redis", async function () {
      const hash = "testHash";
      sinon.stub(redisClient, "get").resolves(null);
      const result = await getBucket(hash);
      expect(result).to.be.null;
    });
    it("should return the bucket from local cache if Redis fails", async function () {
      const hash = "testHash";
      const bucket = { remaining: 10, reset: 1000 };
      sinon.stub(redisClient, "get").rejects(new Error("Redis error"));
      sinon.stub(localRatelimitCache, "get").returns(bucket);
      const result = await getBucket(hash);
      expect(result).to.deep.equal(bucket);
    });
  });
  describe("setBucket", function () {
    it("should set the bucket in Redis and local cache", async function () {
      const hash = "testHash";
      const bucket = {
        remaining: 10,
        reset: new Date().getTime() / 1000 + 1000,
      };
      const redisSetStub = sinon.stub(redisClient, "set").resolves();
      const localCacheSetStub = sinon.stub(localRatelimitCache, "set");
      await setBucket(hash, bucket);
      expect(redisSetStub.calledOnce).to.be.true;
      expect(localCacheSetStub.calledOnce).to.be.true;
    });
    it("should set the bucket in local cache if Redis fails", async function () {
      const hash = "testHash";
      const bucket = {
        remaining: 10,
        reset: new Date().getTime() / 1000 + 1000,
      };
      sinon.stub(redisClient, "set").rejects(new Error("Redis error"));
      const localCacheSetStub = sinon.stub(localRatelimitCache, "set");
      try {
        await setBucket(hash, bucket);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        expect(localCacheSetStub.calledOnce).to.be.true;
      }
    });
  });
  describe("handleBucket", function () {
    it("should return early if ratelimitBucket is null", async function () {
      const result = await handleBucket(null, "10", "1000", "testHash");
      expect(result).to.be.undefined;
    });
    it("should return early if ratelimitRemaining is null", async function () {
      const result = await handleBucket("bucket", null, "1000", "testHash");
      expect(result).to.be.undefined;
    });
    it("should return early if ratelimitReset is null", async function () {
      const result = await handleBucket("bucket", "10", null, "testHash");
      expect(result).to.be.undefined;
    });
  });
});
//# sourceMappingURL=bucket.spec.js.map
