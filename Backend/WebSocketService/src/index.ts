import express, { Request, Response } from "express";
import { createServer } from "node:http";
import Redis from "ioredis";
import { Server, Socket } from "socket.io";

const app = express();
app.use(express.json());

app.use(express.static("public"));

const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

const redis = new Redis();

io.on("connection", (socket: Socket) => {
	console.log("A user connected with socket id: ", socket.id);
    
	socket.on("setUserId", (userId: string) => {
		/* Set User Id and Socket Id in Redis */
		redis.set(userId, socket.id);
		console.log("User Id and Socket Id is set in Redis");
		console.log("User Id: ", userId);
		console.log("Socket Id: ", socket.id);
	});

	/* Get Connection Id */
	socket.on("getConnectionId", async (userId: string) => {
		const connectionId = await redis.get(userId);
		console.log("Connection Id: ", connectionId);
		socket.emit("connectionId", connectionId);
	});

	/* Send Payload */
	app.post("/sendPayload", async (req: Request, res: Response) => {
		const { userId, payload } = req.body;
		console.log(req);
		if (!userId || !payload) {
			return res.status(400).json({
				statusCode: 400,
				success: false,
				message: "Invalid request",
			});
		}

		const socketId = await redis.get(userId);
		
        if (!socketId) {
			return res.status(404).json({
				statusCode: 404,
				success: false,
				message: "Socket Id not found",
			});
		}

		io.to(socketId).emit("submissionPayloadResponse", payload);

		console.log("Payload sent successfully", payload);
		
        return res.status(200).json({
			statusCode: 200,
			success: true,
			message: "Payload sent successfully",
			data: payload
		});
	});

	/* Socket Disconnection */
	socket.on("disconnect", () => {
		console.log("A user disconnected with socket id: ", socket.id);
	});
});

httpServer.listen(3001, () => {
	console.log(`Server is running on http://localhost:3001`);
});
