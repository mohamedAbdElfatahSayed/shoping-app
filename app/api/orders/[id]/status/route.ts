import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/app/models/Order";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const body = await req.json();
     const {id}=await params
    const order = await Order.findById(
     id
    );

    if (!order) {
      return NextResponse.json(
        {
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    order.status = body.status;

    await order.save();

    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}