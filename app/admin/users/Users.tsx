"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteUser, getAllUsers } from "@/redux/calls/usersCalls";
import { Eye, Trash2, Users } from "lucide-react";
import Link from "next/link";

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 sm:p-6 lg:p-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div className="flex items-center gap-2">
            <Users className="text-blue-500" />
            <h1 className="text-2xl font-bold">
              Users Dashboard
            </h1>
          </div>

          <div className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 w-fit">
            Total: {users?.length || 0}
          </div>

        </div>
      </div>

      {/* GRID RESPONSIVE (IMPORTANT FIX) */}
      <div className="
        max-w-6xl mx-auto
        grid grid-cols-1
        sm:grid-cols-1
        md:grid-cols-1
        min-[750px]:grid-cols-1
        lg:grid-cols-1
        gap-4
      ">

        {users?.map((user) => (
          <div
            key={user._id}
            className="
              flex flex-col
              min-[750px]:flex-row
              min-[750px]:items-center
              min-[750px]:justify-between

              gap-4
              p-4 sm:p-5 lg:p-6

              rounded-xl

              bg-white dark:bg-zinc-900
              border border-gray-200 dark:border-gray-800

              shadow-sm
              hover:shadow-md
              transition
            "
          >

            {/* LEFT */}
            <div className="flex items-center gap-3 min-w-0">

              <img
                src={user.image?.url || "/default-avatar.png"}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />

              <div className="min-w-0">
                <p className="font-semibold truncate">
                  {user.username}
                </p>

                <p className="text-sm text-gray-500 truncate">
                  {user.email}
                </p>

                <span className="
                  inline-block mt-1 text-xs px-2 py-1 rounded-full
                  bg-gray-200 dark:bg-gray-700
                ">
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="
              flex
              flex-col
              min-[750px]:flex-row
              gap-2
              w-full min-[750px]:w-auto
            ">

              <Link href={`/profile/${user._id}`} className="flex-1 min-[750px]:flex-none">
                <button className="
                  w-full px-3 py-2
                  bg-gray-800 text-white
                  rounded-lg
                ">
                  <Eye size={14} />
                </button>
              </Link>

              <button
                onClick={() => dispatch(deleteUser(user._id))}
                className="
                  flex-1 min-[750px]:flex-none
                  px-3 py-2
                  bg-red-500 text-white
                  rounded-lg
                "
              >
                <Trash2 size={14} />
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default UsersPage;