import express from 'express';
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import mongoose from 'mongoose';
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

import authRouter from "./router/auth.router.js"
import userRouter from "./router/user.router.js"
import rentRouter from "./router/rent.router.js"
import carRouter from "./router/car.router.js"

//Init server
const app = express();

// Middleware
app.use(express.json())

app.use(cors())

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Multer storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'car-rental', // The folder in your Cloudinary account where the audio files will be stored
        resource_type: 'auto',
        allowed_formats: ['jpg', 'png', 'mp3', 'mp4', 'wav', "m4a"], // Specify the audio formats you want to allow
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
});

const upload = multer({ storage: storage });

app.get('/', (_, res) => {
    res.send('Hello, World! this is from Car-rental');
});

//Routes
app.use("/auth", authRouter)
app.use("/user", upload.array("images"), userRouter)
app.use("/rent", rentRouter)
app.use("/car", upload.array("images"), carRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on http://localhost:5000');
        });
    })
    .catch((err) => {
        console.log("DB connection Error: ", err)
    })