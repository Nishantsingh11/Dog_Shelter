import {  GetChatUsers, GetPreviousMessages } from "../controller/message.controller.js";
import { Router } from "express";
import { authMiddleWare } from "../middlewares/auth.Midddleware.js";

const router = Router();
router.route("/getprevchat/:receiverId").get(authMiddleWare, GetPreviousMessages);
router.route("/getchatusers").get(authMiddleWare, GetChatUsers);

export default router;