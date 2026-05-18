import { Order } from "@/app/models/Order";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// 🔵 CREATE ORDER
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { userId, items, shippingAddress, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty" },
        { status: 400 }
      );
    }

    const totalPrice = items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const orders = await Order.find({user: userId }).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}