import Message from "../models/ChatModels/message.model.js";
import Conversation from "../models/ChatModels/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const GetPreviousMessages = asyncHandler(async (req, res) => {
    const senderId = req.user._id;
    const { receiverId } = req.params;

    // Find if there is an existing conversation between sender and receiver
    const chat = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    if (chat) {
        // Fetch all messages related to this conversation
        const messages = await Message.find({ conversationId: chat._id })
            .sort({ createdAt: 1 }) // Sort messages in ascending order of creation
            .populate('senderId', 'username') // Optionally populate sender details
            .populate('receiverId', 'username'); // Optionally populate receiver details

        res.status(200).json(messages);
    } else {
        res.status(200).json([]); // No chat found, return empty array
    }
});


// get thep ppl the current user talk to 
export const GetChatUsers = asyncHandler(async (req, res) => {
    const senderId = req.user._id;

    // Find conversations where the sender is a participant
    const chats = await Conversation.find({
        participants: senderId
    })
        .sort({ updatedAt: -1 }) // Sort chats by the latest update
        .populate('participants', 'username'); // Populate only the `username` field

    // Remove the sender from the list of participants
    const chatUsers = chats.map(chat => {
        return {
            participants: chat.participants.filter(participant => participant._id.toString() !== senderId.toString())[0]
        };
    });

    // Return the response
    res.status(200).json(chatUsers);
});
