import { Domain } from "@/utils/constent";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// ========================
// 📥 GET ALL PRODUCTS
// ========================
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (page:number, thunkAPI) => {
    try {
      const { data } = await axios.get(`${Domain}/products?page=${page}&limit=8`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// ========================
// 📥 GET SINGLE PRODUCT
// ========================
export const getProduct = createAsyncThunk(
  "products/getOne",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${Domain}/products/${id}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// ========================
// ➕ CREATE PRODUCT
// ========================
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData: any, thunkAPI) => {
    try {
      const { data } = await axios.post(`${Domain}/products`, productData);
      return data.product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// ========================
// ✏️ UPDATE PRODUCT
// ========================
export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    { id, values }: { id: string; values: any },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.put(`${Domain}/products/${id}`, values);
      return data.product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// ========================
// ❌ DELETE PRODUCT
// ========================
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${Domain}/products/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

// redux/calls/productCalls.ts


export const searchProducts = createAsyncThunk(
  "products/searchProducts",

  async (
    {
      keyword,
      pageNumber,
    }: {
      keyword: string;
      pageNumber?: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await fetch(
        `${Domain}/products/search?keyword=${keyword}&page=${pageNumber || 1}&limit=6`
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);