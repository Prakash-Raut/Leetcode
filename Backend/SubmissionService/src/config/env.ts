import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = String(process.env.NODE_ENV);
const PORT = Number(process.env.PORT);
const ATLAS_DB_URL = String(process.env.ATLAS_DB_URL);
const REDIS_PORT = Number(process.env.REDIS_PORT);
const REDIS_HOST = String(process.env.REDIS_HOST) || "127.0.0.1";
const PROBLEM_ADMIN_SERVICE_URL = String(process.env.PROBLEM_ADMIN_SERVICE_URL);

export {
	ATLAS_DB_URL,
	NODE_ENV,
	PORT,
	PROBLEM_ADMIN_SERVICE_URL,
	REDIS_HOST,
	REDIS_PORT,
};
