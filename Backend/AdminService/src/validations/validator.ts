import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

/**
 * Validates the request body against a given Zod schema.
 * If the validation fails, it sends a 400 response with an error message.
 * If the validation succeeds, it calls the next middleware.
 *
 * @param schema - The Zod schema to validate against.
 * @returns A middleware function that performs the validation.
 */
export const validate =
	(schema: ZodSchema) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({ ...req.body });
			next();
		} catch (error) {
			console.log(error);
			return res.status(400).json({
				success: false,
				message: "Invalid request params received",
				data: {},
				error: error,
			});
		}
	};
