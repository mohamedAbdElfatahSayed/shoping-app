import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "../calls/authCalls";

type UserType = {
  image?: string;
  id?: string;
  _id?: string;
  username: string;
  email: string;
  isAdmin: boolean;
};

type AuthState = {
  user: UserType | null;
  loading: boolean;
  error: string | null;
};

// ================= SAFE LOCAL STORAGE =================
const getUserInfo = (): UserType | null => {
  if (typeof window === "undefined")
    return null;

  try {
    const data =
      localStorage.getItem("userInfo");

    return data
      ? JSON.parse(data)
      : null;
  } catch (error) {
    console.log(error);

    localStorage.removeItem(
      "userInfo"
    );

    return null;
  }
};

// ================= INITIAL STATE =================
const initialState: AuthState = {
  user: getUserInfo(),
  loading: false,
  error: null,
};

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // Restore user after refresh
    loadUserFromStorage: (state) => {
      state.user = getUserInfo();
    },
  },

  extraReducers: (builder) => {
    builder;

    // ================= LOGIN =================
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user = action.payload;

          state.error = null;

          if (
            typeof window !== "undefined"
          ) {
            localStorage.setItem(
              "userInfo",
              JSON.stringify(
                action.payload
              )
            );
          }
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            (action.payload as string) ||
            "Login failed";
        }
      );

    // ================= REGISTER =================
    builder
      .addCase(
        registerUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user = action.payload;

          state.error = null;

          if (
            typeof window !== "undefined"
          ) {
            localStorage.setItem(
              "userInfo",
              JSON.stringify(
                action.payload
              )
            );
          }
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            (action.payload as string) ||
            "Register failed";
        }
      );

    // ================= LOGOUT =================
    builder
      .addCase(
        logoutUser.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        logoutUser.fulfilled,
        (state) => {
          state.loading = false;

          state.user = null;

          state.error = null;

          if (
            typeof window !== "undefined"
          ) {
            localStorage.removeItem(
              "userInfo"
            );
          }
        }
      )

      .addCase(
        logoutUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            (action.payload as string) ||
            "Logout failed";
        }
      );
  },
});

export const {
  loadUserFromStorage,
} = authSlice.actions;

export default authSlice.reducer;