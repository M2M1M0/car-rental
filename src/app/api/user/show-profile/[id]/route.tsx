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

    if (_id === 'undefined') {
      return NextResponse.json({
        success: false,
        message: "Invalid ID",
      });

    } else {

      let user;

      user = await User.findById(_id).populate("cars");

      if (user?.rent?.length > 0) {
        user = await User.findById({ _id })?.populate("cars").populate({ path: "rent", populate: { path: "car" } })
      }


      if (user) {
        return NextResponse.json({
          success: true,
          message: user,
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
          message: "failed to fetch user Info ! Please try again",
        });
      }
    }
  } catch (e) {
    console.log(e, "User Fetching Error");

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
      stack: e
    });
  }
}