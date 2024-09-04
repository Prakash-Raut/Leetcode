/**
 * Represents the payload for a submission.
 */
export type SubmissionPayload = {
	code: string;
	language: string;
	inputCase: string;
	outputCase: string;
	userId: string;
	submissionId: string;
};
