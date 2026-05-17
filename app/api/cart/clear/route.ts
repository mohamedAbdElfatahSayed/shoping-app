import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/app/models/Cart";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "No userId" },
        { status: 400 }
      );
    }

    const cart =await Cart.findOne({ user: userId })

    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

    // 🔥 IMPORTANT
    cart.cartItems = [];

    await cart.save();

    return NextResponse.json({
      message: "Cart cleared",
      cart,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}