import {
	CodeExecutorStrategy,
	ExecutionResponse,
} from "../types/codeExecutorStrategy";
import { PYTHON_IMAGE } from "../utils/constants";
import { createContainer } from "./containerFactory";
import { decodeDockerStream } from "./dockerHelper";

export class PythonExecutor implements CodeExecutorStrategy {
	/**
	 * Executes the provided Python code with the given input and output test cases.
	 * @param code - The Python code to execute.
	 * @param inputTestCase - The input test case.
	 * @param outputTestCase - The expected output test case.
	 * @returns A promise that resolves to an ExecutionResponse.
	 */
	async execute(
		code: string,
		inputTestCase: string,
		outputTestCase: string
	): Promise<ExecutionResponse> {
		console.log("Python executor called");

		console.log(code, inputTestCase, outputTestCase);

		const rawLogBuffer: Buffer[] = [];

		console.log("Initializing a new python docker container");

		const runCommand = `echo '${code.replace(
			/'/g,
			`'\\"`
		)}' > test.py && echo '${inputTestCase.replace(
			/'/g,
			`'\\"`
		)}' | python3 test.py`;

		console.log(runCommand);

		const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
			"/bin/sh",
			"-c",
			runCommand,
		]);

		await pythonDockerContainer.start();

		console.log("Python container started");

		const loggerStream = await pythonDockerContainer.logs({
			stdout: true,
			stderr: true,
			timestamps: false,
			follow: true,
		});

		loggerStream.on("data", (chunk) => {
			rawLogBuffer.push(chunk);
		});

		try {
			const response = await this.fetchDecodedStream(
				loggerStream,
				rawLogBuffer
			);
			return { output: response, status: "COMPLETED" };
		} catch (error) {
			return { output: error as string, status: "ERROR" };
		} finally {
			await pythonDockerContainer.remove();
		}
	}

	/**
	 * Decodes the Docker stream.
	 * @param stream - The stream to decode.
	 * @returns The decoded Docker stream.
	 */
	fetchDecodedStream(
		loggerStream: NodeJS.ReadableStream,
		rawLogBuffer: Buffer[]
	): Promise<string> {
		return new Promise((res, rej) => {
			loggerStream.on("end", () => {
				console.log(rawLogBuffer);
				const completeBuffer = Buffer.concat(rawLogBuffer);
				const decodedStream = decodeDockerStream(completeBuffer);
				console.log(decodedStream);
				console.log(decodedStream.stdout);
				if (decodedStream.stderr) {
					rej(decodedStream.stderr);
				} else {
					res(decodedStream.stdout);
				}
			});
		});
	}
}
