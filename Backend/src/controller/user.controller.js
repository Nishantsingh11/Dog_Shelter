import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { uploadImage } from "../utils/cloudinary.js";

const validateRequiredFields = (fields) => {
    for (const field of fields) {
        if (!field.value) {
            throw new ApiError(400, `${field.name} is required`);
        }
    }
};
const genrateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const accessToken = user.GenerateAccessToken()
        const refreshToken = user.GenerateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    }
    catch (error) {
        throw new ApiError(500, error.message)
    }
}
const notFoundError = (message = "Resource not found") => {
    throw new ApiError(404, message);
};
export const CreateUser = asyncHandler(async (req, res) => {

    const { name, email, password, username, confirm_password } = req.body;
    // loop the req.file 
    const Avatar = req.files ? await uploadImage(req.files.avatar[0].path) : null;
    const CoverImage = req.files ? await uploadImage(req.files.coverImage[0].path) : null
    validateRequiredFields([
        { value: name, name: "Name" },
        { value: email, name: "Email" },
        { value: password, name: "Password" },
        { value: username, name: "Username" },
        { value: confirm_password, name: "confirm_password" }
    ]);
    if (password !== confirm_password) {
        throw new ApiError(400, "Password and confirm password do not match");
    }
    const exisingUser = await User.findOne({ email });
    if (exisingUser) {
        throw new ApiError(400, "User with this email already exists");
    }
    const user = await User.create({ name, email, password, username, avatar: Avatar, coverImage: CoverImage });
    res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});


export const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    validateRequiredFields([
        { value: email, name: "Email" },
        { value: password, name: "Password" },
    ])
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const isMatch = await user.CheckPassword(password)
    if (!isMatch) {
        throw new ApiError(400, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await genrateAccessTokenAndRefreshToken(user._id)

    const option = {
        httpOnly: false,
        secure: false
    }
    res.status(200)
        .cookie("refreshToken", refreshToken, option)
        .cookie("accessToken", accessToken, option)
        .json(new ApiResponse(200, accessToken, "User logged in successfully"))
})

export const LogoutUser = asyncHandler(async (req, res) => {
    res.status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})


export const GetNewAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body


    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized")
    }
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN)
    const user = await User.findById(decodedToken._id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const { accessToken, refreshToken } = await genrateAccessTokenAndRefreshToken(user._id)
    res.status(200)
        .cookie("refreshToken", refreshToken)
        .cookie("accessToken", accessToken)
        .json(new ApiResponse(200, {}, "New access token generated successfully"))

})


export const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { current_password, new_password, confirm_password } = req.body;
    validateRequiredFields([
        { value: current_password, name: "Current Password" },
        { value: new_password, name: "New Password" },
        { value: confirm_password, name: "Confirm Password" },
    ])
    if (new_password !== confirm_password) {
        throw new ApiError(400, "New password and confirm password do not match")
    }
    const user = await User.findById(req.user._id)
    const isMatch = user.CheckPassword(current_password)
    if (!isMatch) {
        throw new ApiError(400, "Invalid current password")
    }
    user.password = new_password
    await user.save()
    res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"))
})

export const getCurrentUser = asyncHandler(async (req, res) => {

    // use aggration pipleline
    const user = await User.aggregate([
        { $match: { _id: req.user._id } },
        {
            $lookup: {
                from: "dogs",
                localField: "_id",
                foreignField: "owner",
                as: "dogs"
            }

        },

    ])
    if (user.length === 0) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, user[0], "User fetched successfully"))
})

export const UpdateUserProfile = asyncHandler(async (req, res) => {
    // get the user from auth middleware
    // featch the user from the database
    // if user then update the user profile
    // save the user
    // if not user then throw error
    const { name } = req.body
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const avatar = req.files ? await uploadImage(req.files.newAvatar[0].path) : user.avatar
    const coverImage = req.files ? await uploadImage(req.files.newCoverImage[0].path) : user.coverImage
    user.name = name
    user.avatar = avatar
    user.coverImage = coverImage
    await user.save()
    res.status(200).json(new ApiResponse(200, user, "User profile updated successfully"))
})

