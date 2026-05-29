"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getReviews } from "@/redux/calls/reviewsCalls";

const Reviews = ({ productId }: { productId: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { reviews, loading } = useSelector(
    (state: any) => state.reviews
  );

  useEffect(() => {
    if (productId) {
      dispatch(getReviews(productId));
    }
  }, [dispatch, productId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-5">
        Customer Reviews ⭐
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : reviews?.length === 0 ? (
        <p className="text-gray-500">No reviews yet</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div
              key={review._id}
              className="
                p-4 rounded-xl
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                transition
              "
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {review.name}
                </h3>

                <span className="text-yellow-500 font-bold">
                  ⭐ {review.rating}
                </span>
              </div>

              {/* COMMENT */}
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;