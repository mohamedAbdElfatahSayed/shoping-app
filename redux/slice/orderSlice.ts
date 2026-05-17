import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders, getSingleOrder, getUserOrders, updateOrderStatus } from "../calls/orderCalls";

interface OrderState {
  orders: any[];
  singleOrder: any,
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  singleOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getUserOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });

    builder.addCase(getUserOrders.rejected, (state, action: any) => {
      state.loading = false;

      state.error =
        action.payload ||
        "Failed To Get Orders";
    });
    builder.addCase(getSingleOrder.pending, (state) => {
  state.loading = true;
});

builder.addCase(
  getSingleOrder.fulfilled,
  (state, action) => {
    state.loading = false;

    state.singleOrder = action.payload;
  }
);

builder.addCase(
  getSingleOrder.rejected,
  (state, action: any) => {
    state.loading = false;

    state.error =
      action.payload ||
      "Failed To Get Order";
  }
);
builder.addCase(
  getAllOrders.fulfilled,
  (state, action) => {
    state.loading = false;

    state.orders = action.payload;
  }
);

builder.addCase(
  updateOrderStatus.fulfilled,
  (state, action) => {
    state.loading = false;

    state.orders = state.orders.map(
      (order: any) =>
        order._id === action.payload._id
          ? action.payload
          : order
    );
  }
);
  },
});



export default orderSlice.reducer;