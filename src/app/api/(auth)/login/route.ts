import connectToDB from "@/database";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { username, password } = await req.json();

    // ===== User Exist
    const user = await User.findOne({ username })
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User Not Found",
      }, { status: 404 });
    }

    // ======== Check Password
    if (user.password === password) {
      return NextResponse.json({
        success: false,
        message: "Login Sucess",
        data: user
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid Password",
      }, { status: 409 });
    }

  } catch (e) {
    console.log(e, "User creation Error");

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}