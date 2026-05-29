"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { searchProducts } from "@/redux/calls/produtsCalls";
import { Search } from "lucide-react";
import Link from "next/link";
import Pagination from "../Pagination";

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { products, pages, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (searchKeyword.trim() !== "") {
      dispatch(
        searchProducts({
          keyword: searchKeyword,
          pageNumber: page,
        })
      );
    }
  }, [dispatch, page, searchKeyword]);

  const handleSearch = () => {
    setPage(1);
    setSearchKeyword(keyword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-900 dark:to-black py-12 px-4 transition-all">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Find Your Products 🔎
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Search and discover products instantly
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          
          <div className="flex items-center flex-1 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2">
            <Search className="text-gray-500 dark:text-gray-300 w-5 h-5" />

            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-transparent outline-none px-3 py-2 text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={handleSearch}
            className="px-6 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-blue-600 to-blue-500
            hover:from-blue-700 hover:to-blue-600
            shadow-md hover:shadow-lg transition-all duration-300"
          >
            Search
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-pulse text-gray-600 dark:text-gray-300">
              Loading products...
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || "/no-image.png"}
                    alt={product.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                      ${product.price}
                    </span>

                    <Link href={`/products/${product._id}`}>
                      <button className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-black hover:opacity-80 transition">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && products.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Pagination page={page} setPage={setPage} pages={pages || 1} />
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && searchKeyword && products.length === 0 && (
          <div className="text-center mt-20">
            <div className="text-6xl mb-4">😕</div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No products found for "{searchKeyword}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;