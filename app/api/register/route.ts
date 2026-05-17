import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/app/validation/user";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // 🧠 Zod validation
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { username, email, password } = result.data;

    // 🔍 check if user exists
    const exists = await User.findOne({ email });

    if (exists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 🔒 hide sensitive data
    const safeUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      {
        message: "User created successfully",
        user: safeUser,
      },
      { status: 201 }
    );
  } catch (err: any) {
    // 💥 handle duplicate key error (MongoDB)
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}