// redux/slices/reviewsSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  getReviews,
  deleteReview,
  updateReview,
} from "../calls/reviewsCalls";

type Review = {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type ReviewsState = {
  reviews: Review[];
  loading: boolean;
  error: string | null;
};

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewsState: (state) => {
      state.reviews = [];
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    // ================= GET REVIEWS =================
    builder.addCase(getReviews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    });

    builder.addCase(getReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ================= CREATE REVIEW =================
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.reviews = action.payload.reviews || state.reviews;
    });

    builder.addCase(createReview.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // ================= DELETE REVIEW =================
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.reviews = state.reviews.filter(
        (r) => r._id !== action.payload.reviewId
      );
    });

    builder.addCase(deleteReview.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // ================= UPDATE REVIEW =================
    builder.addCase(updateReview.fulfilled, (state, action) => {
      const index = state.reviews.findIndex(
        (r) => r._id === action.payload.reviewId
      );

      if (index !== -1) {
        state.reviews[index] = {
          ...state.reviews[index],
          ...action.payload.updatedReview,
        };
      }
    });

    builder.addCase(updateReview.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearReviewsState } = reviewsSlice.actions;

export default reviewsSlice.reducer;