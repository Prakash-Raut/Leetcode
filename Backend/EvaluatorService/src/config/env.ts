import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5005;
const REDIS_PORT = Number.parseInt(process.env.REDIS_PORT || "6379", 10);
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";

export { PORT, REDIS_HOST, REDIS_PORT };
