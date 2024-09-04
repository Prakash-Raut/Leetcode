import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchProblemDetails } from "../api/problemAdminApi";
import { Submission } from "../models/Submission";
import { submissionQueueProducer } from "../producers/submissionQueueProducer";
import { codeStub } from "../types/codeStub";

export async function createSubmission(
	req: FastifyRequest<{
		Body: {
			userId: string;
			problemId: string;
			code: string;
			language: string;
		};
	}>,
	res: FastifyReply
) {
	try {
		const { userId, problemId, code, language } = req.body;

		const problem = await fetchProblemDetails(problemId);

		if (!problem) {
			return res.status(403).send({
				statusCode: 403,
				success: false,
				error: "Problem not found",
			});
		}

		console.log(problem);	

		const languageCodeStub = problem.data.codeStubs.find(
			(codeStub: codeStub) =>
				codeStub.language.toLowerCase() === language.toLowerCase()
		);

		console.log(languageCodeStub);

		if (!languageCodeStub) {
			return res.status(403).send({
				statusCode: 403,
				success: false,
				error: "Language not supported",
			});
		}

		const updatedCode =
			languageCodeStub.startSnippet +
			"\n\n" +
			code +
			"\n\n" +
			languageCodeStub.endSnippet;

		const submission = await Submission.create({
			userId,
			problemId,
			code: updatedCode,
			language,
		});

		if (!submission) {
			res.status(400).send({
				statusCode: 400,
				success: false,
				error: "Failed to create submission",
			});
		}

		console.log("Submission: ",submission);

		// Send the submission to the queue
		const response = await submissionQueueProducer({
			[submission.id]: {
				code: submission.code,
				language: submission.language,
				inputCase: problem.data.testCases[0].input,
				outputCase: problem.data.testCases[0].output,
				userId,
				submissionId: submission._id.toString(),
			},
		});


		return res.status(201).send({
			statusCode: 201,
			success: true,
			message: "Created submission successfully",
			queueResponse: response,
			data: submission,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			statusCode: 500,
			success: false,
			error: "Internal Server Error",
		});
	}
}
