import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../processes/utils/consts";

export const cottagesAPI = createApi({
  reducerPath: "dachas",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  endpoints: (builder) => ({
    getAllDachas: builder.query({
      query: () => "/dachas",
    }),
    getUserDachas: builder.query({
      query: (user_id) => `/user/dachas/${user_id}`,
    }),
    createDacha: builder.mutation({
      query: (dachaData) => ({
        url: "/create-dacha",
        method: "POST",
        body: dachaData,
      }),
    }),
    getDacha: builder.query({
      query: (dacha_id) => `/dacha/${dacha_id}`,
    }),
    updateDacha: builder.mutation({
      query: (dachaData) => ({
        url: `/dacha/${dachaData.id}`,
        method: "PUT",
        body: dachaData,
      }),
    }),
    deleteDacha: builder.mutation({
      query: (dacha_id) => ({
        url: `/dacha/${dacha_id}`,
        method: "DELETE",
      }),
    }),
    uploadDachaPhoto: builder.mutation({
      query: (data) => ({
        url: `/dacha/${data.dacha_id}/upload_photo`,
        method: "POST",
        body: data.formData,
      }),
    }),
    deleteDachaPhoto: builder.mutation({
      query: (data) => ({
        url: `/api/media/dachas/${data.dacha_id}/${data.fileId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllDachasQuery,
  useGetUserDachasQuery,
  useCreateDachaMutation,
  useGetDachaQuery,
  useUpdateDachaMutation,
  useDeleteDachaMutation,
  useUploadDachaPhotoMutation,
  useDeleteDachaPhotoMutation,
} = cottagesAPI;
