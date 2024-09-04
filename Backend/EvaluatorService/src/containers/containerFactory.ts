import Docker from "dockerode";

/**
 * Creates a Docker container with the specified image and command.
 * @param imageName - The name of the Docker image to create the container from.
 * @param cmdExecutable - The command to run in the container.
 * @returns A promise that resolves to the created Docker container.
 */
export async function createContainer(
	imageName: string,
	cmdExecutable: string[]
) {
	const docker = new Docker();

	const container = await docker.createContainer({
		Image: imageName, // image to create the container from
		Cmd: cmdExecutable, // commands to run in the container
		AttachStdin: true, // input streams
		AttachStdout: true, // output streams
		AttachStderr: true, // error streams
		Tty: false, // terminal
		HostConfig: {
			Memory: 1024 * 1024 * 1024, // 1 GB memory
		},
		OpenStdin: true, // keep the input stream open even no interaction is there
	});

	return container;
}
