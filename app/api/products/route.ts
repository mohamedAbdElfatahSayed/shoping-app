import { NextResponse, type NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/app/models/Product";
import { createProductSchema } from "@/app/validation/product";

import { verifyToken } from "@/utils/verifyToken";
import "@/app/models/User"; // ✅ مهم جدًا

import { uploadImages } from "@/utils/uploadImages";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const decoded = verifyToken(req);

    if (!decoded.isAdmin) {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    // ✅ files (safe)
    const files = formData
      .getAll("images")
      .filter((file) => file instanceof File) as File[];

    // ❗ upload images + safety check
    const uploadedImages = await uploadImages(files, "products");

    const safeImages = (uploadedImages || []).filter(
      (img) => img?.url && img?.publicId
    );

    if (!safeImages.length) {
      return NextResponse.json(
        { message: "At least one valid image is required" },
        { status: 400 }
      );
    }

    // ✅ safe parsing helpers
    const name = (formData.get("name") as string) || "";
    const description = (formData.get("description") as string) || "";
    const brand = (formData.get("brand") as string) || "";
    const category = (formData.get("category") as string) || "";

    const price = Number(formData.get("price") || 0);
    const discountPrice = Number(formData.get("discountPrice") || 0);
    const countInStock = Number(formData.get("countInStock") || 0);

    const colors = JSON.parse((formData.get("colors") as string) || "[]");
    const sizes = JSON.parse((formData.get("sizes") as string) || "[]");

    // ✅ final product data
    const productData = {
      name,
      description,
      brand,
      category,
      price,
      discountPrice,
      countInStock,
      colors,
      sizes,
      images: safeImages,
    };
     
    // ✅ validation
    const validation = createProductSchema.safeParse(productData);

    if (!validation.success) {
      return NextResponse.json(
        {
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }   

    // ✅ create product
    const product = await Product.create({
      ...validation.data,
      user: decoded.id,
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Server Error",
      },
      { status: 500 }
    );
  }
}

// ✅ GET ALL PRODUCTS
export async function GET(req: NextRequest) {
      await connectDB();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");

  const skip = (page - 1) * limit;

  const products = await Product.find()
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments();
  const allProducts=await Product.find()
  return NextResponse.json({
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
    allProducts
  });
}