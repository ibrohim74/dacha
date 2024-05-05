import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_VERSION,
  ACCESS_TOKEN_VERSION_KEY,
} from "../processes/utils/consts";

export const setAccessToken = (accessToken) => {
  const { exp } = jwtDecode(accessToken);
  const expires = new Date(exp * 1000);

  Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    expires,
    secure: window.location.protocol === "https:",
    sameSite: "strict",
  });

  Cookies.set(ACCESS_TOKEN_VERSION_KEY, ACCESS_TOKEN_VERSION, {
    expires,
  });
};

export const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(ACCESS_TOKEN_VERSION_KEY);
};

export const getAccessToken = () => {
  let accessToken = Cookies.get(ACCESS_TOKEN_KEY);
  console.log(accessToken);
  const accessTokenVersion = Cookies.get(ACCESS_TOKEN_VERSION_KEY);

  // if (accessToken && accessTokenVersion !== ACCESS_TOKEN_VERSION) {
  //   removeAccessToken();
  //   accessToken = undefined;
  // }

  return accessToken;
};
