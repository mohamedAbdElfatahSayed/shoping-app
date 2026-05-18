import { Domain } from "@/utils/constent";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",

  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${Domain}/orders/user/${userId}`
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed To Get Orders"
      );
    }
  }
);

export const getSingleOrder = createAsyncThunk(
  "orders/getSingleOrder",

  async (orderId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${Domain}/orders/${orderId}`
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed To Get Order"
      );
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",

  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${Domain}/orders/admin`
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed To Get Orders"
      );
    }
  }
);

export const updateOrderStatus =
  createAsyncThunk(
    "orders/updateOrderStatus",

    async (
      data: {
        orderId: string;
        status: string;
      },
      thunkAPI
    ) => {
      try {
        const response = await axios.put(
          `${Domain}/orders/${data.orderId}/status`,
          {
            status: data.status,
          }
        );

        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed To Update Status"
        );
      }
    }
  );