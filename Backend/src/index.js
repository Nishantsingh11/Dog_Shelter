import { app } from "./app.js";
import connectDB from "./connection/index.js";
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Message from '../src/models/ChatModels/message.model.js'
import Conversation from "./models/ChatModels/conversation.model.js";
import UserConversation from "./models/ChatModels/UserConversation.model.js";
import User from "./models/user.model.js";

dotenv.config({ path: "./.env" });

connectDB().then(() => {
    const server = createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins (not recommended for production)
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    const users = {}; // In-memory map to store userId => socketId

    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);

        const userId = socket.handshake.query.userId;
        users[userId] = socket.id; // Store userId and socketId
        console.log(`User ${userId} is connected. Socket ID: ${socket.id}`);
        

        // When a message is sent
        socket.on("sendMessage", async (messageData) => {
            const { toUserId, message } = messageData;
            console.log(`Received message from ${userId} to ${toUserId}: ${message}`);

            try {


                // 1. Find or create a conversation
                let conversation = await Conversation.findOne({
                    participants: { $all: [userId, toUserId] },
                });

                if (!conversation) {
                    conversation = new Conversation({
                        participants: [userId, toUserId],
                        lastMessage: message,
                    });
                    await conversation.save(); // Save new conversation

                } else {
                    conversation.lastMessage = message;
                    await conversation.save();
                }

                // 2. Save the message to DB
                const newMessage = new Message({
                    senderId: userId,
                    receiverId: toUserId,
                    message,
                    conversationId: conversation._id, // Add conversationId here

                });
                const savedMessage = await newMessage.save();
                // 3. Update UserConversation for both users
                await UserConversation.findOneAndUpdate(
                    { userId, conversationId: conversation._id },
                    { userId, conversationId: conversation._id },
                    { upsert: true }
                );

                await UserConversation.findOneAndUpdate(
                    { userId: toUserId, conversationId: conversation._id },
                    { userId: toUserId, conversationId: conversation._id },
                    { upsert: true }
                );

                // 4. Emit message to recipient if they are online
                const recipientSocketId = users[toUserId];
                if (recipientSocketId) {
                    // find username useing userID
                    const userName = await User.findById(userId).select("username");
                    io.to(recipientSocketId).emit("receiveMessage", {
                        fromUserId: userName.username,
                        message,
                    });
                    console.log(`Message sent to ${toUserId} at socket ${recipientSocketId}`);
                } else {
                    console.log(`User ${toUserId} is not connected.`);
                }
            } catch (err) {
                console.error("Error saving message:", err);
            }
        });

        // Handle user disconnection
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            delete users[userId]; // Remove user on disconnect
            console.log(`User ID ${userId} disconnected. Updated users map:`, users);
        });
    });

    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});
