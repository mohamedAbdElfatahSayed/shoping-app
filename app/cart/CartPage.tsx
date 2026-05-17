"use client";

import { getCart, removeFromCart, updateCartQuantity } from "@/redux/calls/cartCalls";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { user } = useSelector((state: any) => state.auth);
    const { cartItems } = useSelector((state: any) => state.cart);

    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;
        dispatch(getCart(userId));
    }, []);

    // 💰 Total Price
    const totalPrice = cartItems?.reduce((acc: number, item: any) => {
        return acc + item.price * item.quantity;
    }, 0);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>

            {/* ITEMS */}
            <div className="space-y-4">
                {cartItems?.length ? (
                    cartItems.map((item: any ) => (
                        <div
                            key={item.productId}
                            className="flex items-center gap-4 border p-3 rounded-lg"
                        >
                            {/* IMAGE */}
                            <img
                                src={item.image}
                                className="w-20 h-20 object-cover rounded"
                            />

                            {/* INFO */}
                            <div className="flex-1">
                                <h2 className="font-semibold">{item.name}</h2>
                                <p>${item.price}</p>
                                <p className="text-sm text-gray-500">
                                    Color: {item?.color}
                                </p>
                            </div>

                            {/* QUANTITY */}
                            <div className="flex items-center gap-2">
                                {userId && (<button
                                    onClick={() =>
                                        dispatch(
                                            updateCartQuantity({
                                                userId,
                                                productId: item.productId,
                                                quantity: item.quantity - 1,
                                                color: item?.color || null,
                                                size: item?.size || null

                                            })
                                        )
                                    }
                                    className="px-2 border"
                                >
                                    -
                                </button>)}

                                <span>{item.quantity}</span>

                                {userId && (<button
                                    onClick={() =>
                                        dispatch(
                                            updateCartQuantity({
                                                userId,
                                                productId: item.productId,
                                                quantity: item.quantity + 1,
                                                color: item?.color || null,
                                                size: item?.size || null
                                            })
                                        )
                                    }
                                    className="px-2 border"
                                >
                                    +
                                </button>)}
                            </div>

                            {/* DELETE */}
                            {userId && (<button
                                onClick={() =>
                                    dispatch(
                                        removeFromCart({
                                            userId,
                                            productId: item.productId,
                                            color: item?.color || null,
                                            size: item?.size || null

                                        })
                                    )
                                }
                                className="text-red-500"
                            >
                                🗑️
                            </button>)}
                        </div>
                    ))
                ) : (
                    <p>Cart is empty</p>
                )}
            </div>

            {/* CHECKOUT SECTION */}
            {cartItems?.length > 0 && (
                <div className="mt-6 border p-4 rounded-lg">
                    <h2 className="text-xl font-bold">
                        Total: ${totalPrice}
                    </h2>
                     <Link href={`/checkout`}>
                    <button className="mt-3 w-full bg-black text-white p-2 rounded">
                        🎯 Checkout
                    </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;