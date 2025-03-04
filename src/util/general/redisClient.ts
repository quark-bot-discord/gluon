import { Redis } from "ioredis";

if (!process.env.GLUON_REDIS_HOST) {
  throw new Error("GLUON_REDIS_HOST is not defined");
}

if (!process.env.GLUON_REDIS_PORT) {
  throw new Error("GLUON_REDIS_PORT is not defined");
}

const redisClient = new Redis({
  host: process.env.GLUON_REDIS_HOST,
  port: parseInt(process.env.GLUON_REDIS_PORT as string),
});

export default redisClient;
