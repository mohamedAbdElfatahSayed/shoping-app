import { Domain } from "@/utils/constent";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    data: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(`${Domain}/login`, data, {
        withCredentials: true, // مهم للـ cookies (JWT)
      });

      return res.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    data: { username: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(`${Domain}/register`, data, {
        withCredentials: true,
      });

      return res.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Register failed"
      );
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      // لو عندك API logout
      await axios.post(`${Domain}/logout`, {
        withCredentials:true
      });

      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);