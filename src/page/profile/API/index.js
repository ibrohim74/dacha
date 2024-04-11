import { $authHost, $host } from "../../../processes/http/http";
import { jwtDecode } from "jwt-decode";
import store from "../../../store/store";
import { setNewUser } from "../../auth/authSlice";

const JWT = localStorage.getItem("token")
  ? jwtDecode(localStorage.getItem("token"))
  : null;

export const sendProfile_data = async (data) => {
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
  try {
    // console.log(JWT);
    // console.log(JWT.userId);
    const res = await $host.get("user/" + JWT.userId);
    console.log(res.data);
    store.dispatch(setNewUser(res.data));
    // setCurrentUser(res.data);
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => {
  //   console.log("here");
  localStorage.removeItem("token");
  window.location.assign(HOME_ROUTE);
};
