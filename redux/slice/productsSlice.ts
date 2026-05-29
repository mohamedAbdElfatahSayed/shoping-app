import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../calls/produtsCalls";

type ProductState = {
  products: any[];
  allProducts: any[];
  product: any | null;
  loading: boolean;
  pages: number;
  page: number;
  total: number;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  allProducts: [],
  product: null,
  loading: false,
  pages: 1,
  page: 1,
  total: 0,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    clearProduct(state) {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =======================
      // GET ALL PRODUCTS
      // =======================
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
        state.total = action.payload.total;
        state.allProducts = action.payload.allProducts;
      })

      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =======================
      // GET SINGLE PRODUCT
      // =======================
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =======================
      // CREATE PRODUCT
      // =======================
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products.unshift(action.payload);
        state.total += 1;
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =======================
      // UPDATE PRODUCT
      // =======================
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );

        if (state.product?._id === action.payload._id) {
          state.product = action.payload;
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =======================
      // DELETE PRODUCT
      // =======================
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );

        state.total -= 1;

        if (state.product?._id === action.payload) {
          state.product = null;
        }
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =======================
      // SEARCH PRODUCTS
      // =======================
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
         console.log(action.payload)
        state.products = action.payload.products;
        state.total = action.payload.totalProducts;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })

      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProduct } = productsSlice.actions;

export default productsSlice.reducer;