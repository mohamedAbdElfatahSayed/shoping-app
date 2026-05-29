import Link from "next/link";

const Footer = () => {
  return (
    <footer className="
      mt-10 border-t
      border-gray-200 dark:border-zinc-800
      bg-white dark:bg-zinc-950
      transition-colors
    ">

      <div className="
        max-w-7xl mx-auto
        px-6 py-8
        flex flex-col md:flex-row
        items-center justify-between
        gap-6
      ">

        {/* Left */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage users, orders and products easily.
          </p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6 text-sm">

          <Link href="/admin/dashboard" className="
            text-gray-600 dark:text-gray-300
            hover:text-blue-500 transition
          ">
            Dashboard
          </Link>

          <Link href="/admin/users" className="
            text-gray-600 dark:text-gray-300
            hover:text-blue-500 transition
          ">
            Users
          </Link>

          <Link href="/admin/orders" className="
            text-gray-600 dark:text-gray-300
            hover:text-blue-500 transition
          ">
            Orders
          </Link>

          <Link href="/products" className="
            text-gray-600 dark:text-gray-300
            hover:text-blue-500 transition
          ">
            Products
          </Link>

        </div>

        {/* Right */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;