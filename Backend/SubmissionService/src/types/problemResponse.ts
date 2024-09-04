export interface ProblemResponse {
	data: {
		title: string;
		description: string;
		difficulty: string;
		testCases: Array<{
			input: string;
			output: string;
		}>;
		codeStubs: Array<{
			language: string;
			startSnippet: string;
			endSnippet: string;
			userSnippet: string;
		}>;
		editorial: string;
	};
}
