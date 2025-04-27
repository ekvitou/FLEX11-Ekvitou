import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../store/apiSlice";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getAllProducts.matchFulfilled, 
      (state, { payload }) => {
        state.products = payload.products;
      }
    );
  },
});

export default productSlice.reducer;
