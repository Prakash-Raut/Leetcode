import { submissionQueue } from "../queues/submissionQueue";
import { SubmissionPayload } from "../types/submissionPayload";

export async function submissionQueueProducer(payload: SubmissionPayload) {
	try {
		await submissionQueue.add("SubmissionJob", payload);
		console.log("Successfully added a new submission job");
	} catch (error) {
		console.error("Failed to add submission job to the queue:", error);
		throw error; // Rethrow the error if needed
	}
}
