import { model, Schema } from "mongoose";

interface IProblem extends Document {
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
}

const problemSchema = new Schema<IProblem>({
	title: {
		type: String,
		required: [true, "Title cannot be empty"],
	},
	description: {
		type: String,
		required: [true, "Description cannot be empty"],
	},
	difficulty: {
		type: String,
		enum: ["easy", "medium", "hard"],
		required: [true, "Difficulty cannot be empty"],
		default: "easy",
	},
	testCases: [
		{
			input: {
				type: String,
				required: true,
			},
			output: {
				type: String,
				required: true,
			},
		},
	],
	codeStubs: [
		{
			language: {
				type: String,
				enum: ["CPP", "JAVA", "PYTHON"],
				required: true,
			},
			startSnippet: {
				type: String,
			},
			endSnippet: {
				type: String,
			},
			userSnippet: {
				type: String,
			},
		},
	],
	editorial: {
		type: String,
	},
});

export const Problem = model<IProblem>("Problem", problemSchema);
