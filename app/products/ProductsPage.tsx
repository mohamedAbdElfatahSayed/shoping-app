"use client";

import { getAllProducts } from "@/redux/calls/produtsCalls";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import ProductsSkeleton from "./skeleton";

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allProducts, products, pages, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);

  const data = showAll ? allProducts : products;

  useEffect(() => {
    dispatch(getAllProducts(page));
  }, [dispatch, page]);

  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 rounded-3xl">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            className="p-2 bg-blue-400 rounded-2xl hover:bg-blue-500 text-white"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show 6 Products" : "Show All Products"}
          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            🛍️ Products
          </h1>

          {!showAll && (
            <span className="text-sm text-gray-500">
              Page {page} of {pages}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && data?.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            No products found 😢
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {!showAll && (
          <div className="flex justify-center mt-10">
            <div className="bg-white shadow-sm border rounded-xl px-4 py-3">
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