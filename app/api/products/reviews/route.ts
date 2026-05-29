// ================= ADD REVIEW API =================
// app/api/products/review/route.ts

import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/utils/verifyToken";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    // ✅ verify user
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      productId,
      rating,
      comment,
    }: {
      productId: string;
      rating: number;
      comment: string;
    } = body;

    // ✅ validation
    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ find product
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // ✅ check if already reviewed
    const alreadyReviewed = product.reviews.find(
      (review: any) =>
        review.user.toString() === decoded.id
    );

    if (alreadyReviewed) {
      return NextResponse.json(
        { message: "Product already reviewed" },
        { status: 400 }
      );
    }

    // ✅ new review
    const newReview = {
      user: decoded.id,
      rating: Number(rating),
      comment,
    };

    // ✅ push review
    product.reviews.push(newReview);

    // ✅ update numReviews
    product.numReviews = product.reviews.length;

    // ✅ calculate rating average
    product.rating =
      product.reviews.reduce(
        (acc: number, item: any) =>
          item.rating + acc,
        0
      ) / product.reviews.length;

    // ✅ save
    await product.save();

    return NextResponse.json(
      {
        message: "Review added successfully",
        reviews: product.reviews,
        rating: product.rating,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}