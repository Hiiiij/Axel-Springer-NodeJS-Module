import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import logger from "./utils/logger";
import socketServerHandler from './socket';

// Get configuration values
const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

// Initialize the Express application
const app = express();

// Setup CORS middleware for Express
app.use(cors({
  origin: corsOrigin,  // Allow requests from the specified origin
  credentials: true,   // Allow credentials like cookies
  methods: ["GET", "POST"]  // Specify allowed methods
}));

// Create the HTTP server
const httpServer = createServer(app);

// Create the Socket.IO server and pass the httpServer to it
const ioServer = new Server(httpServer, {
  cors: {
    origin: corsOrigin,  
    credentials: true,   // Allow credentials like cookies
    methods: ["GET", "POST"]
  },
});

// Serve a simple route
app.get("/", (_, res) => res.send("Server is up"));

// Start the HTTP server and listen on the specified port and host
httpServer.listen(port, host, () => {
  logger.info(`Server is listening on ${host}:${port}`);
  socketServerHandler({ ioServer });  // Attach socket handlers after the server starts
});

