import { FastifyInstance } from "fastify";
import { createSubmission } from "../controllers/SubmissionController";

export async function submissionRoute(fastify: FastifyInstance) {
	fastify.post("/", createSubmission);
}
