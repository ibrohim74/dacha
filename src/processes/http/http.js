import axios from "axios";
import jwtDecode from "jwt-decode";
import { HOME_ROUTE } from "../utils/consts";
import { message, notification } from "antd";

let authToken = localStorage.getItem("token");

const baseURL = "https://visitca.travel/api/";

const $host = axios.create({
  baseURL: baseURL,
});

const $authHost = axios.create({
  baseURL: baseURL,
});

const updateAuthHeader = (token) => {
  $authHost.defaults.headers.Authorization = `Bearer ${token}`;
};

const RefreshToken = async () => {
  const JWT = localStorage.getItem("token");
  console.log(JWT);
  try {
    const response = await axios.post(
      "https://visitca.travel/api/refresh_token",
      null,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(response);

    authToken = response.data.access_token;
    localStorage.setItem("token", authToken);

    updateAuthHeader(authToken);
  } catch (error) {
    console.error("Token yangilash muvaffaqiyatsiz bo'ldi:", error);

    window.location.assign(HOME_ROUTE);
    window.localStorage.removeItem("token");
  }
};

$authHost.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

$authHost.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await RefreshToken();
      return $authHost(originalRequest);
    }

    return Promise.reject(error);
  }
);

$host.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 404) {
      window.localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

setInterval(RefreshToken, 20 * 60 * 1000);

export { $authHost, $host, RefreshToken };
