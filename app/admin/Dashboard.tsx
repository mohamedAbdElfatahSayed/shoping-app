"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";

import UsersPage from "./users/Users";
import { getAllOrders } from "@/redux/calls/orderCalls";
import { getAllUsers } from "@/redux/calls/usersCalls";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

  const { user, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const { users } = useSelector(
    (state: RootState) => state.users
  );
   const { orders } = useSelector(
      (state: RootState) => state.orders
    );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  }, []);
const totalRevenue = orders.reduce(
  (acc, order) => acc + order.totalPrice,
  0
);
  // Prevent hydration mismatch
  if (!mounted || loading) {
    return (
      <div className="p-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-10 w-72 bg-gray-200 rounded-lg"></div>

          <div className="h-4 w-40 bg-gray-200 rounded mt-3"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="h-40 bg-gray-200 rounded-2xl"></div>

          <div className="h-40 bg-gray-200 rounded-2xl"></div>

          <div className="h-40 bg-gray-200 rounded-2xl"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>

          <div className="space-y-3">
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.username}
        </h1>

        <p className="text-gray-500 mt-1">
          Admin Dashboard Panel
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white shadow rounded-2xl p-5 border">
          <h2 className="text-gray-500 text-sm">
            Total Users
          </h2>

          <p className="text-3xl font-bold mt-2">
            {users.length}
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 border">
          <h2 className="text-gray-500 text-sm">
            Total Orders
          </h2>

          <p className="text-3xl font-bold mt-2">
            {orders.length}
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 border">
          <h2 className="text-gray-500 text-sm">
            Revenue
          </h2>

          <p className="text-3xl font-bold mt-2">
           ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white rounded-2xl shadow border p-5">
        <UsersPage />
      </div>
    </div>
  );
};

export default Dashboard;