import { CreateUser,GetNewAccessToken,LoginUser,LogoutUser,changeCurrentPassword,getCurrentUser} from "../controller/user.controller.js";

import {authMiddleWare} from "../middlewares/auth.Midddleware.js"
import { Router } from "express";

const router = Router()
router.route("/register").post(async (req, res) => {
    console.log("Received a request to /register");
    try {
        await CreateUser(req, res);
        console.log("User created successfully");
    } catch (error) {
        console.error("Error in /register route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.route("/login").post(LoginUser)
router.route("/logout").post(authMiddleWare, LogoutUser)
router.route("/new-access-token").post(authMiddleWare,GetNewAccessToken)
router.route("/me").get(authMiddleWare, getCurrentUser)
router.route("/change-password").post(authMiddleWare, changeCurrentPassword)
export default router
