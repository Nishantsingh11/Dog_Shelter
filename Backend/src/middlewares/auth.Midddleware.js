import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import User from "../models/user.model.js";

export const authMiddleWare = asyncHandler(async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim() || req.cookies.accessToken;

    if (!token) {
        return res.status(401).json(new ApiError(401, "Unauthorized"));
    }
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN)
    const user = await User.findById(decode._id).select("-password -refreshToken")
    if (!user) {
        return res.status(401).json(new ApiError(401, "Unauthorized"));
    }
    req.user = user;
    next()

})