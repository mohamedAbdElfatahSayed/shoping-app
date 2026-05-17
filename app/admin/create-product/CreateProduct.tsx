"use client";

import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createProduct } from "@/redux/calls/produtsCalls";

const CreateProduct = () => {
    const dispatch=useDispatch<AppDispatch>()
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    size: [],
    colors: [],
    discountPrice: "",
    countInStock: "",
    images: [] as File[],
  });

  // ✅ text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    setForm((prev) => ({
      ...prev,
      images: Array.from(files),
    }));
  };

  // ✅ submit (FormData for backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("brand", form.brand);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("discountPrice", form.discountPrice);
    formData.append("countInStock", form.countInStock);

    form.images.forEach((file) => {
      formData.append("images", file);
    });

    // const res = await fetch("/api/products", {
    //   method: "POST",
    //   body: formData,
    // });

    // const data = await res.json();
    // console.log(data);
    await dispatch(createProduct(formData))
  };

  return (
    <div className="max-w-3xl mx-auto p-4">

      {/* Header */}
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <PlusCircle />
        Create Product
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4"
      >

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        {/* Brand + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

        </div>

        {/* Price + Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            name="discountPrice"
            placeholder="Discount Price"
            value={form.discountPrice}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

        </div>

        {/* Stock */}
        <input
          type="number"
          name="countInStock"
          placeholder="Count In Stock"
          value={form.countInStock}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        {/* Images */}
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
          className="w-full border p-3 rounded-xl"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Create Product
        </button>

      </form>
    </div>
  );
};

export default CreateProduct;