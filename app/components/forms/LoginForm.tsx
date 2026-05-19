"use client";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/calls/authCalls";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";

export default function LoginPage() {
   const router = useRouter();



  const dispatch = useDispatch<AppDispatch>();

  const { user,loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


 const handleLogin = async () => {
  if (email === "") return toast.error("email required");
  if (password.length < 6)
    return toast.error("password 6 characters");

  const result = await dispatch(
    loginUser({ email, password })
  );

    

  

  if (loginUser.fulfilled.match(result)) {
    toast.success("login success");
   const loggedUser = result.payload;

  if (loggedUser?.isAdmin) {
    router.push("/admin");
  } else {
    router.push("/");
  }

    setEmail("");
    setPassword("");
  } else {
    toast.error("invalid email or password");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 space-y-6">

        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back 👋
        </h1>

        {/* Email */}
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 
          bg-transparent text-gray-900 dark:text-white outline-none 
          focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Password */}
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 
          bg-transparent text-gray-900 dark:text-white outline-none 
          focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white 
          bg-blue-600 hover:bg-blue-700 active:scale-[0.98] 
          transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}