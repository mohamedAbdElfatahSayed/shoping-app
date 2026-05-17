"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Star,
} from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$220",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$75",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: "$95",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  },
];

const categories = [
  "Electronics",
  "Fashion",
  "Accessories",
  "Gaming",
  "Shoes",
  "Smart Devices",
];

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
            alt="hero"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-36 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm border border-white/20">
              New Collection 2026
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-6">
              Upgrade Your <br /> Digital Lifestyle
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8 max-w-xl">
              Discover premium products, fast shipping, and unbeatable prices.
              Everything you need in one modern ecommerce experience.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/products"
                className="bg-white text-black px-7 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:scale-105 transition"
              >
                Shop Now <ArrowRight size={18} />
              </Link>

              <Link
                href="/categories"
                className="border border-white/30 px-7 py-4 rounded-2xl font-semibold hover:bg-white hover:text-black transition"
              >
                Explore Categories
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl w-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"
                alt="product"
                width={500}
                height={500}
                className="rounded-2xl object-cover h-[350px]"
              />

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">iPhone Pro</h3>
                  <p className="text-gray-300 mt-1">Starting from $999</p>
                </div>

                <button className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:scale-105 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <Truck className="w-10 h-10 mb-4 text-black" />
            <h3 className="font-bold text-xl">Fast Delivery</h3>
            <p className="text-gray-600 mt-2 leading-7">
              Get your orders delivered quickly and securely worldwide.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <ShieldCheck className="w-10 h-10 mb-4 text-black" />
            <h3 className="font-bold text-xl">Secure Payments</h3>
            <p className="text-gray-600 mt-2 leading-7">
              Multiple payment methods with full transaction protection.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <Headphones className="w-10 h-10 mb-4 text-black" />
            <h3 className="font-bold text-xl">24/7 Support</h3>
            <p className="text-gray-600 mt-2 leading-7">
              Friendly support team ready to help anytime you need.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold">Shop By Category</h2>
            <p className="text-gray-500 mt-2">
              Explore trending product categories.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center font-semibold hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold">Featured Products</h2>
            <p className="text-gray-500 mt-2">
              Best selling products this week.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 font-semibold hover:gap-3 transition-all"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition"
            >
              <div className="relative overflow-hidden h-[280px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1 mb-3 text-yellow-500">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>

                <h3 className="text-xl font-bold">{product.name}</h3>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-extrabold">
                    {product.price}
                  </span>

                  <button className="bg-black text-white p-3 rounded-xl hover:scale-105 transition">
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-black text-white rounded-[40px] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Get 30% OFF <br /> On Your First Order
            </h2>

            <p className="text-gray-300 mt-5 max-w-2xl leading-8">
              Sign up now and enjoy exclusive discounts, premium deals, and
              early access to our newest collections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-4 rounded-2xl bg-white text-black outline-none min-w-[280px]"
            />

            <button className="bg-white text-black px-6 py-4 rounded-2xl font-bold hover:scale-105 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold">SHOPIFY</h2>
            <p className="text-gray-500 mt-2">
              Modern ecommerce experience built with Next.js.
            </p>
          </div>

          <div className="flex gap-6 text-gray-600 font-medium">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
