import connectToDB from "@/database";
import Car from "@/models/car.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    // title,type,price,capacity,transmission,location,fuelCapacity,description,images

    const { title, type, price, capacity, transmission, location, fuelCapacity, description, images } = await req.json();

    const newCar = await Car.create({ title, type, price, capacity, transmission, location, fuelCapacity, description, images });

    if (newCar) {
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