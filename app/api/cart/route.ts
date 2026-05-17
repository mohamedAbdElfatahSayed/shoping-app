import { NextRequest, NextResponse } from "next/server";
import Cart from "@/app/models/Cart";
import { connectDB } from "@/lib/mongodb";


// ================= GET CART =================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId required" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ user:userId });

    // ✅ create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        user:userId,
        cartItems: [],
        totalPrice: 0,
      });
    }

    return NextResponse.json({
      cartItems: cart.cartItems,
      totalPrice: cart.totalPrice,
    });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// ================= ADD TO CART =================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      userId,
      productId,
      name,
      image,
      price,
      quantity,
      color,
      size,
    } = body;

    let cart = await Cart.findOne({ user:userId });

    // ✅ create if not exists
    if (!cart) {
      cart = await Cart.create({
        user:userId,
        cartItems: [],
        totalPrice: 0,

      });
    }

const existingItem = cart.cartItems.find(
  (i: any) =>
     i.productId.toString() === productId &&
    (i.color ?? null) === (color ?? null) &&
    (i.size ?? null) === (size ?? null)
);

if (existingItem) {
  existingItem.quantity += quantity;
} else {
  cart.cartItems.push({
    productId,
    name,
    image,
    price,
    quantity,
    color,
    size,
  });
}
    cart.totalPrice = cart.cartItems.reduce(
      (total: number, item: any) =>
        total + item.price * item.quantity,
      0
    );

    await cart.save();

    return NextResponse.json({
      cartItems: cart.cartItems,
      totalPrice: cart.totalPrice,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// ================= PUT (UPDATE QTY) =================
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      userId,
      productId,
      quantity,
      color,
      size,
    } = body;

    const cart = await Cart.findOne({ user:userId });
    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

  const item = cart.cartItems.find((i: any) => {
  return (
    i.productId.toString() === productId &&
    (i.color ?? null) === (color ?? null) &&
    (i.size ?? null) === (size ?? null)
  );
});

    if (!item) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    item.quantity = quantity;

    cart.totalPrice = cart.cartItems.reduce(
      (total: number, item: any) =>
        total + item.price * item.quantity,
      0
    );

    await cart.save();

    return NextResponse.json({
      cartItems: cart.cartItems,
      totalPrice: cart.totalPrice,
    });
  } catch (error: any) {
 console.log("PUT ERROR:", error.response?.data);
  console.log("PUT FULL ERROR:", error);

      return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
    
  }
}

// ================= DELETE =================
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { userId, productId, color, size } = body;

    const cart = await Cart.findOne({user: userId });

    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

    cart.cartItems = cart.cartItems.filter(
      (i: any) =>
        !(i.productId.toString() === productId &&
    (i.color ?? null) === (color ?? null) &&
    (i.size ?? null) === (size ?? null))
    );

    cart.totalPrice = cart.cartItems.reduce(
      (total: number, item: any) =>
        total + item.price * item.quantity,
      0
    );

    await cart.save();

    return NextResponse.json({
      cartItems: cart.cartItems,
      totalPrice: cart.totalPrice,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}