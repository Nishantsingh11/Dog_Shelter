import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
const CreateUser = asyncHandler(async (req, res) => {
    console.log("Received a request to /register in clt");

    const { name, email, password, username, confirm_password } = req.body;
    console.log("Request body:", req.body);

    try {
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

        const user = await User.create({ name, email, password, username });
        console.log("User created in the database:", user);

        res.status(201).json(new ApiResponse(201, user, "User created successfully"));
    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
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
        .json(new ApiResponse(200, {}, "User logged in successfully"))
})

export const LogoutUser = asyncHandler(async (req, res) => {
    res.status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})


export const GetNewAccessToken = asyncHandler(async (req, res) => {
    const { incomingRefreshToken } = req.cookies.refreshToken || req.body
    console.log("incomingRefreshToken", incomingRefreshToken);
    
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
    const user = await User.findById(req.user._id).select("-password -refreshToken")
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"))
})


export { CreateUser }