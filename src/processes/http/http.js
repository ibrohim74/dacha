import axios from "axios";
import jwtDecode from "jwt-decode";
import { HOME_ROUTE } from "../utils/consts";

// localStorage dan tokenni olish
let authToken = localStorage.getItem("token");

const baseURL = "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/";

const $host = axios.create({
  baseURL:baseURL
})

const $authHost = axios.create({
  baseURL: baseURL,
});

// Token va sarlavha header-ni yangilash uchun funktsiya
const updateAuthHeader = (token) => {
  $authHost.defaults.headers.Authorization = `Bearer ${token}`;
};

const RefreshToken = async () => {
  const JWT = localStorage.getItem("token");
  console.log(JWT);
  try {
    const response = await axios.post(
        "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/refresh_token",
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
    // window.localStorage.removeItem("token");
    // window.location.assign(HOME_ROUTE);
  }
};

$authHost.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

$authHost.interceptors.response.use((response) => response, async (error) => {
    if (error.response?.status === 401) {
        console.log('ref  ')
       await RefreshToken()
    }
});

setInterval(RefreshToken, 20 * 60 * 1000);

export { $authHost , $host, RefreshToken};
