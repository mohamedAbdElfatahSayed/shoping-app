// app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken"
import { verifyAdmin } from "@/utils/verifyAdmin";
import { verifyToken } from "@/utils/verifyToken";
import { updateUserSchema } from "@/app/validation/user";
import bcrypt from "bcryptjs";
import { UpdateUser } from "@/types/type";
import { deleteImage, uploadImage } from "@/utils/uploadImages";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params
        const user = await User.findById(id).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching user" },
            { status: 500 }
        );
    }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const decoded = verifyToken(req);

    if (!decoded?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (String(id) !== String(decoded.id)) {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 🔥 Check content type (important fix)
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Invalid content type, expected form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // ================= TEXT FIELDS =================
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string | null;

    const file = formData.get("image") as File | null;

    const data = {
      username: username || user.username,
      email: email || user.email,
      password: password || undefined,
    };

    // ================= VALIDATION =================
    const validation = updateUserSchema.safeParse(data);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updateData: any = {
      username: validation.data.username,
      email: validation.data.email,
    };

    if (validation.data.password) {
      updateData.password = await bcrypt.hash(
        validation.data.password,
        10
      );
    }

    // ================= IMAGE =================
    let newImage = user.image;

    if (file && file.size > 0) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const base64Image = `data:${file.type};base64,${fileBuffer.toString(
        "base64"
      )}`;

      const uploaded = await uploadImage(base64Image);

      newImage = {
        url: uploaded.url,
        publicId: uploaded.publicId,
      };
    }

    updateData.image = newImage;

    // ================= UPDATE USER =================
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    // ================= DELETE OLD IMAGE (after success) =================
    if (
      user.image?.publicId &&
      newImage?.publicId &&
      user.image.publicId !== newImage.publicId
    ) {
      await deleteImage(user.image.publicId);
    }

    return NextResponse.json(updatedUser, {
      status: 200,
    });
  } catch (error) {
    console.error("Update user error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// app/api/users/[id]/route.ts
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // VERIFY TOKEN
    const userFromToken = verifyToken(req);

    // OWNER OR ADMIN
    const isOwner = userFromToken.id === id;
    const isAdmin = userFromToken.isAdmin;

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    // DELETE USER
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );

    // لو المستخدم حذف نفسه → امسح التوكن
    if (isOwner) {
      response.cookies.set("accessToken", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      response.cookies.set("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
      });
    }

    return response;

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
}