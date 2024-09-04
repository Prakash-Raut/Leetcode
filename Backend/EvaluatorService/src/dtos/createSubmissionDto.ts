import { z } from "zod";

export type CreateSubmissionDto = z.infer<typeof CreateSubmissionDtoSchema>;

/* Represents the data transfer object for creating a submission */
export const CreateSubmissionDtoSchema = z
	.object({
		userId: z.string(),
		problemId: z.string(),
		code: z.string(),
		language: z.string(),
	})
	.strict();
