import { Order } from "@/app/models/Order";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// 🔵 GET ORDER BY ID
export async function GET(
  req: Request,
  { params }: { params:Promise <{ id: string }> }
) {
  try {
    await connectDB();
     const {id}=await params
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const body = await req.json();
     const {id}=await params
    const order = await Order.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    await Order.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Order deleted successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}