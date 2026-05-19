"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  UserCircle,
  LogOut,
  AppWindowMacIcon,
  Grid,
  Store,
  Tag,
  ShoppingCart,
  Plus,
  Package,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logoutUser } from "@/redux/calls/authCalls";

const sidebarLinks = [
  {
    title: "Admin",
    href: "/admin",
    icon: AppWindowMacIcon,
  },
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: ShoppingCart,
  },
  {
    title: "Create Product",
    href: "/admin/create-product",
    icon: Plus,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: Package,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
 
];

const AdminLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const router=useRouter()
  const dispatch=useDispatch<AppDispatch>()
  const handleLogout=()=>{
    dispatch(logoutUser())
    router.replace('/login')

  }
  
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-black">

      {/* Sidebar */}
      <aside
        className="
          w-64 hidden md:flex flex-col
          border-r border-gray-200 dark:border-gray-800
          bg-white dark:bg-zinc-950
          p-5
        "
      >
        {/* Logo */}
        <div className="mb-10">
                

          <h1 className="text-2xl font-bold">
            Admin Panel
          </h1>

          <p className="text-sm text-gray-500">
            Manage your application
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2 flex-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;

            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-3
                  px-4 py-3 rounded-xl
                  transition-all
                  ${
                    active
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-zinc-900"
                  }
                `}
              >
                <Icon size={20} />
                <span>{link.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button onClick={handleLogout}
          type="submit"
          className="
            mt-auto flex items-center gap-2
            px-4 py-3 rounded-xl
            bg-red-500 text-white
            hover:bg-red-600 transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        
        {/* Topbar */}
        <div
          className="
            mb-6 p-4 rounded-2xl
            bg-white dark:bg-zinc-950
            border border-gray-200 dark:border-gray-800
            flex items-center justify-between
          "
        >
          <div>
            <Link href={`/admin/dashboard`}>
            <h2 className="text-xl font-bold bg-blue-500 cursor-pointer text-white  p-2 rounded-2xl hover:bg-blue-600">
              Admin Dashboard
            </h2>
            </Link>

            <p className="text-sm text-gray-500">
              Welcome back 👋
            </p>
          </div>

          {/* Admin Avatar */}
          <div className="flex items-center gap-3">
           

            <div>
              <p className="font-semibold">
                Admin
              </p>

              <p className="text-xs text-gray-500">
                administrator
              </p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div
          className="
            bg-white dark:bg-zinc-950
            border border-gray-200 dark:border-gray-800
            rounded-2xl p-6
            min-h-[80vh]
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;