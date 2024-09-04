import { Schema, model } from "mongoose";

interface ISubmission extends Document {
	userId: string;
	problemId: string;
	code: string;
	language: string;
	status: string;
}

const submissionSchema = new Schema<ISubmission>({
	userId: {
		type: String,
		required: [true, "User id for the submission is missing"],
	},
	problemId: {
		type: String,
		required: [true, "Problem id for the submission is missing"],
	},
	code: {
		type: String,
		required: [true, "Code for the submission is missing"],
	},
	language: {
		type: String,
		required: [true, "Language for the submission is missing"],
	},
	status: {
		type: String,
		enum: ["Pending", "Success", "RE", "TLE", "MLE", "WA"],
		default: "Pending",
	},
});

export const Submission = model<ISubmission>("Submission", submissionSchema);
