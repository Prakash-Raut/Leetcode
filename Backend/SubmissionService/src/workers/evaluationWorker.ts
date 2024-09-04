import { Worker } from "bullmq";
import { axiosInstance } from "../config/axiosConfig";
import { redisConnection } from "../config/redisConfig";

export function evaluationWorker(queueName: string) {
	new Worker(
		queueName,
		async (job) => {
			console.log("EvaluationJob job worker kicking", job);

			if (job.name === "Evaluation Job") {
				try {
					console.log("Sending payload to WebSocketService");
					const response = await axiosInstance.post(
						"http://localhost:3001/sendPayload",
						{
							userId: job.data.userId,
							payload: job.data,
						}
					);
					console.log("Payload sent successfully", response.data);
					// console.log(job.data);
				} catch (error) {
					console.log(error);
				}
			}
		},
		{
			connection: redisConnection,
		}
	);
}
