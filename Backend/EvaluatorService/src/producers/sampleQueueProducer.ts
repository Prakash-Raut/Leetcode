import { sampleQueue } from "../queues/sampleQueue";

/**
 * Adds a new job to the sample queue.
 * @param name - The name of the job.
 * @param payload - The payload data for the job.
 * @param priority - The priority of the job (optional).
 * @returns A Promise that resolves when the job is added successfully.
 */
export async function sampleQueueProducer(
	name: string,
	payload: Record<string, unknown>,
	priority?: number
) {
	await sampleQueue.add(name, payload, { priority });
	console.log("Successfully added a new job");
}
