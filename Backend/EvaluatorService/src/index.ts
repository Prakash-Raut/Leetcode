import express from "express";
import { bullBoardAdapter } from "./config/bullBoardConfig";
import { PORT } from "./config/env";
import { apiRouter } from "./routes";
import { submissionWorker } from "./workers/submissionWorker";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use("/api", apiRouter);

app.use("/ui", bullBoardAdapter.getRouter());

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
	console.log(`BullBoard dashboard running on: http://localhost:${PORT}/ui`);

	submissionWorker("SubmissionQueue");
});
