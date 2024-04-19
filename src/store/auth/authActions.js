import { $authHost, $host } from "../../processes/http/http";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { BASE_URL } from "../../processes/utils/consts";

let isWaiting = false;

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

export const restoreUser = createAsyncThunk(
  "auth/checkEmail",
  async (email) => {
    try {
      const response = await $host.post("restore_user", { email });
      console.log(response);

      return response.status;
    } catch (error) {
      console.error("Error restoring user:", error);
      return Promise.reject(error.message);
    }
  }
);

export const checkCodeAPI = async (code, email, type) => {
  try {
    const res = await $host.post("check_code", {
      code: code,
      email: email,
      type: type,
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    return e?.response?.status || e.code;
  }
};

// export const changeOldPassword

export const changePassword = async (
  newPassword,
  newConfirmedPassword,
  token
) => {
  if (newPassword == newConfirmedPassword) {
    if (newPassword.length >= 8 && newConfirmedPassword.length >= 8) {
      try {
        const res = await axios.post(
          `${BASE_URL}change_password`,
          {
            password: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          message.success("password_changed_msg");
          return res;
        }
      } catch (e) {
        console.log(e);
        message.error("password_incorrect");
      }
    } else {
      message.error("password_min_length_msg");
    }
  } else {
    message.error("all_inputs_required");
  }
};

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
  try {
    const res = await $host.post("login", {
      login: data.username,
      password: data.password,
    });
    localStorage.setItem("token", res.data.access_token);

    console.log(res);
    return res;
  } catch (e) {
    if (e.message === "Network Error") {
      return "Serverda xatolik yuzaga keldi bir ozdan so'ng yana bir bor urunib ko'ring";
    } else {
      console.log(e.response.data.detail);
      return e.response.data.detail;
    }
  }
};
