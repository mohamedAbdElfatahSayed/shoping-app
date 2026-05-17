import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

export async function GET(req:NextRequest) {
  try {
    await connectDB();
  const accessToken  = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
     const users = await User.find().select("-password");

    return NextResponse.json(users, {
      status: 200,
    });
   
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}