import { z } from "zod";

export type CreateProblemDto = z.infer<typeof CreateProblemDtoSchema>;

export const CreateProblemDtoSchema = z
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
