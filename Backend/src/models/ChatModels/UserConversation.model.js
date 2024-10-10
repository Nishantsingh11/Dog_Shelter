import { Schema, model } from "mongoose";
const userConversationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
}, { timestamps: true });

const UserConversation = model('UserConversation', userConversationSchema);
export default UserConversation;

