import mongoose from "mongoose";
import { ENVIRONMENT, MONGO_URI } from "./env";

export async function connectDB() {
	try {
		if (ENVIRONMENT == "development") {
			await mongoose.connect(MONGO_URI);
			console.log("Database Connected Successfully !");
		}
	} catch (error) {
		console.error("Error in connecting to Database:", error);
		process.exit(1);
	}
}
