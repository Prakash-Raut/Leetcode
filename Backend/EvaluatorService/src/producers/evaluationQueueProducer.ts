import { evaluationQueue } from "../queues/evaluationQueue";

export async function evaluationQueueProducer(
	payload: Record<string, unknown>
) {
	await evaluationQueue.add("Evaluation Job", payload);
	console.log("Successfully added a new evaluation job");
}
