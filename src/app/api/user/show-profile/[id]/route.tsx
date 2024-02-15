import connectToDB from "@/database";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();
    
     // Parse the request URL
     const url = new URL(req.url, `${process.env.NEXT_PUBLIC_BASE_URL}/user/show-profile${req.headers.get("id")}`);
     // Extract the ID from the URL
     const _id = url.pathname.split('/').pop();
     
     
     const user = await User.findById({ _id }).populate("cars");

    if (user) {
      return NextResponse.json({
        success: true,
        message: user,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to fetch user Info ! Please try again",
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