"use client";

import React, { useEffect, useState } from "react";
import { getProduct } from "@/redux/calls/produtsCalls";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { addToCart } from "@/redux/calls/cartCalls";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProductPage = ({ id }: { id: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { product, loading } = useSelector(
        (state: RootState) => state.products
    );

    const { user } = useSelector((state: RootState) => state.auth);

    const [mainImage, setMainImage] = useState<string>("");

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product?.images?.length) {
            setMainImage(product.images[0].url);
        } else {
            setMainImage("/favicon.ico");
        }
    }, [product]);

    const handleAddToCart = () => {
        if (!user?.id) {
            toast.error("Go To Login");
            router.push("/login");
            return;
        }

        if (!product?._id) {
            toast.error("Product not loaded yet");
            return;
        }

        if ((product?.countInStock ?? 0) <= 0) {
            toast.error("Out of stock");
            return;
        }

        const image = product.images?.[0]?.url ?? "";

        dispatch(
            addToCart({
                  userId: user.id,
                  productId: product._id,
                  name: product.name,
                  image: product.images?.[0]?.url,
                  price: product.discountPrice || product.price,
                  quantity: 1,
                  color: product.colors?.[0],
                  size: product.size?.[0],
            })
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl">
                Product Not Found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Images Section */}
                <div>
                    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border bg-gray-100">
                        <Image
                            src={mainImage || "/favicon.ico"}
                            alt={product?.name || "product image"}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div className="flex gap-3 mt-4 flex-wrap">
                        {product.images?.map((img: any, index: number) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(img.url)}
                                className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 cursor-pointer transition hover:scale-105 ${
                                    mainImage === img.url
                                        ? "border-black"
                                        : "border-gray-300"
                                }`}
                            >
                                <Image
                                    src={img.url || "/favicon.ico"}
                                    alt={product?.name || "product thumbnail"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">

                    <span className="text-sm text-gray-500 uppercase">
                        {product.category}
                    </span>

                    <h1 className="text-4xl font-bold">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-2">
                        <span className="text-yellow-500 text-xl">
                            ⭐⭐⭐⭐⭐
                        </span>

                        <span className="text-gray-500">
                            ({product.reviews?.length || 0} Reviews)
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold">
                            ${product.discountPrice || product.price}
                        </span>

                        {product.discountPrice && (
                            <span className="text-2xl text-gray-400 line-through">
                                ${product.price}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 text-lg">
                        {product.description}
                    </p>

                    <div>
                        <span className="font-semibold">Brand:</span>{" "}
                        <span>{product.brand}</span>
                    </div>

                    <div>
                        <span className="font-semibold">Stock:</span>{" "}
                        <span
                            className={
                                product.countInStock > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                        >
                            {product.countInStock > 0
                                ? "In Stock"
                                : "Out Of Stock"}
                        </span>
                    </div>

                    {/* Colors */}
                    {product.colors?.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">
                                Colors
                            </h3>

                            <div className="flex gap-2 flex-wrap">
                                {product.colors.map(
                                    (color: string, i: number) => (
                                        <button
                                            key={i}
                                            className="px-4 py-2 border rounded-full hover:bg-black hover:text-white"
                                        >
                                            {color}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* Sizes */}
                    {product.size?.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">
                                Sizes
                            </h3>

                            <div className="flex gap-2 flex-wrap">
                                {product.size.map(
                                    (size: string, i: number) => (
                                        <button
                                            key={i}
                                            className="w-12 h-12 border rounded-xl hover:bg-black hover:text-white"
                                        >
                                            {size}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.countInStock === 0}
                            className={`flex-1 py-4 rounded-2xl text-white font-semibold transition ${
                                product.countInStock === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black hover:bg-gray-800"
                            }`}
                        >
                            Add To Cart
                        </button>

                        <button className="px-6 py-4 rounded-2xl border hover:bg-gray-100">
                            ❤️
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-8">
                    Customer Reviews
                </h2>

                {product.reviews?.length > 0 ? (
                    <div className="space-y-6">
                        {product.reviews.map((review: any) => (
                            <div
                                key={review._id}
                                className="border rounded-2xl p-5"
                            >
                                <div className="flex justify-between mb-2">
                                    <h3 className="font-semibold">
                                        {review.userName}
                                    </h3>

                                    <span className="text-yellow-500">
                                        ⭐ {review.rating}/5
                                    </span>
                                </div>

                                <p className="text-gray-600">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        No Reviews Yet
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductPage;