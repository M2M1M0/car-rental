import connectToDB from "@/database";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        await connectToDB();

        const {
            username,
            email,
            // password,
            profilePicture,
            coverPicture
        } = await req.json();

        // Parse the request URL
        const url = new URL(req.url, `${process.env.NEXT_PUBLIC_BASE_URL}/user/update-profile${req.headers.get("id")}`);
        // Extract the ID from the URL
        const _id = url.pathname.split('/').pop();

        if (_id === undefined) {
            return NextResponse.json({
                success: false,
                message: "null for _id",
            });
        }
        const userProfile = await User.updateOne(
            { _id },
            {
                username,
                email,
                // password,
                profilePicture,
                coverPicture
            })

        if (userProfile) {
            return NextResponse.json({
                success: true,
                message: "Profile Update Successfully",
            },
                {
                    headers: {
                        "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_CLIENT_URL!,
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
                    },
                }
            );
        } else {
            return NextResponse.json({
                success: false,
                message: "failed to Update Profile ! Please try again",
            });
        }
    } catch (e) {
        console.log(e, "User Fetching Error");

        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again",
        });
    }
}