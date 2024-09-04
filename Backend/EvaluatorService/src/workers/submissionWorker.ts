import { Job, Worker } from "bullmq";
import { redisConnection } from "../config/redisConfig";
import { SubmissionJob } from "../jobs/submissionJob";

export function submissionWorker(queueName: string) {
	new Worker(
		queueName,
		async (job: Job) => {
			console.log("SubmissionJob job worker kicking");

			if (job.name === "SubmissionJob") {
				const submissionJobInstance = new SubmissionJob(job.data);

				console.log("Calling job handler");

				submissionJobInstance.handle(job);

				return true;
			}
		},
		{
			connection: redisConnection,
		}
	);
}