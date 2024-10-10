import { AddNewDog, DeleteDog, GetDog, GetDogs, UpdateAdoptedStatus, UpdateDogDetails, GetUserDogs } from "../controller/dog.controller.js"
import { Router } from "express";
import { authMiddleWare } from "../middlewares/auth.Midddleware.js"
import { upload } from "../middlewares/multer.Middleware.js";
const router = Router()

router.route("/get-dogs").get(GetDogs)


router.route("/add-dog").post(
    upload.array("dogImages", 10),
    authMiddleWare,
    AddNewDog
)
router.route("/get-dog/:id").get(authMiddleWare,GetDog)
router.route("/update-dog/:id").patch(authMiddleWare, UpdateDogDetails)
router.route("/delete/:id").delete(authMiddleWare, DeleteDog)
router.route("/update-adopted-status/:id").patch(authMiddleWare, UpdateAdoptedStatus)
router.route("/get-user-dogs").get(authMiddleWare, GetUserDogs)


export default router