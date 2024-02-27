import express from "express"
import { addCar, cars, getCar, updateCar } from "../handler/car.controller.js"
const router = express.Router()

router.get("/", cars)
router.get("/:id", getCar)
router.put("/:id/:owner", updateCar)
router.post("/add-car", addCar)

export default router