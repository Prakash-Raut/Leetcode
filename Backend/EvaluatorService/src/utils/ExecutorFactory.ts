import { JavaExecutor } from "../containers/javaExecutor";
import { PythonExecutor } from "../containers/pythonExecutor";
import type { CodeExecutorStrategy } from "../types/codeExecutorStrategy";

/**
 * Creates a code executor based on the specified code language.
 * @param codeLanguage The code language for which to create the executor.
 * @returns The created code executor strategy, or null if the code language is not supported.
 */
export function createExecutor(
	codeLanguage: string
): CodeExecutorStrategy | null {
	if (codeLanguage.toLowerCase() === "python") {
		return new PythonExecutor();
	} else if (codeLanguage.toLowerCase() === "java") {
		return new JavaExecutor();
	} else {
		return null;
	}
}
