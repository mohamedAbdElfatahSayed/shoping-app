import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploaded = await cloudinary.uploader.upload(base64, {
        folder: "products",
      });

      uploadedImages.push({
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      });
    }

    return NextResponse.json({
      message: "Images uploaded successfully",
      images: uploadedImages,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}