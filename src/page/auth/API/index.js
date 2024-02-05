import { $authHost, $host } from "../../../processes/http/http";

let isWaiting = false;

export const SendEmailVerificationAPI = async (email) => {
  if (isWaiting) {
    return { status: "error", message: "Iltimos, 1 daqiqan ozroq kuting" };
  }

  try {
    const res = await $host.post("check_email", { email: email });
    isWaiting = true;
    setTimeout(() => {
      isWaiting = false;
    }, 60000); // 60 seconds * 1000 milliseconds
    return {
      status: "success",
      message: "Tasdiqlash kodi muvaffaqiyatli yuborildi.",
    };
  } catch (e) {
    if (e.message === "Network Error") {
      return {
        status: "error",
        message:
          "Serverda xatolik yuzaga keldi bir ozdan so'ng yana bir bor urunib ko'ring",
      };
    } else {
      return { status: "error", message: e.response.data };
    }
  }
};

export const CheckRegistrationCodeAPI = async (code, email) => {
  try {
    const res = await $host.post("registration_code", {
      code: code,
      email: email,
    });
    return res.data;
  } catch (e) {
    if (e.message === "Network Error") {
      return "Serverda xatolik yuzaga keldi bir ozdan so'ng yana bir bor urunib ko'ring";
    } else {
      return e.response.data;
    }
  }
};

export const RegistrationAPI = async (user, token) => {
  try {
    const res = await $host.post("register", user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem("token", res.data.access_token);
    return res.data.access_token;
  } catch (e) {
    if (e.message === "Network Error") {
      return "Serverda xatolik yuzaga keldi bir ozdan so'ng yana bir bor urunib ko'ring";
    } else {
      return e.response.data;
    }
  }
};

export const LoginAPI = async (username, password) => {
  const resData = { login: username, password: password };
  try {
    const res = await $host.post("login", resData);
    localStorage.setItem("token", res.data.access_token);
    console.log(res.data.access_token);
    return res.data.access_token;
  } catch (e) {
    if (e.message === "Network Error") {
      return "Serverda xatolik yuzaga keldi bir ozdan so'ng yana bir bor urunib ko'ring";
    } else {
      return e.response.data.detail;
    }
  }
};
