import axios from "axios";
import jwtDecode from "jwt-decode";
import {HOME_ROUTE} from "../utils/consts";
import {message, notification} from "antd";

let authToken = localStorage.getItem("token");

const baseURL = "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/";

const $host = axios.create({
    baseURL: baseURL
})

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
        notification.error({duration:3} , 'Sesiya vaqtingiz tugadi boshqatan akuntingizga kiring')
        setTimeout(() => {
            window.location.assign(HOME_ROUTE);
            window.localStorage.removeItem("token");
        }, 4000)

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



setInterval(RefreshToken, 20 * 60 * 1000);

export {$authHost, $host, RefreshToken};
