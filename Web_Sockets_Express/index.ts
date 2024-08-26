import * as https from "https";
import * as fs from "fs";
import { WebSocketServer, WebSocket } from "ws";
import express, { Request, Response } from "express";

// Paths to SSL certificate and key
const certPath = "config/server.cert";
const keyPath = "config/server.key";

// Read SSL certificate and key
const options = {
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
};

const app = express();
//Set basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Yaay, this is an Express app integrated with a WebSocket server!");
});

// Create an HTTPS server with express
const server = https.createServer(options, app);

// Create a WebSocket server and attach it to the HTTPS server
const wss = new WebSocketServer({ server });

//Handle new web socket connection
wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (message: string) => {
    console.log(`Received message: ${message}`);
    // Handle incoming message
    wss.clients.forEach((client: WebSocket) => {
      // Check if the client is connected before sending the message
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${message}`); // Send the message to the client
      }
    });
  });

  //Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const port = 8020;
server.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
