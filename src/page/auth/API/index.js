  import { $authHost, $host } from "../../../processes/http/http";
  import axios from "axios";

let isWaiting = false;

export const CheckEmailAPI = async (email)=>{
  try {
    const res = await $host.post('check_email' , {email:email})
    console.log(res)
    return res.status
  }catch (e){
    console.log(e)
  }
}

export const CheckRegistrationCodeAPI = async (code, email) => {
  try {
    const res = await $host.post('check_code' , {code:code ,  email:email , type:'register'})
    console.log(res)
    return res
  }catch (e){
    console.log(e)
    return e?.response?.status || e.code
  }
};

export const RegistrationAPI = async (user) => {
  try {
    const res = await axios.post("https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api/register", user, {
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
    });
    console.log(res)
    return res;
  } catch (e) {
    console.log(e)
    return e
  }
};

export const LoginAPI = async (data) => {

  try {
    const res = await $host.post("login", {login:data.email , password:data.password});
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
