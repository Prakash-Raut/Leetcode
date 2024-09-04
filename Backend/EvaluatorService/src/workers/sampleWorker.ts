import { type Job, Worker } from "bullmq";
import { redisConnection } from "../config/redisConfig";
import { SampleJob } from "../jobs/sampleJob";
import { WorkerResponse } from "../types/bullMqWorkerResponse";

/**
 * Creates a worker for processing jobs in a specified queue.
 * @param queueName - The name of the queue to process jobs from.
 */
export function sampleWorker(queueName: string) {
	new Worker<WorkerResponse>(
		queueName,
		async (job: Job) => {
			console.log("Sample job worker kicking");
			if (job.name === "SampleJob") {
				const sampleJobInstance = new SampleJob(job.data);

				sampleJobInstance.handle(job);

				return true;
			}
		},
		{
			connection: redisConnection,
		}
	);
}
