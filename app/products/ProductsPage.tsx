"use client";

// 1. Fixed the import typo: produtsCalls -> productsCalls

import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import ProductsSkeleton from "./skeleton";
import { Search } from "lucide-react";
import { getAllProducts } from "@/redux/calls/produtsCalls";
import Link from "next/link";

// Define a quick interface for type safety instead of 'any' if possible, 
// but keeping it flexible here for your model layout.
interface Product {
  _id: string;
  name: string;
  [key: string]: any;
}

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allProducts, products, pages, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const data = showAll ? allProducts : products;

  useEffect(() => {
    dispatch(getAllProducts(page));
    // 2. Clear search when switching pages so the user doesn't get stuck on an empty screen
    setSearch(""); 
  }, [dispatch, page]);

  // Search Filter
  const filteredProducts = useMemo(() => {
    return data?.filter((product: Product) =>
      product.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search */}

        <div className="relative mb-8">
          <Link href={`/products/search`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-2xl mb-2">
            Search Page 
          </button>
          </Link>
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full p-4 pl-14
              rounded-2xl
              bg-white dark:bg-zinc-800
              text-gray-800 dark:text-gray-100
              border border-gray-200 dark:border-zinc-700
              outline-none
              focus:ring-2 focus:ring-blue-500
              transition
            "
          />
          <Search
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-gray-500 dark:text-gray-400
              w-5 h-5
            "
          />
        </div>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <button
            className="
              px-5 py-3 rounded-2xl
              bg-blue-500 hover:bg-blue-600
              text-white font-medium
              transition
              shadow-md
            "
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show 6 Products" : "Show All Products"}
          </button>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            🛍️ Products
          </h1>

          {!showAll && (
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Page {page} of {pages}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              text-center text-red-500
              bg-red-50 dark:bg-red-950/30
              p-4 rounded-xl mb-6 border border-red-200 dark:border-red-900/40
            "
          >
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredProducts?.length === 0 && (
          <div
            className="
              text-center py-20
              text-gray-500 dark:text-gray-400
              text-lg
            "
          >
            No products found 😢
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {!showAll && (
          <div className="flex justify-center mt-10">
            <div
              className="
                bg-white dark:bg-zinc-950
                shadow-sm
                border border-gray-200 dark:border-zinc-800
                rounded-2xl
                px-4 py-3
              "
            >
              <Pagination
                page={page}
                pages={pages || 1}
                setPage={setPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;