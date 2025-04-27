// src/store/productApiSlice.js
import { apiSlice } from "./apiSlice"; // This is your shared RTK base slice

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page = 1) => `/products?page=${page}&size=12`,
    }),
  }),
});

export const { useGetAllProductsQuery } = extendedProductApi;
