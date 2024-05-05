import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../processes/utils/consts";

export const reviewsAPI = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    // mode: "cors",
  }),
  endpoints: (builder) => ({
    getReviewById: builder.query({
      query: (review_id) => `/reviews/${review_id}`,
    }),
    updateReview: builder.mutation({
      query: ({ review_id, ...data }) => {
        console.log(data);
        return {
          url: `/reviews/${review_id}`,
          method: "PUT",
          body: { ...data },
        };
      },
    }),
    deleteReview: builder.mutation({
      query: (review_id) => ({
        url: `/reviews/${review_id}`,
        method: "DELETE",
      }),
    }),
    getRoomReviews: builder.query({
      query: (accommodation_id) => `/room/${accommodation_id}/reviews`,
    }),
    getCottageReviews: builder.query({
      query: (accommodation_id) => `/dacha/${accommodation_id}/reviews`,
    }),
    getHotelReviews: builder.query({
      query: (accommodation_id) => `/hotel/${accommodation_id}/reviews`,
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

export const {
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
  useCreateReviewMutation,
  useGetCottageReviewsQuery,
  useGetHotelReviewsQuery,
  useGetRoomReviewsQuery,
  useGetUserReviewsQuery,
  useDeleteReviewMutation,
} = reviewsAPI;
