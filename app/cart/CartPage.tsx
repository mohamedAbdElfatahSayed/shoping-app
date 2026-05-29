"use client";

import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "@/redux/calls/cartCalls";
import { AppDispatch } from "@/redux/store";
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
  }, [dispatch, userId]);

  // 💰 Total Price
  const totalPrice = cartItems?.reduce((acc: number, item: any) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Shopping Cart 🛒
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Review your items before checkout
          </p>
        </div>

        {/* CART ITEMS */}
        <div className="space-y-5">
          {cartItems?.length ? (
            cartItems.map((item: any) => (
              <div
                key={item.productId}
                className="
                  flex flex-col md:flex-row items-center gap-5
                  bg-white dark:bg-gray-900
                  border border-gray-200 dark:border-gray-800
                  rounded-2xl p-4 shadow-sm
                  hover:shadow-lg transition-all duration-300
                "
              >
                {/* IMAGE */}
                <div className="shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-28 h-28 object-cover rounded-xl
                      border border-gray-200 dark:border-gray-700
                    "
                  />
                </div>

                {/* INFO */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                    ${item.price}
                  </p>

                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Color: {item?.color || "N/A"}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Size: {item?.size || "N/A"}
                    </p>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3">
                  {userId && (
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            userId,
                            productId: item.productId,
                            quantity: item.quantity - 1,
                            color: item?.color || null,
                            size: item?.size || null,
                          })
                        )
                      }
                      className="
                        w-10 h-10 rounded-full
                        bg-gray-200 dark:bg-gray-800
                        hover:bg-gray-300 dark:hover:bg-gray-700
                        text-lg font-bold
                        transition
                      "
                    >
                      -
                    </button>
                  )}

                  <span className="text-lg font-bold min-w-[30px] text-center">
                    {item.quantity}
                  </span>

                  {userId && (
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            userId,
                            productId: item.productId,
                            quantity: item.quantity + 1,
                            color: item?.color || null,
                            size: item?.size || null,
                          })
                        )
                      }
                      className="
                        w-10 h-10 rounded-full
                        bg-gray-200 dark:bg-gray-800
                        hover:bg-gray-300 dark:hover:bg-gray-700
                        text-lg font-bold
                        transition
                      "
                    >
                      +
                    </button>
                  )}
                </div>

                {/* DELETE */}
                {userId && (
                  <button
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          userId,
                          productId: item.productId,
                          color: item?.color || null,
                          size: item?.size || null,
                        })
                      )
                    }
                    className="
                      text-red-500 hover:text-red-700
                      dark:hover:text-red-400
                      text-2xl transition
                    "
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))
          ) : (
            <div
              className="
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                rounded-2xl p-10 text-center
              "
            >
              <p className="text-2xl font-semibold">
                Cart is empty 🛒
              </p>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Add some products to your cart
              </p>
            </div>
          )}
        </div>

        {/* CHECKOUT */}
        {cartItems?.length > 0 && (
          <div
            className="
              mt-8
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              rounded-2xl p-6 shadow-md
            "
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">
                Total
              </h2>

              <span className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                ${totalPrice}
              </span>
            </div>

            <Link href="/checkout">
              <button
                className="
                  w-full py-3 rounded-xl
                  bg-black dark:bg-white
                  text-white dark:text-black
                  font-semibold text-lg
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  transition-all duration-300
                "
              >
                🎯 Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;