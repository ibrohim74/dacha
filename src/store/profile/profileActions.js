import { $authHost, $host } from "../../processes/http/http";
import { jwtDecode } from "jwt-decode";
import store from "../store";
import { setNewUser } from "../auth/authSlice";
import { HOME_ROUTE } from "../../processes/utils/consts";

const JWT = localStorage.getItem("token")
  ? jwtDecode(localStorage.getItem("token"))
  : null;

export const updateUser = async (data) => {
  console.log(data);
  try {
    const res = await $authHost.put("user/" + JWT.userId, data);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getUser = async () => {
  console.log(JWT);
  try {
    const res = await $host.get("user/" + JWT.userId);
    store.dispatch(setNewUser(res.data));
  } catch (e) {
    console.log(e);
  }
};

// export const logout = () => {
//   localStorage.removeItem("token");
//   window.location.assign(HOME_ROUTE);
// };

export const logout = async () => {
  return new Promise((resolve) => {
    localStorage.removeItem("token");
    resolve();
  }).then(() => {
    window.location.assign(HOME_ROUTE);
  });
};
