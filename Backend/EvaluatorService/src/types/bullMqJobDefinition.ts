import type { Job } from "bullmq";

/**
 * Represents a job definition for BullMQ.
 */
export interface IJob {
	/**
	 * The name of the job.
	 */
	name: string;

	/**
	 * The payload for the job.
	 */
	payload?: Record<string, unknown>;

	/**
	 * The function that handles the job.
	 * @param job The job object.
	 */
	handle: (job?: Job) => void;

	/**
	 * The function that handles a failed job.
	 * @param job The job object.
	 */
	failed: (job?: Job) => void;
}
