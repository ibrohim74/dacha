import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../processes/utils/consts";

export const bookingAPI = createApi({
  reducerPath: "bookings",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  endpoints: (builder) => ({
    createBookingRequest: builder.mutation({
      query: (data) => ({
        url: "/create_request",
        method: "POST",
        body: data,
      }),
    }),
    acceptBookingRequest: builder.mutation({
      query: (request_id) => ({
        url: `/request/${request_id}/accept`,
        method: "POST",
      }),
    }),
    denyBookingRequest: builder.mutation({
      query: (request_id) => ({
        url: `/request/${request_id}/deny`,
        method: "POST",
      }),
    }),
    getSellerBookings: builder.query({
      query: (seller_id) => `/seller/${seller_id}/bookings`,
    }),
    getCustomerBookings: builder.query({
      query: (args) => {
        const { customer_id, status } = args;
        console.log(status);
        return {
          url: `/customer/${customer_id}/bookings`,
          params: status,
        };
      },
    }),
    getSellerRequests: builder.query({
      query: (seller_id) => `/seller/${seller_id}/requests`,
    }),
    getCustomerRequests: builder.query({
      query: (customer_id) => `/customer/${customer_id}/requests`,
    }),
    getRequest: builder.query({
      query: (request_id) => `/request/${request_id}`,
    }),
    getBooking: builder.query({
      query: (booking_id) => `/booking/${booking_id}`,
    }),
    deleteBooking: builder.mutation({
      query: (booking_id) => ({
        url: `/booking/${booking_id}`,
        method: "DELETE",
      }),
    }),
    getAccommodationBookings: builder.query({
      query: (accommodation_id) => `/room/${accommodation_id}/bookings`,
    }),
    cancelBooking: builder.mutation({
      query: (booking_id) => ({
        url: `/booking/${booking_id}/cancel`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateBookingRequestMutation,
  useAcceptBookingRequestMutation,
  useDenyBookingRequestMutation,
  useGetSellerBookingsQuery,
  useGetCustomerBookingsQuery,
  useGetSellerRequestsQuery,
  useGetCustomerRequestsQuery,
  useGetBookingQuery,
  useDeleteBookingMutation,
  useGetAccommodationBookingsQuery,
  useCancelBookingMutation,
} = bookingAPI;
