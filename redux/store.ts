import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import usersReducer from "./slice/usersSlice";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";
import orederReducer from "./slice/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users:usersReducer,
    products:productsReducer,
    cart:cartReducer,
    orders:orederReducer
  },

 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;