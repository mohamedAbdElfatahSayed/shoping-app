import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get("keyword") || "";

    // page & limit
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    const skip = (page - 1) * limit;

    // search query
    const query = {
      name: { $regex: keyword, $options: "i" },
    };

    // products
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit);

    // total products
    const totalProducts = await Product.countDocuments(query);
     console.log(totalProducts)
    return NextResponse.json({
      products,
      totalProducts,
      page,
      pages: Math.ceil(totalProducts / limit),
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}