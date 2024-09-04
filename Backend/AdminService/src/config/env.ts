import dotenv from "dotenv";

dotenv.config();

const PORT = String(process.env.PORT);
const ENVIRONMENT = String(process.env.ENVIRONMENT);
const MONGO_URI = String(process.env.MONGO_URI);

export { ENVIRONMENT, MONGO_URI, PORT };
