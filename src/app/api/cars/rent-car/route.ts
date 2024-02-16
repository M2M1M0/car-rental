import connectToDB from "@/database";
import Car from "@/models/car.model";
import Rent from "@/models/rent.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectToDB();
        const {
            car,
            rentedBy,
            pickUp,
            dropOff,
            from,
            to
        } = await req.json();
        // console.log(car,
        //     rentedBy,
        //     pickUp,
        //     dropOff,
        //     from,
        //     to)

        const rent = await Rent.create({
            car,
            rentedBy,
            pickUp,
            dropOff,
            from,
            to
        });

        const updateUser = await User.findById({ _id: rentedBy });


        if (rent && updateUser) {
            updateUser?.rent?.push(rent?._id); // Push the new car's ID to the user's rent array
            await updateUser.save(); // Save the user document to update the database

            return NextResponse.json({
                success: true,
                message: "Car Rented",
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