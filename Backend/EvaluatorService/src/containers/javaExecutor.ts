import type {
	CodeExecutorStrategy,
	ExecutionResponse,
} from "../types/codeExecutorStrategy";
import { JAVA_IMAGE } from "../utils/constants";
import { createContainer } from "./containerFactory";
import { decodeDockerStream } from "./dockerHelper";
import { pullDockerImage } from "./pullDockerImage";

export class JavaExecutor implements CodeExecutorStrategy {
	/**
	 * Executes the provided Java code with the given input and output test cases.
	 * @param code - The Java code to execute.
	 * @param inputTestCase - The input test case.
	 * @param outputTestCase - The expected output test case.
	 * @returns A promise that resolves to an ExecutionResponse.
	 */

	async execute(
		code: string,
		inputTestCase: string,
		outputTestCase: string
	): Promise<ExecutionResponse> {
		console.log("Java executor called");

		console.log(code, inputTestCase, outputTestCase);

		const rawLogBuffer: Buffer[] = [];

		await pullDockerImage(JAVA_IMAGE);

		console.log("Initialising a new java docker container");

		const runCommand = `echo '${code.replace(
			/'/g,
			`'\\"`
		)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(
			/'/g,
			`'\\"`
		)}' | java Main`;

		console.log(runCommand);

		const javaDockerContainer = await createContainer(JAVA_IMAGE, [
			"/bin/sh",
			"-c",
			runCommand,
		]);

		// starting / booting the corresponding docker container
		await javaDockerContainer.start();

		console.log("Started the docker container");

		const loggerStream = await javaDockerContainer.logs({
			stdout: true,
			stderr: true,
			timestamps: false,
			follow: true, // whether the logs are streamed or returned as a string
		});

		// Attach events on the stream objects to start and stop reading
		loggerStream.on("data", (chunk) => {
			rawLogBuffer.push(chunk);
		});

		try {
			const codeResponse = await this.fetchDecodedStream(
				loggerStream,
				rawLogBuffer
			);

			// string matching
			if (codeResponse.trim() === outputTestCase.trim()) {
				return { output: codeResponse, status: "SUCCESS" };
			} else {
				return { output: codeResponse, status: "WRONG ANSWER" };
			}
		} catch (error) {
			console.log("Error occurred in JavaExecutor", error);
			return { output: error as string, status: "ERROR" };
		} finally {
			await javaDockerContainer.remove();
		}
	}

	fetchDecodedStream(
		loggerStream: NodeJS.ReadableStream,
		rawLogBuffer: Buffer[]
	): Promise<string> {
		return new Promise((res, rej) => {
			// tle for java code
			const timeout = setTimeout(() => {
				console.log("Execution timed out");
				rej("TLE");
			}, 2000);

			loggerStream.on("end", () => {
				clearTimeout(timeout);
				console.log(rawLogBuffer);
				const completeBuffer = Buffer.concat(rawLogBuffer);
				const decodedStream = decodeDockerStream(completeBuffer);
				// console.log(decodedStream);
				// console.log(decodedStream.stdout);
				if (decodedStream.stderr) {
					rej(decodedStream.stderr);
				} else {
					res(decodedStream.stdout);
				}
			});
		});
	}
}
