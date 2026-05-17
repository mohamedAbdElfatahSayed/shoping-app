// redux/slices/cartSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../calls/cartCalls";

// ================= TYPES =================

interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartPayload {
  cartItems: CartItem[];
  totalPrice: number;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

// ================= INITIAL STATE =================

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

// ================= HELPER =================

const updateCartState = (
  state: CartState,
  payload: CartPayload
) => {
  state.cartItems = payload.cartItems || [];
  state.totalPrice = payload.totalPrice || 0;
};

// ================= SLICE =================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // ================= ADD TO CART =================

    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<CartPayload>) => {
        state.loading = false;

        updateCartState(state, action.payload);
      }
    );

    builder.addCase(addToCart.rejected, (state, action: any) => {
      state.loading = false;

      state.error =
        action.payload || "Failed To Add Product";
    });

    // ================= GET CART =================

    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      getCart.fulfilled,
      (state, action: PayloadAction<CartPayload>) => {
        state.loading = false;

        updateCartState(state, action.payload);
      }
    );

    builder.addCase(getCart.rejected, (state, action: any) => {
      state.loading = false;

      state.error =
        action.payload || "Failed To Get Cart";
    });

    // ================= UPDATE QUANTITY =================

    builder.addCase(updateCartQuantity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      updateCartQuantity.fulfilled,
      (state, action: PayloadAction<CartPayload>) => {
        state.loading = false;
        updateCartState(state, action.payload);
      }
    );

    builder.addCase(
      updateCartQuantity.rejected,
      (state, action: any) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed To Update Quantity";
      }
    );

    // ================= REMOVE ITEM =================

    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      removeFromCart.fulfilled,
      (state, action: PayloadAction<CartPayload>) => {
        state.loading = false;

        updateCartState(state, action.payload);
      }
    );

    builder.addCase(
      removeFromCart.rejected,
      (state, action: any) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Failed To Remove Product";
      }
    );

    // ================= CLEAR CART =================

    builder.addCase(clearCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(clearCart.fulfilled, (state) => {
      state.loading = false;

      state.cartItems = [];
      state.totalPrice = 0;
    });

    builder.addCase(clearCart.rejected, (state, action: any) => {
      state.loading = false;

      state.error =
        action.payload ||
        "Failed To Clear Cart";
    });
  },
});

// ================= EXPORT =================

export default cartSlice.reducer;