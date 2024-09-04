import { connect } from "mongoose";
import { ATLAS_DB_URL, NODE_ENV } from "./env";

export async function connectDB() {
	try {
		if (NODE_ENV == "DEVELOPMENT") {
			await connect(ATLAS_DB_URL);
			console.log("Connected to the MongoDB server");
		}
	} catch (error) {
		console.log("Unable to connect to the MongoDB server");
		process.exit(1);
	}
}
