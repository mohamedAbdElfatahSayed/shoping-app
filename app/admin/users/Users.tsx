"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteUser, getAllUsers } from "@/redux/calls/usersCalls";
import { Eye, Trash2 } from "lucide-react";
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
      <div className="p-6 text-center text-gray-500">
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
    <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Users Management
        </h1>

        <span className="text-sm text-gray-500">
          Total: {users?.length || 0}
        </span>
      </div>

      {/* Users grid */}
      <div className="grid gap-4 sm:gap-5">
        {users?.map((user) => (
          <div
            key={user._id}
            className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-4
              p-4 sm:p-5
              rounded-2xl
              border border-gray-200 dark:border-gray-800
              bg-white dark:bg-zinc-900
              shadow-sm hover:shadow-md
              transition
            "
          >
            {/* LEFT */}
            <div className="flex items-center gap-4 min-w-0">
              
              <img
                src={user.image?.url || "/default-avatar.png"}
                alt={user.username}
                className="
                  w-12 h-12 sm:w-14 sm:h-14
                  rounded-full
                  object-cover
                  border
                  shrink-0
                "
              />

              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">
                  {user.username}
                </p>

                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {user.email}
                </p>

                <span
                  className={`
                    inline-block mt-1 text-xs px-2 py-1 rounded-full
                    ${
                      user.isAdmin
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                    }
                  `}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </div>
            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex gap-2 sm:justify-end w-full sm:w-auto">
              
              {/* View */}
              <Link href={`/profile/${user._id}`} className="flex-1 sm:flex-none">
                <button
                  className="
                    w-full sm:w-auto
                    flex items-center justify-center gap-1
                    px-3 py-2 rounded-lg
                    bg-gray-600 text-white
                    hover:bg-gray-700
                    transition
                    text-sm
                  "
                >
                  <Eye size={14} />
                  View
                </button>
              </Link>

              {/* Delete */}
              <button
                onClick={() => dispatch(deleteUser(user._id))}
                className="
                  flex-1 sm:flex-none
                  flex items-center justify-center gap-1
                  px-3 py-2 rounded-lg
                  bg-red-500 text-white
                  hover:bg-red-600
                  transition
                  text-sm
                "
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;