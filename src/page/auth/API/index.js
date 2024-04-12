import { $authHost, $host } from "../../../processes/http/http";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

let isWaiting = false;

// export const checkEmailAPI = async (email) => {
//   try {
//     const res = await $host.post("check_email", { email: email });
//     console.log(res);
//     return res.status;
//   } catch (e) {
//     console.log(e);
//   }
// };

export const checkEmailAPI = createAsyncThunk(
  "auth/checkEmail",
  async (email) => {
    try {
      const response = await $host.post("check_email", { email });
      console.log(response);
      return response.status;
    } catch (error) {
      console.error("Error checking email:", error);
      return Promise.reject(error.message);
    }
  }
);

export const checkRegistrationCodeAPI = async (code, email) => {
  try {
    const res = await $host.post("check_code", {
      code: code,
      email: email,
      type: "register",
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    return e?.response?.status || e.code;
  }
};

// export const checkRegistrationCodeAPI = createAsyncThunk(
//   "auth/checkConfirmationCode",
//   async (code, email) => {
//     try {
//       const res = await $host.post("check_code", {
//         code: code,
//         email: email,
//         type: "register",
//       });
//       console.log(res.data);
//       return res.data;
//     } catch (e) {
//       console.log(e);
//       return e?.response?.status || e.code;
//     }
//   }
// );

export const registrationAPI = async (user) => {
  console.log("user", user);
  try {
    const res = await axios.post("https://visitca.travel/api/register", user, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log("regis", res);
    if (res?.status === 200) {
      console.log("success", res);
    } else {
      console.log(res);
    }
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const loginAPI = async (data) => {
  console.log(data);
  try {
    const res = await $host.post("login", {
      login: data.username,
      password: data.password,
    });
    localStorage.setItem("token", res.data.access_token);
    console.log(res.data.access_token);
    return res.data.access_token;
  } catch (e) {
    if (e.message === "Network Error") {
      return "Serverda xatolik yuzaga keldi bir ozdan so'ng yana bir bor urunib ko'ring";
    } else {
      console.log(e.response.data.detail);
      return e.response.data.detail;
    }
  }
};
