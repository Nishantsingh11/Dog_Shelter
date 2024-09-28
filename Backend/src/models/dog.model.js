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
    gender: {
        type: String,
        required: true,

    },
    size: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    disability: {
        type: String,
    },
    location: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    dateArrived: {
        type: Date,
        required: true
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
    isHouseTrained: {
        type: Boolean,
        default: false
    },
    isGoodWithKids: {
        type: Boolean,
        default: false
    },
    isGoodWithOtherDogs: {
        type: Boolean,
        default: false
    },
    isGoodWithCats: {
        type: Boolean,
        default: false
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
