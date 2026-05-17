import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/app/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}