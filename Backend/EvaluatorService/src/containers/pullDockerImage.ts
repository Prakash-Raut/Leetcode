import Docker from "dockerode";

/**
 * Pulls a Docker image from a registry.
 * @param imageName - The name of the Docker image to pull.
 * @returns A promise that resolves with the response from the Docker API.
 */
export async function pullDockerImage(imageName: string) {
	try {
		const docker = new Docker();

		return new Promise((res, rej) => {
			docker.pull(
				imageName,
				(err: Error, stream: NodeJS.ReadableStream) => {
					if (err) throw err;
					docker.modem.followProgress(
						stream,
						(err, output) => {
							err ? rej(err) : res(output);
						},
						(event) => {
							console.log(event.status);
						}
					);
				}
			);
		});
	} catch (error) {
		console.log(error);
	}
}
