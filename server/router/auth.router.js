import express from "express"
const router = express.Router()

// Services
import {  login, logout, register } from "../handler/auth.controller.js"

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)


export default router