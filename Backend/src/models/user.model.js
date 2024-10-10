import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    avatar: {
        type: String,
    },
    coverImage: {
        type: String
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
    },
    phone: {
        type: String,
        maxlength: 10,
        minlength: 10  
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()

})


UserSchema.methods.CheckPassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password)
}
UserSchema.methods.GenerateAccessToken = function () {
    return jwt.sign(
        {
            _id: this.id,
            name: this.name,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.GenerateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this.id
        },
        process.env.REFRESH_TOKEN, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}


const User = model('User', UserSchema)

export default User;    