// redux/calls/cartCalls.ts

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Domain } from "@/utils/constent";

// ================= TYPES =================

interface AddToCartData {
  userId: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

interface UpdateCartData {
  userId: string;
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

interface RemoveCartItemData {
  userId: string;
  productId: string;
  color?: string;
  size?: string;
}

// ================= ADD TO CART =================

export const addToCart = createAsyncThunk(
  "cart/addToCart",

  async (data: AddToCartData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${Domain}/cart`,
        data
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed To Add Product"
      );
    }
  }
);

// ================= GET CART =================

export const getCart = createAsyncThunk(
  "cart/getCart",

  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${Domain}/cart?userId=${userId}`,
       
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed To Get Cart"
      );
    }
  }
);

// ================= UPDATE CART QUANTITY =================

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",

  async (data: UpdateCartData, thunkAPI) => {
    try {
      const response = await axios.put(
        `${Domain}/cart`,
        {
          userId: data.userId,
          productId: data.productId,
          quantity: data.quantity,
          color: data.color ?? null,
          size: data.size ?? null,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.log("UPDATE CART ERROR:", error.response?.data);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed To Update Cart"
      );
    }
  }
);
// ================= REMOVE FROM CART =================

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",

  async (data: RemoveCartItemData, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${Domain}/cart`,
        {
          data,
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed To Remove Item"
      );
    }
  }
);

// ================= CLEAR CART =================

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${Domain}/cart/clear?userId=${userId}`
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed To Clear Cart"
      );
    }
  }
);