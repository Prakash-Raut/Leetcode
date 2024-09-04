/**
 * Represents a code executor strategy.
 */
export interface CodeExecutorStrategy {
	/**
	 * Executes the provided code with the given input and output test cases.
	 * @param code - The code to execute.
	 * @param inputTestCase - The input test case.
	 * @param outputTestCase - The expected output test case.
	 * @returns A promise that resolves to an ExecutionResponse.
	 */
	execute(
		code: string,
		inputTestCase: string,
		outputTestCase: string
	): Promise<ExecutionResponse>;

	fetchDecodedStream(
		loggerStream: NodeJS.ReadableStream,
		rawLogBuffer: Buffer[]
	): Promise<string>;
}

/**
 * Represents the response of an execution.
 */
export type ExecutionResponse = {
	output: string;
	status: string;
};
