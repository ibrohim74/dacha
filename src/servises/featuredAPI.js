import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../processes/utils/consts";

export const feauturedAPI = createApi({
  reducerPath: "feautured",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),

  endpoints: (builder) => ({
    createFeatured: builder.mutation({
      query: (featured) => ({
        url: "/add_featured",
        method: "POST",
        body: featured,
      }),
    }),
    getFeaturedById: builder.query({
      query: (featured_id) => `/featured/${featured_id}`,
    }),
    deleteFeatured: builder.mutation({
      query: (featured_id) => ({
        url: `/featured/${featured_id}`,
        method: "DELETE",
      }),
    }),
    getUserFeatured: builder.query({
      query: (user_id) => `/user/${user_id}/featured`,
    }),
  }),
});

export const {
  useCreateFeaturedMutation,
  useGetFeaturedByIdQuery,
  useDeleteFeaturedMutation,
  useGetUserFeaturedQuery,
} = feauturedAPI;
