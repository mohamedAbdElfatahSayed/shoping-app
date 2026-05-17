"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";

import {
  Users,
  ShieldCheck,
  UserRound,
  Settings,
  ArrowRight,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useEffect } from "react";
import { getAllProducts } from "@/redux/calls/produtsCalls";
import { getAllUsers } from "@/redux/calls/usersCalls";

const Dashboard = () => {
  const { users } = useSelector((state: RootState) => state.users);
   
     const { products,page,total } = useSelector(
       (state: RootState) => state.products
     );
 
  const totalUsers = users?.length || 0;
  const admins = users?.filter((u) => u.isAdmin)?.length || 0;
 
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(getAllProducts(page));
    dispatch(getAllUsers())

  }, [dispatch,page]);

  
  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back 👋
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Total Users */}
        <Link href={`/admin/users`}>
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Users</p>

              <h2 className="text-3xl font-bold mt-2">
                {totalUsers}
              </h2>
            </div>

            <div className="bg-white/20 p-3 rounded-xl">
              <Users size={30} />
            </div>
          </div>
        </div>
        </Link>

        {/* Admins */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Admins</p>

              <h2 className="text-3xl font-bold mt-2">
                {admins}
              </h2>
            </div>

            <div className="bg-white/20 p-3 rounded-xl">
              <ShieldCheck size={30} />
            </div>
          </div>
        </div>

        {/* Regular Users */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Regular Users</p>

              <h2 className="text-3xl font-bold mt-2">
                {totalUsers - admins}
              </h2>
            </div>

            <div className="bg-white/20 p-3 rounded-xl">
              <UserRound size={30} />
            </div>
          </div>
        </div>
        <Link href={`/admin/products`}>
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">All Products</p>

              <h2 className="text-3xl font-bold mt-2">
                {total}
              </h2>
            </div>

            <div className="bg-white/20 p-3 rounded-xl">
              <ShoppingCart size={30} />
            </div>
          </div>
        </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-2xl border bg-white dark:bg-zinc-900 shadow-sm">

        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Quick Actions
        </h3>

        <div className="flex flex-wrap gap-3">

          <Link href="/admin/users">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white shadow">
              <Users size={18} />
              View Users
              <ArrowRight size={16} />
            </button>
          </Link>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-800 transition text-white shadow">
            <Settings size={18} />
            Settings
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;