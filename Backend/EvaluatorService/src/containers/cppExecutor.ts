import {
	CodeExecutorStrategy,
	ExecutionResponse,
} from "../types/codeExecutorStrategy";
import { CPP_IMAGE } from "../utils/constants";
import { createContainer } from "./containerFactory";
import { decodeDockerStream } from "./dockerHelper";
import { pullDockerImage } from "./pullDockerImage";

export class CppExecutor implements CodeExecutorStrategy {
	/**
	 * Executes the provided C++ code with the given input and output test cases.
	 * @param code - The C++ code to execute.
	 * @param inputTestCase - The input test case.
	 * @param outputTestCase - The expected output test case.
	 * @returns A promise that resolves to an ExecutionResponse.
	 */

	async execute(
		code: string,
		inputTestCase: string,
		outputTestCase: string
	): Promise<ExecutionResponse> {
		console.log("Cpp executor called");

		console.log(code, inputTestCase, outputTestCase);

		const rawLogBuffer: Buffer[] = [];

		console.log("Initialising a new cpp docker container");
		await pullDockerImage(CPP_IMAGE);
		const runCommand = `echo '${code.replace(
			/'/g,
			`'\\"`
		)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(
			/'/g,
			`'\\"`
		)}' | ./main`;
		console.log(runCommand);
		const cppDockerContainer = await createContainer(CPP_IMAGE, [
			"/bin/sh",
			"-c",
			runCommand,
		]);

		// starting / booting the corresponding docker container
		await cppDockerContainer.start();

		console.log("Started the docker container");

		const loggerStream = await cppDockerContainer.logs({
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
			const response = await this.fetchDecodedStream(
				loggerStream,
				rawLogBuffer
			);
			return { output: response, status: "COMPLETED" };
		} catch (error) {
			return { output: error as string, status: "ERROR" };
		} finally {
			await cppDockerContainer.remove();
		}
	}

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
