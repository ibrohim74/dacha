import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../processes/utils/consts";
import { getAccessToken, setAccessToken } from "./tokenStorage";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers) => {
//     const token = getAccessToken();
//     console.log(token);

//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshResult = await baseQuery("/refresh_token", api, extraOptions);

//     if (refreshResult.data) {
//       setAccessToken(refreshResult.data);
//       console.log(refreshResult.data);
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       console.log("refresh token failed");
//     }
//   }
//   return result;
// };
