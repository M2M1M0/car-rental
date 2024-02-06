import mongoose from "mongoose";

enum Transmission {
    Auto = "Auto",
    Manual = "Manual"
}

enum CarType {
    Sport = "Sport",
    SUV = "SUV",
    MPV = "MPV",
    Sedan = "Sedan",
    Couple = "Couple",
    Hatchback = "Hatchback"
}

const carSchema = new mongoose.Schema(
    {
        owner: {
            trpe: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: CarType,
            required: true,
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
            type: Transmission,
            required: true,
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