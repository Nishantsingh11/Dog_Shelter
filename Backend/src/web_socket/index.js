import { WebSocketServer } from 'ws';
import { app } from "../app";
import ChatMessage from "../models/chatMessage.Model";
import http from 'http';

// Create an HTTP server using Express
const server = http.createServer(app); // Combine Express app with the HTTP server

// Initialize WebSocket server with the HTTP server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (message) => {
    console.log(`Received: ${message}`);

    // Parse the incoming message
    const parsedMessage = JSON.parse(message);
    const { senderId, receiverId, content } = parsedMessage;

    // Save message to database
    const chatMessage = new ChatMessage({ senderId, receiverId, message: content });
    await chatMessage.save();

    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify({ senderId, receiverId, content }));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the HTTP server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});

