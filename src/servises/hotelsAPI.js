import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../processes/utils/consts";

export const hotelsAPI = createApi({
  reducerPath: "hotelsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  endpoints: (builder) => ({
    listUserHotels: builder.query({
      query: (user_id) => `/user/hotels/${user_id}`,
    }),
    createHotel: builder.mutation({
      query: (hotel_data) => ({
        url: "/hotel_create",
        method: "POST",
        body: hotel_data,
      }),
    }),
    getHotel: builder.query({
      query: (hotel_id) => `/hotel/${hotel_id}`,
    }),
    updateHotel: builder.mutation({
      query: (hotel_id, update_data) => ({
        url: `/hotel/${hotel_id}`,
        method: "PUT",
        body: update_data,
      }),
    }),
    deleteHotel: builder.mutation({
      query: (hotel_id) => `/hotel/${hotel_id}`,
      method: "DELETE",
    }),
    getAllHotels: builder.query({
      query: () => "/hotels",
    }),
    getHotelRooms: builder.query({
      query: (hotel_id) => `/hotel/${hotel_id}/rooms`,
    }),
    getRoom: builder.query({
      query: (room_id) => `/room/${room_id}`,
    }),
    updateRoom: builder.mutation({
      query: (room_id, room_data) => ({
        url: `room/${room_id}`,
        method: "PUT",
        body: room_data,
      }),
    }),
    deleteRoom: builder.mutation({
      query: (room_id) => ({
        url: `room/${room_id}`,
        method: "DELETE",
      }),
    }),
    addRoom: builder.mutation({
      query: (room_data) => ({
        url: `add_room`,
        method: "PUT",
        body: room_data,
      }),
    }),
    uploadRoomPhoto: builder.mutation({
      query: (room_id, photo_data) => ({
        url: `/room/${room_id}/upload_photo`,
        method: "POST",
        body: photo_data,
      }),
    }),
    deleteRoomPhoto: builder.mutation({
      query: (room_id, file_id) => `/api/media/rooms/${room_id}/${file_id}`,
      method: "DELETE",
    }),
    getAllRooms: builder.query({
      query: () => "/rooms",
    }),
  }),
});

export const {
  useListUserHotelsQuery,
  useCreateHotelMutation,
  useGetHotelQuery,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useGetAllHotelsQuery,
} = hotelsAPI;
