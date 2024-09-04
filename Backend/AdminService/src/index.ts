import express from "express";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";
import { v1Router } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Router);

app.listen(PORT, async () => {
	console.log(`Environment: ${process.env.ENVIRONMENT}`);
	console.log(`Server is running on port: ${PORT}`);
	await connectDB();
});
