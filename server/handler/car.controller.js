import Car from "../model/car.model.js";
import Image from "../model/image.model.js";
import User from "../model/user.model.js";

export const cars = async (_, res, next) => {
    try {
        const cars = await Car.find()?.populate("images");
        res.status(200).json(cars)
    } catch (error) {
        next(error)
    }
}

export const addCar = async (req, res, next) => {
    const { owner, title, type, price, capacity, transmission, location, fuelCapacity, description } = req.body;

    if (req.files === undefined || req.files.length === 0) {
        return res.status(400).json({ message: "Failed to upload images try again" });
    } else {


        try {
            const imageIds = [];
            for (const file of req.files) {
                const newImage = await Image.create({ url: file.path });
                imageIds.push(newImage._id);
            }

            const newCar = await Car.create({
                owner,
                title,
                type,
                price,
                capacity,
                transmission,
                location,
                fuelCapacity,
                description,
                images: imageIds
            });

            const user = await User.findById(owner);

            if (!user) {
                return next("Invalid owner");
            }

            user?.cars?.push(newCar._id);
            await user.save();

            res.status(201).json({ message: "Car added successfully" });

        } catch (error) {
            console.log(error, "Error adding car..");
            next(error);
        }
    }
}
