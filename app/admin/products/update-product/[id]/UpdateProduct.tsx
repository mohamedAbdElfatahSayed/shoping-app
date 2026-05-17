"use client";

import { getProduct, updateProduct } from "@/redux/calls/produtsCalls";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdateProduct = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector(
    (state: RootState) => state.products
  );

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    discountPrice: "",
    countInStock: "",
    colors: "",
    sizes: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [oldImages, setOldImages] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name || "",
      description: product.description || "",
      brand: product.brand || "",
      category: product.category || "",
      price: product.price || "",
      discountPrice: product.discountPrice || "",
      countInStock: product.countInStock || "",
      colors: JSON.stringify(product.colors || []),
      sizes: JSON.stringify(product.sizes || []),
    });

    setOldImages(
      product.images?.map((img: any) => img.url) || []
    );
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview(previews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    await dispatch(
      updateProduct({ id, values: formData })
    );

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">
          Update Product
        </h2>

        {/* GRID FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            name="discountPrice"
            value={form.discountPrice}
            onChange={handleChange}
            placeholder="Discount Price"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            name="countInStock"
            value={form.countInStock}
            onChange={handleChange}
            placeholder="Stock"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product Description"
          rows={4}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
        />

        {/* OLD IMAGES */}
        <div>
          <p className="font-semibold mb-2">
            Current Images
          </p>
          <div className="flex gap-3 flex-wrap">
            {oldImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-24 h-24 rounded-lg object-cover border"
              />
            ))}
          </div>
        </div>

        {/* NEW IMAGES */}
        <div>
          <p className="font-semibold mb-2">
            Upload New Images
          </p>

          <input
            type="file"
            multiple
            onChange={handleImages}
            className="w-full border p-2 rounded-lg"
          />

          <div className="flex gap-3 flex-wrap mt-3">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-24 h-24 rounded-lg object-cover border"
              />
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;