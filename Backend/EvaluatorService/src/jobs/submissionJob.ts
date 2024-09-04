import { Job } from "bullmq";
import { evaluationQueueProducer } from "../producers/evaluationQueueProducer";
import type { IJob } from "../types/bullMqJobDefinition";
import type { ExecutionResponse } from "../types/codeExecutorStrategy";
import type { SubmissionPayload } from "../types/submissionPayload";
import { createExecutor } from "../utils/ExecutorFactory";

/**
 * Represents a submission job.
 */
export class SubmissionJob implements IJob {
	/**
	 * The name of the job.
	 */
	name: string;

	/**
	 * The payload of the job.
	 */
	payload: Record<string, SubmissionPayload>;

	/**
	 * Constructs a new SubmissionJob instance.
	 * @param payload - The payload of the job.
	 */
	constructor(payload: Record<string, SubmissionPayload>) {
		this.payload = payload;
		this.name = this.constructor.name;
	}

	/**
	 * Handles the job.
	 * @param job - The job object.
	 */
	handle = async (job?: Job) => {
		console.log("Handler of the job called");

		console.log(this.payload);

		if (job) {
			// Retrieve the first key from the payload object
			const key = Object.keys(this.payload)[0];
			// Extract the language of the code from the payload using the key
			const codeLanguage = this.payload[key].language;
			// Extract the code snippet from the payload using the key
			const code = this.payload[key].code;
			// Extract the input test case from the payload using the key
			const inputTestCase = this.payload[key].inputCase;
			// Extract the output test case from the payload using the key
			const outputTestCase = this.payload[key].outputCase;
			// Create an executor strategy based on the code language
			const strategy = createExecutor(codeLanguage);
			// Log the strategy to the console
			console.log(strategy);

			// Check if a valid strategy was returned
			if (strategy != null) {
				// Execute the code using the strategy with the provided input and output test cases
				const response: ExecutionResponse = await strategy.execute(
					code,
					inputTestCase,
					outputTestCase
				);

				evaluationQueueProducer({
					response,
					userId: this.payload[key].userId,
					submissionId: this.payload[key].submissionId,
				});
				// Check if the execution status is COMPLETED
				if (response.status === "COMPLETED") {
					// Log success message
					console.log("Code executed successfully");
					// Log the response object
					console.log(response);
				} else {
					// Log failure message
					console.log("Something went wrong with code execution");
					// Log the response object
					console.log(response);
				}
			}
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
