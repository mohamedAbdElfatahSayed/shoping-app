import { Middleware } from "@reduxjs/toolkit";
import { loginUser } from "../calls/authCalls";
import { logout } from "../slice/authSlice";
import type { RootState } from "../store";

const localStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (typeof window === "undefined") return next(action);

    const result = next(action);

    if (loginUser.fulfilled.match(action)) {
      const { user } = store.getState().auth;

      if (user) {
        localStorage.setItem("userInfo", JSON.stringify(user));
      }
    }

    if (logout.match(action)) {
      localStorage.removeItem("userInfo");
      
    }

    return result;
  };

export default localStorageMiddleware;