import { Queue } from "bullmq";
import { redisConnection } from "../config/redisConfig";

export const submissionQueue = new Queue("SubmissionQueue", {
	connection: redisConnection,
});
