// src/store/userApiSlice.js
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),

    getUserByUuid: builder.query({
      query: (uuid) => `/users/${uuid}`,
    }),

    deleteUser: builder.mutation({
      query: (uuid) => ({
        url: `/users/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ uuid, userData }) => ({
        url: `/users/${uuid}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByUuidQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
