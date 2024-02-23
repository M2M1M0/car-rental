import mongoose from "mongoose";

const Transmission = {
    Auto: "Auto",
    Manual: "Manual"
}

const CarType = {
    Sport: "Sport",
    SUV: "SUV",
    MPV: "MPV",
    Sedan: "Sedan",
    Coupe: "Coupe",
    Hatchback: "Hatchback"
}

const carSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(CarType),
        },
        price: {
            type: Number,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        transmission: {
            type: String,
            required: true,
            enum: Object.values(Transmission),
        },
        location: {
            type: String,
        },
        fuelCapacity: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        images: [{
            type: String,
        }]
    },
    { timestamps: true }
);

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;