    import {model,Schema} from "mongoose"
    const conversationSchema = new Schema({
        participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        }],
        lastMessage: {
        type: String,
        },
    }, { timestamps: true });
    
    
    const Conversation = model('Conversation', conversationSchema);
    export default Conversation;