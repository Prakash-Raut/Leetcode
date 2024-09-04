import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";
import { v1Route } from "./routes";
import { evaluationWorker } from "./workers/evaluationWorker";

const app = fastify({ logger: true });

app.register(fastifyCors);

app.register(v1Route, { prefix: "/api/v1" });

app.listen({ port: PORT }, async (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	await connectDB();

	console.log(`Server listening at ${address}`);
	
	evaluationWorker("EvaluationQueue");
});
