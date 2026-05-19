import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../calls/produtsCalls";

type ProductState = {
  products: any[];
  allProducts:any[];
  product: any | null;
  loading: boolean;
    pages: number;
  page: number;
  total:number;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  allProducts:[],
  product: null,
    loading: false,
  pages: 2,
  page: 2,
  total:0,
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
        console.log(action.payload)
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
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })

      // =======================
      // CREATE PRODUCT
      // =======================
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      // =======================
      // UPDATE PRODUCT
      // =======================
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );

        if (state.product?._id === action.payload._id) {
          state.product = action.payload;
        }
      })

      // =======================
      // DELETE PRODUCT
      // =======================
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );

        if (state.product?._id === action.payload) {
          state.product = null;
        }
      });
  },
});

export const { clearProduct } = productsSlice.actions;
export default productsSlice.reducer;