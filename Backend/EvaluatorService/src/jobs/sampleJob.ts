import type { Job } from "bullmq";
import type { IJob } from "../types/bullMqJobDefinition";

/**
 * Represents a sample job.
 */
export class SampleJob implements IJob {
	name: string;
	payload: Record<string, unknown>;

	/**
	 * Creates a new instance of the SampleJob class.
	 * @param payload - The payload for the job.
	 */
	constructor(payload: Record<string, unknown>) {
		this.payload = payload;
		this.name = this.constructor.name;
	}

	/**
	 * Handles the job.
	 * @param job - The job object.
	 */
	handle = (job?: Job) => {
		console.log("Handler of the job called");
		console.log(this.payload);
		if (job) {
			console.log(job.name, job.id, job.data);
		}
	};

	/**
	 * Handles the case when the job fails.
	 * @param job - The job object.
	 */
	failed = (job?: Job): void => {
		console.log("Job failed");
		if (job) {
			console.log(job.id);
		}
	};
}
