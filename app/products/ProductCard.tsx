"use client";

import { addToCart } from "@/redux/calls/cartCalls";
import { AppDispatch, RootState } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth as any);
  const router=useRouter()
   const handleAddToCart=()=>{
    if(!user?.id){ 
       router.replace('/login')
      return toast.error("Login To Add To Cart")}
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
              )
   }
  return (
    <div className="
      w-full max-w-sm
      bg-white dark:bg-zinc-950
      border border-gray-200 dark:border-zinc-800
      rounded-2xl shadow-sm hover:shadow-xl
      transition-all duration-300
      overflow-hidden flex flex-col group
    ">

      {/* Image */}
      <div
        className="relative w-full h-52 overflow-hidden bg-gray-100 dark:bg-zinc-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={
            isHovered
              ? product.images?.[1]?.url || product.images?.[0]?.url
              : product.images?.[0]?.url
          }
          alt={product?.name || "product image"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {product.discountPrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Sale
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* Name */}
        <h2 className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-gray-100">
          {product.name}
        </h2>

        {/* Brand + Category */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{product.brand}</span>
          <span>•</span>
          <span>{product.category}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-green-600 font-bold text-lg">
            ${product.discountPrice || product.price}
          </p>

          {product.discountPrice && (
            <p className="text-gray-400 line-through text-sm">
              ${product.price}
            </p>
          )}
        </div>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((color: string) => (
              <span
                key={color}
                className="
                  px-2 py-1 text-[11px] rounded-full
                  border border-gray-200 dark:border-zinc-700
                  bg-gray-50 dark:bg-zinc-900
                  text-gray-700 dark:text-gray-300
                "
              >
                {color}
              </span>
            ))}
          </div>
        )}

        {/* Sizes */}
        {product.size?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {product.size.map((size: string) => (
              <span
                key={size}
                className="
                  px-2 py-1 text-[11px] rounded-md
                  bg-gray-100 dark:bg-zinc-900
                  text-gray-700 dark:text-gray-300
                "
              >
                EU {size}
              </span>
            ))}
          </div>
        )}

        {/* Stock + Rating */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Stock: {product.countInStock}</span>
          <span>⭐ {product.rating || 0}</span>
        </div>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto">

          <button
            onClick={handleAddToCart            
            }
            className="
              flex items-center justify-center gap-2
              bg-black dark:bg-white
              text-white dark:text-black
              py-2 rounded-xl
              hover:opacity-80 transition
            "
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <Link href={`/products/${product._id}`} className="w-full">
            <button className="
              w-full py-2 rounded-xl
              bg-blue-600 hover:bg-blue-500
              text-white transition
            ">
              Show More
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;