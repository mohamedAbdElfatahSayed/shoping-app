// ================= GET PRODUCT REVIEWS =================
// app/api/products/review/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params:Promise <{ id: string }> }
) {
  try {
    await connectDB();
     const {id}=await params
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product.reviews);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}