"use client";

import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteProduct, getAllProducts } from "@/redux/calls/produtsCalls";
import Link from "next/link";
import Pagination from "@/app/products/Pagination";

const ProductsTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, pages } = useSelector(
    (state: RootState) => state.products
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts(page));
  }, [dispatch, page]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(id));
      dispatch(getAllProducts(page));
    }
  };

  return (
    <div className="w-full space-y-6">

      {/* ================= TABLE ================= */}
      <div className="hidden min-[900px]:block overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Category</th>
              <th className="p-3">Created By</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product: any) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* Product */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={product.images?.[0]?.url}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.brand}
                    </p>
                  </div>
                </td>

                {/* Price */}
                <td className="p-3 font-bold text-green-600">
                  ${product.price}
                </td>

                {/* Stock */}
                <td className="p-3">
                  {product.countInStock > 0 ? (
                    <span className="text-green-600">
                      In Stock ({product.countInStock})
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Out of Stock
                    </span>
                  )}
                </td>

                {/* Category */}
                <td className="p-3 text-gray-600">
                  {product.category}
                </td>

                {/* Created By */}
                <td className="p-3 text-gray-600">
                  {product.user?.username}
                </td>

                {/* Actions */}
                <td className="p-3">
                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/admin/products/update-product/${product._id}`}
                      className="text-blue-600 cursor-pointer hover:scale-110 transition"
                    >
                      <Edit size={18} />
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 cursor-pointer hover:scale-110 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {/* Pagination Desktop */}
        <div className="mt-6 flex justify-center">
          <Pagination
            page={page}
            pages={pages || 1}
            setPage={setPage}
          />
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid grid-cols-1 gap-4 min-[900px]:hidden">

        {products?.map((product: any) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3"
          >

            {/* Product */}
            <div className="flex items-center gap-3">
              <img
                src={product.images?.[0]?.url}
                className="w-14 h-14 rounded-lg object-cover"
              />

              <div>
                <p className="font-semibold">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">
                  {product.brand}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="flex justify-between text-sm">
              <span className="text-green-600 font-bold">
                ${product.price}
              </span>

              <span>
                {product.countInStock > 0
                  ? `Stock: ${product.countInStock}`
                  : "Out of stock"}
              </span>
            </div>

            <p className="text-xs text-gray-500">
              Category: {product.category}
            </p>

            <p className="text-xs text-gray-500">
              By: {product.user?.username}
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">

              <Link
                href={`/admin/products/update-product/${product._id}`}
                className="text-blue-600"
              >
                <Edit size={18} />
              </Link>

              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-600"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Pagination Mobile */}
      <div className="flex justify-center mt-6 min-[900px]:hidden">
        <Pagination
          page={page}
          pages={pages || 1}
          setPage={setPage}
        />
      </div>

    </div>
  );
};

export default ProductsTable;