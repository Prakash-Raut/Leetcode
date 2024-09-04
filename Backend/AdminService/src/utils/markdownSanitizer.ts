import { marked } from "marked";
import sanitize from "sanitize-html";
import turndown from "turndown";

export async function sanitizeMarkdown(markdownContent: string) {
	const turndownService = new turndown();

	// convert markdown to html
	const htmlContent = await marked.parse(markdownContent);

	// sanitize html
	const sanitizedHtml = sanitize(htmlContent, {
		allowedTags: sanitize.defaults.allowedTags.concat(["img"]),
	});

	// convert sanitized html to markdown
	const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);

	return sanitizedMarkdown;
}
