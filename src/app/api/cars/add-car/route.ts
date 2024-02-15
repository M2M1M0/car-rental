import connectToDB from "@/database";
import Car from "@/models/car.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    // title,type,price,capacity,transmission,location,fuelCapacity,description,images

    const { owner, title, type, price, capacity, transmission, location, fuelCapacity, description, images } = await req.json();

    const newCar = await Car.create({ owner, title, type, price, capacity, transmission, location, fuelCapacity, description, images });

    const user = await User.findById({ _id: owner });


    if (newCar && user) {
      user.cars.push(newCar._id); // Push the new car's ID to the user's cars array
      await user.save(); // Save the user document to update the database

      return NextResponse.json({
        success: true,
        message: "Car Registered",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to register the Car ! Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}