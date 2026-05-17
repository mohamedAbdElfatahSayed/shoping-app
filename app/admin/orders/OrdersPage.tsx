"use client";

import React, { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  AppDispatch,
  RootState,
} from "@/redux/store";

import {
  getAllOrders,
  updateOrderStatus,
} from "@/redux/calls/orderCalls";

import {
  Package,
  Truck,
  CheckCircle2,
} from "lucide-react";

const AdminOrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = (
    orderId: string,
    status: string
  ) => {
    dispatch(
      updateOrderStatus({
        orderId,
        status,
      })
    );
  };

  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";

      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-300";

      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";

      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl md:text-4xl font-bold animate-pulse">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-3 rounded-2xl shadow-md">
              <Package className="w-7 h-7" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
                Admin Orders
              </h1>

              <p className="text-gray-500 text-sm sm:text-base">
                Manage all customer orders
              </p>
            </div>
          </div>

          <div className="bg-white border rounded-2xl px-5 py-3 shadow-sm w-fit">
            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <h2 className="text-2xl font-bold">
              {orders.length}
            </h2>
          </div>
        </div>

        {/* TABLE DESKTOP */}
        <div className="hidden lg:block bg-white rounded-3xl shadow-md overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-5 text-left font-semibold">
                    Order ID
                  </th>

                  <th className="p-5 text-left font-semibold">
                    Total
                  </th>

                  <th className="p-5 text-left font-semibold">
                    Status
                  </th>

                  <th className="p-5 text-left font-semibold">
                    Created At
                  </th>

                  <th className="p-5 text-left font-semibold">
                    Change Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order: any) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    {/* ORDER ID */}
                    <td className="p-5">
                      <p className="font-medium text-gray-800 break-all max-w-[250px]">
                        {order._id}
                      </p>
                    </td>

                    {/* TOTAL */}
                    <td className="p-5">
                      <span className="text-xl font-bold text-black">
                        ${order.totalPrice}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="p-5">
                      <span
                        className={`px-4 py-2 rounded-full border text-sm font-semibold capitalize ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="p-5 text-gray-600">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* ACTION */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        {order.status ===
                          "pending" && (
                          <Truck className="w-5 h-5 text-yellow-600" />
                        )}

                        {order.status ===
                          "shipped" && (
                          <Truck className="w-5 h-5 text-blue-600" />
                        )}

                        {order.status ===
                          "delivered" && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}

                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order._id,
                              e.target.value
                            )
                          }
                          className="border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-black bg-white cursor-pointer"
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="shipped">
                            Shipped
                          </option>

                          <option value="delivered">
                            Delivered
                          </option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE + TABLET CARDS */}
        <div className="grid gap-4 lg:hidden">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md border p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm text-gray-500">
                    Order ID
                  </h2>

                  <p className="font-semibold text-gray-800 break-all mt-1">
                    {order._id}
                  </p>
                </div>

                {order.status ===
                  "delivered" ? (
                  <CheckCircle2 className="text-green-600 w-6 h-6" />
                ) : (
                  <Truck className="w-6 h-6 text-blue-600" />
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <h3 className="text-xl font-bold">
                    ${order.totalPrice}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Date
                  </p>

                  <h3 className="font-medium">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </h3>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <span
                  className={`w-fit px-4 py-2 rounded-full border text-sm font-semibold capitalize ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                  className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black bg-white cursor-pointer w-full"
                >
                  <option value="pending">
                    Pending
                  </option>

                  <option value="shipped">
                    Shipped
                  </option>

                  <option value="delivered">
                    Delivered
                  </option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {orders.length === 0 && (
          <div className="bg-white rounded-3xl shadow-md border p-10 text-center mt-6">
            <h2 className="text-2xl font-bold text-gray-700">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              لا توجد طلبات حالياً
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;