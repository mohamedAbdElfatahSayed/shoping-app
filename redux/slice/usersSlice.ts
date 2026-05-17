import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../calls/usersCalls";

type User = {
  image: any;
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
};

type UsersState = {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET ALL =================
      .addCase(
        getAllUsers.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getAllUsers.fulfilled,
        (state, action) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(
        getAllUsers.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            (action.payload as string) ||
            "Error";
        }
      )

      // ================= GET BY ID =================
      .addCase(
        getUserById.fulfilled,
        (state, action) => {
          state.selectedUser =
            action.payload;
        }
      )

      // ================= UPDATE =================
      .addCase(
        updateUser.fulfilled,
        (state, action) => {
          const updated =
            action.payload;

          state.users = state.users.map(
            (u) =>
              u._id === updated._id
                ? updated
                : u
          );

          state.selectedUser = updated;
        }
      )

      // ================= DELETE =================
      .addCase(
        deleteUser.fulfilled,
        (state, action) => {
          state.users = state.users.filter(
            (u) =>
              u._id !== action.payload
          );
        }
      );
  },
});

export const {
  clearSelectedUser,
} = usersSlice.actions;

export default usersSlice.reducer;