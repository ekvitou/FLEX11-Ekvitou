// src/store/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ishop-api.istad.co/api/v1",
    prepareHeaders: (headers) => {
      const raw = localStorage.getItem("auth");
      let token;

      try {
        token = JSON.parse(raw)?.token || raw;
      } catch {
        token = raw;
      }

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Product", "Auth"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page = 1) => `/products?page=${page}&size=12`,
      providesTags: ["Product"],
    }),
    // ✅ Other endpoints remain untouched
  }),
});

export const { useGetAllProductsQuery } = apiSlice;
