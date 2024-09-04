import { Request, Response } from "express";
import { CreateProblemDto } from "../dtos/createProblemDto";
import { UpdateProblemDto } from "../dtos/updateProblemDto";
import { Problem } from "../models/Problem";
import { sanitizeMarkdown } from "../utils/markdownSanitizer";

async function addProblem(req: Request, res: Response) {
	try {
		const { title, description, testCases, codeStubs, editorial } =
			req.body as CreateProblemDto;

		const sanitizedDescription = await sanitizeMarkdown(description);

		const createdProblem = await Problem.create({
			title,
			description: sanitizedDescription,
			testCases,
			codeStubs,
			editorial,
		});

		if (!createdProblem) {
			return res.status(400).json({
				statusCode: 400,
				success: false,
				error: "Problem not created",
			});
		}

		return res.status(201).json({
			statusCode: 201,
			success: true,
			message: "New Problem created successfully",
			data: createdProblem,
		});
	} catch (error) {
		console.log("Error in Problem Controller: ", error);
		return res.status(400).json({
			statusCode: 400,
			success: false,
			error: "Internal Server Error",
		});
	}
}

async function getAllProblem(_: Request, res: Response) {
	try {
		const problems = await Problem.find({});

		if (!problems) {
			return res.status(404).json({
				statusCode: 404,
				success: false,
				error: "No problems found",
			});
		}

		return res.status(200).json({
			statusCode: 200,
			success: true,
			message: "Successfully fetched all the problems",
			data: problems,
		});
	} catch (error) {
		console.log("Error in Problem Controller: ", error);
		return res.status(400).json({
			statusCode: 400,
			success: false,
			error: "Internal Server Error",
		});
	}
}

async function getProblem(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const problem = await Problem.findById(id);

		if (!problem) {
			return res.status(404).json({
				statusCode: 404,
				success: false,
				error: "Problem not found",
			});
		}

		return res.status(200).json({
			statusCode: 200,
			success: true,
			message: "Successfully fetched a problem",
			data: problem,
		});
	} catch (error) {
		console.log("Error in Problem Controller: ", error);
		return res.status(400).json({
			statusCode: 400,
			success: false,
			error: "Internal Server Error",
		});
	}
}

async function deleteProblem(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const deletedProblem = await Problem.findByIdAndDelete({ id });

		if (!deletedProblem) {
			return res.status(404).json({
				statusCode: 404,
				success: false,
				error: "Problem not found",
			});
		}

		return res.status(200).json({
			statusCode: 200,
			success: true,
			message: "Successfully deleted the problem",
			data: deletedProblem,
		});
	} catch (error) {
		console.log("Error in Problem Controller: ", error);
		return res.status(400).json({
			statusCode: 400,
			success: false,
			error: "Internal Server Error",
		});
	}
}

async function updateProblem(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { title, description, testCases, codeStubs, editorial } =
			req.body as Partial<UpdateProblemDto>;

		const updatedProblem = await Problem.findByIdAndUpdate(id, {
			title,
			description,
			testCases,
			codeStubs,
			editorial,
		});

		if (!updatedProblem) {
			return res.status(404).json({
				statusCode: 404,
				success: false,
				error: "Problem not found",
			});
		}

		return res.status(200).json({
			statusCode: 200,
			success: true,
			message: "Successfully updated the problem",
			data: updatedProblem,
		});
	} catch (error) {
		console.log("Error in Problem Controller: ", error);
		return res.status(400).json({
			statusCode: 400,
			success: false,
			error: "Internal Server Error",
		});
	}
}

export { addProblem, deleteProblem, getAllProblem, getProblem, updateProblem };
