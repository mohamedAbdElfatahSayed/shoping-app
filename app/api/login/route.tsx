import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import { loginSchema } from "@/app/validation/user";
import { connectDB } from "@/lib/mongodb";

const unauthorized = () =>
  NextResponse.json(
    { message: "Invalid email or password" },
    { status: 401 }
  );

export async function POST(req: Request) {
  try {
     await connectDB();
    const body = await req.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.password) return unauthorized();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return unauthorized();

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin,username:user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id,isAdmin:user.isAdmin },
      process.env.REFRESH_SECRET!,
      { expiresIn: "30d" }
    );
         const safeUser = {
  id: user._id,
  username:user.username,
  email: user.email,
  isAdmin: user.isAdmin,
  image:user.image
};
    const response = NextResponse.json({
      message: "Login successful",
      user:safeUser
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });


    return response;
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}