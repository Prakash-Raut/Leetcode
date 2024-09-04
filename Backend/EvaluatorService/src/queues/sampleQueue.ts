import { Queue } from "bullmq";
import { redisConnection } from "../config/redisConfig";

export const sampleQueue = new Queue("SampleQueue", {
	connection: redisConnection,
});
