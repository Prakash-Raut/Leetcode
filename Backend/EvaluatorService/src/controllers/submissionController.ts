import type { Request, Response } from "express";
import type { CreateSubmissionDto } from "../dtos/createSubmissionDto";

/**
 * Adds a new submission to the system.
 * 
 * @param req - The request object containing the submission data.
 * @param res - The response object used to send the response.
 */
export function addSubmission(req: Request, res: Response) {
	const submissionDto = req.body as CreateSubmissionDto;
	
	console.log(submissionDto);

	return res.status(201).json({
		statusCode: 201,
		success: true,
		message: "Successfully collected the submission",
		data: submissionDto,
	});
}
