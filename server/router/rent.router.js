import express from "express"
import { rentCar } from "../handler/rent.controller.js"
const router = express.Router()

router.post("/", rentCar)

export default router