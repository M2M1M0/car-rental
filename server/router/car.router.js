import express from "express"
import { addCar, cars } from "../handler/car.controller.js"
const router = express.Router()

router.get("/", cars)
router.post("/add-car", addCar)

export default router