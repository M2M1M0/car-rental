import Car from "../model/car.model.js";
import User from "../model/user.model.js";

export const cars = async (_, res, next) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars)
    } catch (error) {
        next(error)
    }
}

export const addCar = async (_, res, next) => {
    try {
        const { owner, title, type, price, capacity, transmission, location, fuelCapacity, description, images } = req.body;

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
            images
        });

        const user = await User.findById({ _id: owner });

        if (owner === undefined || null) {
            next("Invalid owner")
        }

        if (newCar && user) {
            user.cars.push(newCar._id); // Push the new car's ID to the user's cars array
            await user.save(); // Save the user document to update the database
        }
        res.status(201).json("registered success")
    } catch (error) {
        next(error)
    }
}
