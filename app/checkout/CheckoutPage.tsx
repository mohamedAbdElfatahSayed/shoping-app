"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCart, clearCart } from "@/redux/calls/cartCalls";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "cod",
  });

  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getCart(userId));
    }
  }, [userId, dispatch]);

  const totalPrice =
    cart?.cartItems?.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    ) || 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    try {
      setLoading(true);

  // 1. create order
  await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      items: cart.cartItems,
      shippingAddress: form,
      paymentMethod: form.paymentMethod,
    }),
  });

  // 2. clear cart (IMPORTANT)
  // 3. force refresh cart in redux
  if(userId){
    await dispatch(clearCart(userId))
    dispatch(getCart(userId));

  }

  // 4. redirect
  router.push("/order-success");
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* SHIPPING FORM */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          name="fullName"
          placeholder="Full Name"
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          className="border p-2"
          onChange={handleChange}
        />
      </div>

      {/* PAYMENT */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Payment Method</label>
        <select
          name="paymentMethod"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, paymentMethod: e.target.value })
          }
        >
          <option value="cod">Cash on Delivery</option>
          <option value="card">Card</option>
        </select>
      </div>

      {/* ORDER SUMMARY */}
      <div className="border p-4 mb-6">
        <h2 className="font-bold mb-2">Order Summary</h2>

        {cart?.cartItems?.map((item: any) => (
          <div key={item.productId} className="flex justify-between">
             <Image width={30} height={30} src={item.image} alt={item.name}/>
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-2" />

        <div className="font-bold">
          Total: ${totalPrice}
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={placeOrder}
        disabled={loading || !cart?.cartItems?.length}
        className="bg-black text-white px-6 py-2 w-full"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;