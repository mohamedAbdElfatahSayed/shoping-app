import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const refreshSecret = new TextEncoder().encode(process.env.REFRESH_SECRET!);

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const pathname = req.nextUrl.pathname;

  const isAuthPage =
    pathname === "/login" || pathname === "/register";

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/admin");

  // ✅ 1. منع logged-in user من الدخول login/register
  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ 2. لو مش صفحة محمية → عادي
  if (!isProtected) {
    return NextResponse.next();
  }


  // ❌ 3. protected routes
  if (!accessToken) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return await refresh(refreshToken, req);
  }

  try {
    const { payload } = await jwtVerify(accessToken, secret);

    if (
      (pathname.startsWith("/admin") && !payload.isAdmin) ||
      (pathname.startsWith("/dashboard") && !payload.isAdmin)
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return await refresh(refreshToken, req);
  }
}

async function refresh(refreshToken: string, req: NextRequest) {
  try {
    const { payload } = await jwtVerify(refreshToken, refreshSecret);

    const newAccessToken = await new SignJWT({
      id: payload.id,
      isAdmin: payload.isAdmin,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(secret);

    const res = NextResponse.next();

    res.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};