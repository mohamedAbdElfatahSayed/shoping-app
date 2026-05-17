import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const cookies = req.headers.get("cookie") || "";

    const refreshToken = cookies
      .split("; ")
      .find((c) => c.startsWith("refreshToken="))
      ?.split("=")[1];

    if (!refreshToken) {
      return NextResponse.json({ message: "No refresh token" }, { status: 401 });
    }

    // 🔐 verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET!
    ) as { id: string };

    // 🆕 create new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const res = NextResponse.json({ message: "Token refreshed" });

    res.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
    });

    return res;
  } catch {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}