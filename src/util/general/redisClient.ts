import { Redis } from "ioredis";

const redisClient = new Redis({
  host: process.env.GLUON_REDIS_HOST,
  port: process.env.GLUON_REDIS_PORT
    ? parseInt(process.env.GLUON_REDIS_PORT as string)
    : undefined,
});

export default redisClient;
