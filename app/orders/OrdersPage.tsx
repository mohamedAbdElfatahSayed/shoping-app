"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";
import { getUserOrders } from "@/redux/calls/orderCalls";
import Image from "next/image";

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const { orders, loading } = useSelector(
    (state: RootState) => state.orders
  );
   console.log(orders)
  useEffect(() => {
    if (user?.id) {
      dispatch(getUserOrders(user.id));
    }
  }, [dispatch, user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="border rounded-lg p-5"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="font-bold">
                    Order ID:
                  </h2>

                  <p className="text-gray-600">
                    {order._id}
                  </p>
                </div>

                <div>
                  <span className="bg-black text-white px-3 py-1 rounded">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item: any) => (
                  <div
                    key={item.productId}
                    className="flex justify-between"
                  > 
                    <div>
                  <Image className="rounded-sm" width={30} height={30} src={item.image} alt={item.name}/>
                      {item.name} x {item.quantity}
                    </div>

                    <div>
                      $
                      {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-bold">
                <span>Total</span>

                <span>${order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;