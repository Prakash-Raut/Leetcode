import { FastifyInstance } from "fastify";
import { submissionRoute } from "./submissionRoute";

export async function v1Route(fastify: FastifyInstance) {
	fastify.register(submissionRoute, { prefix: "/submissions" });
}
