import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

// ================= GET ALL USERS =================
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/users");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch users"
      );
    }
  }
);

// ================= GET USER BY ID =================
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId: string, thunkAPI) => {
    try {
      const res = await api.get(
        `/users/${userId}`
      );

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch user"
      );
    }
  }
);

// ================= UPDATE USER =================
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    {
      userId,
      userData,
    }: {
      userId: string;
      userData: any;
    },
    thunkAPI
  ) => {
    try {
      const res = await api.put(
        `/users/${userId}`,
        userData
      );

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to update user"
      );
    }
  }
);

// ================= DELETE USER =================
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, thunkAPI) => {
    try {
      await api.delete(
        `/users/${userId}`
      );

      return userId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to delete user"
      );
    }
  }
);