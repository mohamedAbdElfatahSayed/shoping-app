"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Sun,
  Moon,
  LayoutDashboard,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logoutUser } from "@/redux/calls/authCalls";
import { useRouter } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth as any);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <header className="h-16 border-b bg-white dark:bg-zinc-950" />;
  }

  const isDark = resolvedTheme === "dark";

  const handleLogout = () => {
    dispatch(logoutUser());
    router.replace("/login");
    setOpen(false);
  };

  return (
    <header className="
      sticky top-0 z-50
      border-b border-gray-200 dark:border-zinc-800
      bg-white/80 dark:bg-zinc-950/80
      backdrop-blur-xl
      transition-colors
    ">

      <div className="
        max-w-7xl mx-auto
        h-16 px-3 sm:px-5 lg:px-8
        flex items-center justify-between
      ">

        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-gray-900 dark:text-white">
          My
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            Store
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">

          <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition">
            Home
          </Link>

          <Link href="/products" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition">
            Products
          </Link>

          {user?.isAdmin && (
            <>
              <Link href="/dashboard" className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link href="/admin/dashboard" className="px-3 py-1.5 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
                Admin
              </Link>
            </>
          )}

          {/* Cart */}
          <Link href={`/cart?userId=${user?.id}`}>
            <button className="
              relative p-2 rounded-full
              hover:bg-gray-400 dark:hover:bg-zinc-800
              transition
            ">
              <ShoppingCart size={22} />

              {cartItems?.length > 0 && (
                <span className="
                  absolute -top-1 -right-1
                  min-w-[18px] h-[18px]
                  flex items-center justify-center
                  rounded-full
                  bg-red-500 text-white
                  text-[10px] font-bold
                ">
                  {cartItems.length}
                </span>
              )}
            </button>
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">

              <Link href={`/profile/${user?.id}`}>
                <div className="
                  flex items-center gap-2
                  px-3 py-1.5 rounded-full
                  bg-gray-100 dark:bg-zinc-900
                  hover:bg-gray-200 dark:hover:bg-zinc-800
                  transition
                ">
                  <img
                    src={user?.image?.url || "/default-avatar.png"}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="user"
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[100px]">
                    {user.username}
                  </span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="
                  px-4 py-2 rounded-xl
                  bg-black text-white
                  dark:bg-white dark:text-black
                  hover:opacity-80 transition
                "
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">

              <Link href="/login" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500">
                Login
              </Link>

              <Link href="/register" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                Register
              </Link>

            </div>
          )}

          {/* Theme */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-400 dark:hover:bg-zinc-800 transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

        </nav>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-2">

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        lg:hidden overflow-hidden transition-all duration-300
        ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
      `}>

        <div className="
          px-4 pb-5 pt-3 flex flex-col gap-3
          bg-white dark:bg-zinc-950
          border-t border-gray-200 dark:border-zinc-800
        ">

          <Link href="/" onClick={() => setOpen(false)} className="py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Home
          </Link>

          <Link href="/products" onClick={() => setOpen(false)} className="py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Products
          </Link>

          {user && (
            <Link href={`/profile/${user?.id}`} onClick={() => setOpen(false)} className="py-2 text-sm">
              Profile
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/login" className="w-full py-2 text-center border rounded-xl border-gray-300 dark:border-zinc-700">
                Login
              </Link>

              <Link href="/register" className="w-full py-2 text-center rounded-xl bg-blue-600 text-white">
                Register
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;