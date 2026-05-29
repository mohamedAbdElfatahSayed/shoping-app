// redux/${Domain}Calls/reviewApiCalls.ts

import { Domain } from "@/utils/constent";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= CREATE REVIEW =================
export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (
    {
      productId,
      rating,
      comment,
      token,
    }: {
      productId: string;
      rating: number;
      comment: string;
      token: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.put(
        `${Domain}/products/review`,
        {
          productId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ================= GET REVIEWS =================
export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (productId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${Domain}/products/review/${productId}`
      );

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ================= DELETE REVIEW =================
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (
    {
      productId,
      reviewId,
      token,
    }: {
      productId: string;
      reviewId: string;
      token: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.delete(
        `${Domain}/products/review/${productId}?reviewId=${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { ...data, reviewId };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ================= UPDATE REVIEW =================
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async (
    {
      productId,
      reviewId,
      rating,
      comment,
      token,
    }: {
      productId: string;
      reviewId: string;
      rating: number;
      comment: string;
      token: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.patch(
        `${Domain}/products/review/${productId}?reviewId=${reviewId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { ...data, reviewId };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);