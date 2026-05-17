import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <div>
          <h2 className="text-lg font-bold">
            Admin Dashboard
          </h2>

          <p className="text-sm text-gray-500">
            Manage users, orders and products easily.
          </p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <button className="hover:text-black transition">
            Dashboard
          </button>

          <button className="hover:text-black transition">
            Users
          </button>

          <button className="hover:text-black transition">
            Orders
          </button>

          <button className="hover:text-black transition">
            Products
          </button>
        </div>

        {/* Right */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;