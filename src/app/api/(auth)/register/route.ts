import { NextResponse } from "next/server";
import connectToDB from "@/database";

import bcrypt from "bcrypt"
import User from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, username, password } = await req.json();

    const isUserExist = await User.findOne({ username: username.toLowerCase() })
    if (isUserExist) {
      return NextResponse.json({
        success: false,
        message: "User Already Exist",
      }, { status: 409 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    // ======== Register
    const newUser = await User.create({
      email,
      username: username.toLowerCase(),
      password: hashedPassword
    });

    if (newUser) {
      return NextResponse.json({
        success: true,
        message: "User registered",
      }, { status: 201 });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to register the user ! Please try again",
      });
    }
  } catch (e) {
    console.log(e, "User creation Error");

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}