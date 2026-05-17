"use client";

import React, { useEffect } from "react";

import { useParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";

import {
  AppDispatch,
  RootState,
} from "@/redux/store";

import { getSingleOrder } from "@/redux/calls/orderCalls";

const OrderDetailsPage = () => {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { singleOrder, loading } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    if (params.id) {
      dispatch(getSingleOrder(params.id as string));
    }
  }, [dispatch, params.id]);

  if (loading || !singleOrder) {
    return <h1 className="p-6">Loading...</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Order Details
      </h1>

      {/* ORDER INFO */}
      <div className="border rounded-lg p-5 mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="font-bold">
              Order ID
            </h2>

            <p className="text-gray-600">
              {singleOrder._id}
            </p>
          </div>

          <div>
            <span className="bg-black text-white px-3 py-1 rounded">
              {singleOrder.status}
            </span>
          </div>
        </div>

        <p className="text-gray-500">
          Created At:
        </p>

        <p>
          {new Date(
            singleOrder.createdAt
          ).toLocaleDateString()}
        </p>
      </div>

      {/* SHIPPING */}
      <div className="border rounded-lg p-5 mb-6">
        <h2 className="text-xl font-bold mb-4">
          Shipping Address
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong>{" "}
            {
              singleOrder.shippingAddress
                ?.fullName
            }
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {
              singleOrder.shippingAddress
                ?.phone
            }
          </p>

          <p>
            <strong>City:</strong>{" "}
            {
              singleOrder.shippingAddress
                ?.city
            }
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {
              singleOrder.shippingAddress
                ?.address
            }
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="border rounded-lg p-5 mb-6">
        <h2 className="text-xl font-bold mb-4">
          Products
        </h2>

        <div className="space-y-4">
          {singleOrder.items.map((item: any) => (
            <div
              key={item.productId}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="font-bold">
                $
                {item.price *
                  item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOTAL */}
      <div className="border rounded-lg p-5">
        <div className="flex justify-between text-xl font-bold">
          <span>Total Price</span>

          <span>
            ${singleOrder.totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;