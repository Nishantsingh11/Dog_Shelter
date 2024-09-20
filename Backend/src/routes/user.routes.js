import { CreateUser, GetNewAccessToken, LoginUser, LogoutUser, changeCurrentPassword, getCurrentUser, UpdateUserProfile } from "../controller/user.controller.js";

import { authMiddleWare } from "../middlewares/auth.Midddleware.js"
import { Router } from "express";
import { upload } from "../middlewares/multer.Middleware.js";
const router = Router()


router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    CreateUser
)


router.route("/login").post(LoginUser)
router.route("/logout").post(authMiddleWare, LogoutUser)
router.route("/new-access-token").post(authMiddleWare, GetNewAccessToken)
router.route("/me").get(authMiddleWare, getCurrentUser)
router.route("/change-password").post(authMiddleWare, changeCurrentPassword)
router.route("/update-profile").patch(authMiddleWare, upload.fields([
    { name: "newAvatar", maxCount: 1 },
    { name: "newCoverImage", maxCount: 1 }
]), UpdateUserProfile)
export default router
