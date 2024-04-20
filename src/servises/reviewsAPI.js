import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  endpoints: (builder) => ({
    getReviewById: builder.query({
      query: (review_id) => `/reviews/${review_id}`,
    }),
    updateReview: builder.mutation({
      query: (review_id, data) => ({
        url: `/reviews/${review_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getRoomReviews: builder.query({
      query: (accommodation_id) => `/room/${accommodation_id}/reviews`,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: "/add_review",
        method: "POST",
        body: data,
      }),
    }),
    getUserReviews: builder.query({
      query: (user_id) => `/user/${user_id}/reviews`,
    }),
  }),
});

export const { useGetReviewByIdQuery } = reviewsApi;
