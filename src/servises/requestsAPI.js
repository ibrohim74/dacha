import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../processes/utils/consts";

const applicationsAPI = createApi({
  reducerPath: "applicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  endpoints: (build) => ({
    createApplication: build.mutation({
      query: (data) => ({
        url: "/create_application",
        method: "POST",
        body: data,
      }),
    }),
    getApplication: build.query({
      query: (application_id) => `/application/${application_id}`,
    }),
    deleteApplication: build.mutation({
      query: (application_id) => ({
        url: `/application/${application_id}`,
        method: "DELETE",
      }),
    }),
    getAgentApplications: build.query({
      query: (agent_id) => `/agent/${agent_id}/applications`,
    }),
    createChat: build.mutation({
      query: (application_id) => ({
        url: `/create_chat/${application_id}`,
        method: "POST",
      }),
    }),
    getChatMessages: build.query({
      query: (agent_id, user_id) => `/get_messages/${agent_id}/${user_id}`,
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useCreateChatMutation,
  useDeleteApplicationMutation,
  useGetAgentApplicationsQuery,
  useGetApplicationQuery,
  useGetChatMessagesQuery,
} = applicationsAPI;

export default applicationsAPI;
