import { model, Schema } from "mongoose";
const DogSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    breed: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId || String,
        ref: 'User',
        // type: String,
        required: true
    },
    dogImages: [{
        type: String,
    }],
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    adopted: {
        type: Boolean,
        default: false
    },
    adoptedBy: {
        type: String
    },
    adoptedAt: {
        type: Date
    }

}, { timestamps: true })

const Dog = model('Dog', DogSchema)
export default Dog;
