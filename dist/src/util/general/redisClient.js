import { Redis } from "ioredis";
export const redisClient = new Redis({
  host: process.env.GLUON_REDIS_HOST,
  port: process.env.GLUON_REDIS_PORT
    ? parseInt(process.env.GLUON_REDIS_PORT)
    : undefined,
});
//# sourceMappingURL=redisClient.js.map
