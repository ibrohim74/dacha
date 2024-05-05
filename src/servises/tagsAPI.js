import {
  createApi,
  fetchBaseQuery,
  builder,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../processes/utils/consts";
import { $authHost } from "../processes/http/http";

export const tagsAPI = createApi({
  reducerPath: "tagsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => "/accommodation_tags",
    }),
    getTagById: builder.query({
      query: (tag_id) => `/tag/${tag_id}`,
    }),
    addTag: builder.mutation({
      query: (tag_data) => ({
        url: "/add_tag",
        method: "POST",
        body: tag_data,
      }),
    }),
    deleteTag: builder.mutation({
      query: (tag_id) => ({
        url: `/delete_tag/${tag_id}`,
        method: "DELETE",
      }),
    }),
    getAccommodationTags: builder.query({
      query: (accommodation_id, accommodation_type) =>
        `/${accommodation_type}/${accommodation_id}/tags`,
      // queryFn: async (accommodation_id, accommodation_type) => {
      //   try {
      //     const query = builder.query({
      //       query: (accommodation_id, accommodation_type) =>
      //         `/${accommodation_type}/${accommodation_id}/tags`,
      //     });

      //     const response = await query(
      //       accommodation_id,
      //       accommodation_type
      //     ).fetch();
      //     return response.data;
      //   } catch (error) {
      //     console.error("Error fetching accommodation tags:", error);
      //     throw error;
      //   }
      // },
    }),
  }),
});

export const {
  useGetAllTagsQuery,
  useGetTagByIdQuery,
  useAddTagMutation,
  useDeleteTagMutation,
  useGetAccommodationTagsQuery,
} = tagsAPI;

export default tagsAPI;

export const getAccommodationTags = async (
  accommodation_id,
  accommodation_type
) => {
  try {
    const response = await $authHost.get(
      `/${accommodation_type}/${accommodation_id}/tags`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching accommodation tags:", error);
    throw error;
  }
};
