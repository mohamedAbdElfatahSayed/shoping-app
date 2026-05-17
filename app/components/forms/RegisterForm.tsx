"use client";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/calls/authCalls";
import { RootState, AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const result = await dispatch(
      registerUser({ username, email, password })
    );

    if (registerUser.fulfilled.match(result)) {
      router.push("/login");
    }
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-transparent text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500 transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 space-y-6">

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Account 🚀
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Join us and start your journey
          </p>
        </div>

        {/* Inputs */}
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className={inputStyle}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyle}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={inputStyle}
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white 
          bg-green-600 hover:bg-green-700 active:scale-[0.98] 
          transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Register"}
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