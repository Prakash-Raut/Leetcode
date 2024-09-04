/**
 * Creates a code string by combining the starting, middle, and end code.
 * @param startingCode - The starting code string.
 * @param middleCode - The middle code string.
 * @param endCode - The end code string.
 * @returns The combined code string.
 */
export function codeCreator(
	startingCode: string,
	middleCode: string,
	endCode: string
): string {
	return `
        ${startingCode}
        ${middleCode}
        ${endCode}
    `;
}
