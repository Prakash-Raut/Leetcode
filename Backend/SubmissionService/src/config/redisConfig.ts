import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "./env";

export const redisConnection = new Redis(REDIS_PORT, REDIS_HOST, {
	maxRetriesPerRequest: null,
});
