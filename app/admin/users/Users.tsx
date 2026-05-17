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
      <div className="p-6 text-center">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6">
      
      {/* title */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Users List
      </h1>

      {/* users */}
      <div className="grid gap-4">
        {users?.map((user) => (
          <div
            key={user._id}
            className="
              p-4 rounded-xl
              border border-gray-200 dark:border-gray-800
              bg-white dark:bg-black
              flex flex-col md:flex-row
              md:items-center md:justify-between
              gap-4
            "
          >

            {/* left side */}
            <div className="flex items-center gap-3 min-w-0">

              {/* image */}
              <img
                src={
                  user.image?.url ||
                  "/default-avatar.png"
                }
                alt={user.username}
                className="
                  w-12 h-12
                  rounded-full
                  object-cover
                  border
                  shrink-0
                "
              />

              {/* info */}
              <div className="min-w-0">
                <p className="font-semibold truncate">
                  {user.username}
                </p>

                <p
                  className="
                    text-sm text-gray-500
                    truncate
                  "
                >
                  {user.email}
                </p>

                {/* role */}
                <span
                  className={`
                    inline-block mt-1
                    text-xs px-2 py-1 rounded-full
                    ${
                      user.isAdmin
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 dark:bg-gray-700"
                    }
                  `}
                >
                  {user.isAdmin
                    ? "Admin"
                    : "User"}
                </span>
              </div>
            </div>

            {/* buttons */}
            <div
              className="
                flex flex-wrap
                gap-2
                w-full md:w-auto
              "
            >

              {/* update */}
                {/* <Link href={`/profile/update-user/${user?._id}`}>
                              <button
                className="
                  flex-1 md:flex-none
                  flex items-center justify-center gap-1
                  px-3 py-2 rounded-lg
                  bg-blue-500 text-white
                  hover:bg-blue-600 transition
                  text-sm cursor-pointer
                "
              >
                <Pencil size={15} />
                <span className="hidden  sm:inline">
                  Update
                </span>
              </button>

                </Link> */}
              {/* show */}
              <Link href={`/profile/${user?._id}`} >
              <button
                className="
                  flex-1 md:flex-none
                  flex items-center justify-center gap-1
                  px-3 py-2 rounded-lg
                  bg-gray-500 text-white
                  hover:bg-gray-600 transition
                  text-sm cursor-pointer
                "
              >
                <Eye size={14} />
                <span className="hidden sm:inline">
                  
                </span>
              </button>
              </Link>

              {/* delete */}
              <button onClick={()=>dispatch(deleteUser(user._id))}
                className="
                  flex-1 md:flex-none
                  flex items-center justify-center gap-1
                  px-3 py-2 rounded-lg
                  bg-red-500 text-white
                  hover:bg-red-600 transition
                  text-sm cursor-pointer
                "
              >
                <Trash2 size={14} />
                <span className="hidden sm:inline">
                  
                </span>
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;