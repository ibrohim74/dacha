import axios from "axios";
import {jwtDecode} from "jwt-decode";

// localStorage dan tokenni olish
let authToken = localStorage.getItem("token");

const baseURL = "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/";

const $host = axios.create({
    baseURL: baseURL,
});

const $authHost = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
});

// Token va sarlavha header-ni yangilash uchun funktsiya
const updateAuthHeader = (token) => {
    $authHost.defaults.headers.Authorization = `Bearer ${token}`;
};

const refreshToken = async () => {
    const JWT = localStorage.getItem('token')
    console.log(JWT)
    try {

        const response = await axios.post("https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/refresh_token",null,
            {headers:{
                Authorization:`Bearer ${JWT}`},

            });
        console.log(response)

        authToken = response.data.access_token;
        localStorage.setItem("token", authToken);


        updateAuthHeader(authToken);
    } catch (error) {
        console.error("Token yangilash muvaffaqiyatsiz bo'ldi:", error);

    }
};

setInterval(refreshToken,   10*60*1000    );

export { $host, $authHost };
