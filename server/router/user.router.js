import express from "express"
import { showUserDetail, updateProfile, users } from "../handler/user.controller.js"
const router = express.Router()

router.get("/", users)
router.get("/show-details/:id", showUserDetail)
router.post("/update-profile/:id", updateProfile)

export default router