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
   const router=useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const { user } = useSelector(
    (state: RootState) => state.auth as any
  );

  const {cartItems}=useSelector((state:RootState)=>state.cart)
   
  useEffect(() => {
    setMounted(true);
    
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleLogout = () => {
    dispatch(logoutUser());
   router.push('/login')
    setOpen(false);
  };
  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-black/10 dark:border-white/10
        bg-red-400 dark:bg-black/60
        backdrop-blur-xl
        shadow-md shadow-black/5 dark:shadow-white/5
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          h-16
          px-3 sm:px-5 lg:px-8
          flex items-center justify-between
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            text-xl sm:text-2xl
            font-extrabold tracking-tight
            text-black dark:text-white
            shrink-0
          "
        >
          My
          <span
            className="
              bg-gradient-to-r
              from-blue-500 to-violet-500
              bg-clip-text text-transparent
            "
          >
            Store
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav
          className="
            hidden lg:flex
            items-center gap-4 xl:gap-6
          "
        >
          <Link
            href="/"
            className="
              text-sm font-medium
              hover:text-blue-500 transition
            "
          >
            Home
          </Link>

          <Link
            href="/products"
            className="
              text-sm font-medium
              hover:text-blue-500 transition
            "
          >
            Products
          </Link>

          {/* Dashboard */}
          {user?.isAdmin && (
            <Link
              href="/dashboard"
              className="
                flex items-center gap-1
                text-sm font-medium
                hover:text-blue-500 transition
              "
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          )}

          {/* Admin */}
          {user?.isAdmin && (
            <Link
              href="/admin/dashboard"
              className="
                px-3 py-1.5 rounded-full
                bg-blue-500 text-white
                text-sm font-medium
                hover:bg-blue-600 transition
              "
            >
              Admin
            </Link>
          )}

          {/* Cart */}
         <Link href={`/cart?userId=${user?.id}`}>
          <button
            className="
              relative
              p-2 rounded-full
              hover:bg-black/5
              dark:hover:bg-white/10
              transition
            "
          >
            <ShoppingCart size={22} />
{cartItems.length>0?(
            <span
              className="
                absolute -top-1 -right-1
                min-w-[18px] h-[18px]
                flex items-center justify-center
                rounded-full
                bg-red-600 text-white
                text-[10px] font-bold
              "
            >
             {cartItems.length}
            </span>):""}
          </button>
         </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">

              {/* Profile */}
              <Link href={`/profile/${user?.id}`}>
                <div
                  className="
                    flex items-center gap-2
                    px-3 py-1.5 rounded-full
                    bg-gray-100 dark:bg-zinc-900
                    hover:scale-105 transition
                    cursor-pointer
                  "
                >
                  <img
                    src={
                      user?.image?.url ||
                      "/default-avatar.png"
                    }
                    alt={user.username}
                    className="
                      w-8 h-8 rounded-full
                      object-cover
                    "
                  />

                  <span
                    className="
                      text-sm font-medium
                      max-w-[100px]
                      truncate
                    "
                  >
                    {user.username}
                  </span>
                </div>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="
                  px-4 py-2
                  rounded-xl
                  bg-black text-white
                  dark:bg-white dark:text-black
                  text-sm font-medium
                  hover:scale-105 transition
                "
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">

              <Link
                href="/login"
                className="
                  text-sm font-medium
                  hover:text-blue-500 transition
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                  px-4 py-2
                  rounded-xl
                  bg-blue-600 text-white
                  text-sm font-medium
                  hover:bg-blue-700 transition
                "
              >
                Register
              </Link>
            </div>
          )}

          {/* Theme */}
          <button
            onClick={() =>
              setTheme(isDark ? "light" : "dark")
            }
            className="
              p-2 rounded-full
              hover:bg-black/5
              dark:hover:bg-white/10
              transition
            "
          >
            {isDark ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
        </nav>

        {/* Mobile Actions */}
        <div
          className="
            flex lg:hidden
            items-center gap-1
          "
        >
          {/* Theme */}
          <button
            onClick={() =>
              setTheme(isDark ? "light" : "dark")
            }
            className="
              p-2 rounded-full
              hover:bg-black/5
              dark:hover:bg-white/10
              transition
            "
          >
            {isDark ? (
              <Sun size={22} />
            ) : (
              <Moon size={22} />
            )}
          </button>

          {/* Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="
              p-2 rounded-xl
              hover:bg-black/5
              dark:hover:bg-white/10
              transition
            "
          >
            {open ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden overflow-hidden
          transition-all duration-300
          ${
            open
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div
          className="
            px-4 pb-5 pt-3
            flex flex-col gap-3
            bg-white/90 dark:bg-black/90
            backdrop-blur-xl
            border-t border-black/5
            dark:border-white/10
          "
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="
              py-2 text-sm font-medium
              hover:text-blue-500
            "
          >
            Home
          </Link>

          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="
              py-2 text-sm font-medium
              hover:text-blue-500
            "
          >
            Products
          </Link>

          {/* Dashboard */}
          {user?.isAdmin && (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="
                  py-2 text-sm font-medium
                  hover:text-blue-500
                "
              >
                Dashboard
              </Link>

              <Link
                href="/admin/dashboard"
                onClick={() => setOpen(false)}
                className="
                  py-2 text-sm font-medium
                  text-blue-500
                "
              >
                Admin Dashboard
              </Link>
            </>
          )}

          {/* Cart */}
          <div
            className="
              flex items-center gap-2
              py-2
            "
          >
           <Link href={`/cart?userId=${user?.id}`}>
            <ShoppingCart size={20} />

           {cartItems.length > 0 && (
             <span className="text-sm">
               Cart ({cartItems.length})
             </span>
           )}
           </Link>
          </div>

          {/* User */}
          {user ? (
            <>
              <Link
                href={`/profile/${user?.id}`}
                onClick={() => setOpen(false)}
              >
                <div
                  className="
                    flex items-center gap-3
                    py-2
                  "
                >
                  <img
                    src={
                      user?.image?.url ||
                      "/default-avatar.png"
                    }
                    alt={user.username}
                    className="
                      w-9 h-9 rounded-full
                      object-cover
                    "
                  />

                  <span className="text-sm font-medium">
                    {user.username}
                  </span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="
                  w-full py-2
                  rounded-xl
                  bg-black text-white
                  dark:bg-white dark:text-black
                  font-medium
                "
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="
                  w-full py-2 text-center
                  rounded-xl
                  border border-black/10
                  dark:border-white/10
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="
                  w-full py-2 text-center
                  rounded-xl
                  bg-blue-600 text-white
                "
              >
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