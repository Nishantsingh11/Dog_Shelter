import { AddNewDog, DeleteDog, GetDog, GetDogs, UpdateAdoptedStatus, UpdateDogDetails } from "../controller/dog.controller.js"
import { Router } from "express";
import { authMiddleWare } from "../middlewares/auth.Midddleware.js"
const router = Router()

router.route("/get-dogs").get(GetDogs)
router.route("/add-new").post(authMiddleWare, AddNewDog)
router.route("/getdog/:id").get(GetDog)
router.route("/update-dog/:id").patch(authMiddleWare, UpdateDogDetails)
router.route("/delete/:id").delete(authMiddleWare, DeleteDog)
router.route("/update-adopted-status/:id").patch(authMiddleWare, UpdateAdoptedStatus)

export default router