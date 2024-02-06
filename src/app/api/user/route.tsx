import connectToDB from "@/database";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const users = await User.find();

    if (users) {
      return NextResponse.json({
        success: true,
        message: users,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to fetch user ! Please try again",
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