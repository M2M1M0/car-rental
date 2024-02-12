import connectToDB from "@/database";
import Car from "@/models/car.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectToDB();

        const cars = await Car.find();

        if (cars) {
            return NextResponse.json({
                success: true,
                message: "Cars Fetched Succussfully",
                data: cars
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