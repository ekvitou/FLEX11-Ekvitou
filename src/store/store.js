// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../store/apiSlice"; // base for all RTK Query endpoints
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    // Use apiSlice's reducerPath, not productApi
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add apiSlice middleware
});

export default store;
