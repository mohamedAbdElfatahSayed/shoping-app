"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Skeleton Loading
  if (!mounted) {
    return (
      <div className="p-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-10 w-72 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-gray-200 rounded-2xl"></div>
          <div className="h-40 bg-gray-200 rounded-2xl"></div>
          <div className="h-40 bg-gray-200 rounded-2xl"></div>
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
      </div>

      {/* Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-2xl p-6">
          Total Orders
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          Total Products
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          Total Users
        </div>
      </div>
    </div>
  );
};

export default Dashboard;