import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../processes/utils/consts";

export const usersAPI = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
  endpoints: (build) => ({
    // User
    getUser: build.query({
      query: (user_id) => `user/${user_id}`,
    }),
    updateUser: build.mutation({
      query: ({ user_id, ...user_data }) => ({
        url: `user/${user_id}`,
        body: { ...user_data },
        method: "PUT",
      }),
    }),
    registerUser: build.mutation({
      query: (user_data) => ({
        url: "/register",
        method: "POST",
        body: user_data,
      }),
    }),
    changeEmail: build.mutation({
      query: (user_id, newEmail) => ({
        url: `/user/${user_id}/change_email`,
        method: "POST",
        body: { newEmail },
      }),
    }),
    changePassword: build.mutation({
      query: (passwordData) => ({
        url: "/change_password",
        method: "POST",
        body: passwordData,
      }),
    }),
    getUserStatistics: build.query({
      query: (user_id) => `/user/${user_id}/statistics`,
    }),
    // Seller
    getSellerStatistics: build.query({
      query: (seller_id) => `/seller/${seller_id}/statistics`,
    }),
    // Auths
    login: build.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: build.mutation({
      query: (refreshToken) => ({
        url: "/refresh_token",
        method: "POST",
        body: { refreshToken },
      }),
    }),
    // Other
    uploadUserFile: build.mutation({
      query: (user_id, file) => ({
        url: `/upload/user/${user_id}`,
        method: "POST",
        body: file,
      }),
    }),
    restoreUser: build.mutation({
      query: (restoreData) => ({
        url: "/restore_user",
        method: "POST",
        body: restoreData,
      }),
    }),
    checkEmail: build.mutation({
      query: (email) => ({
        url: "/check_email",
        method: "POST",
        body: { email },
      }),
    }),
    checkCode: build.mutation({
      query: (code) => ({
        url: "/check_code",
        method: "POST",
        body: { code },
      }),
    }),
    changeOldPassword: build.mutation({
      query: (passwordData) => ({
        url: "/change_old_password",
        method: "POST",
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useRegisterUserMutation,
  useChangeEmailMutation,
  useChangePasswordMutation,
  useGetUserStatisticsQuery,
  useGetSellerStatisticsQuery,
  useLoginMutation,
  useRefreshTokenMutation,
  useUploadUserFileMutation,
  useRestoreUserMutation,
  useCheckEmailMutation,
  useCheckCodeMutation,
  useChangeOldPasswordMutation,
} = usersAPI;
