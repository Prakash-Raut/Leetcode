export interface SubmissionPayload {
	[key: string]: Submission;
}

export interface Submission {
	code: string;
	language: string;
	inputCase: string;
	outputCase: string;
	userId: string;
	submissionId: string;
}
