import { z } from "zod";

export type UpdateProblemDto = z.infer<typeof UpdateProblemDtoSchema>;

export const UpdateProblemDtoSchema = z
	.object({
		title: z.string(),
		description: z.string(),
		testCases: z.array(
			z.object({
				input: z.string(),
				output: z.string(),
			})
		),
		codeStubs: z.array(
			z.object({
				language: z.string(),
				startSnippet: z.string(),
				endSnippet: z.string(),
				userSnippet: z.string(),
			})
		),
		editorial: z.string(),
	})
	.strict();
