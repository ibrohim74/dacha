import {$authHost, $host} from "../../../processes/http/http";



export const RegistrationAPI = async (user)=>{
    try {
        const res =await $host.post('register',user)
        localStorage.setItem('token', res.data.access_token)
        return res.data.access_token
    }catch (e){
        if (e.message === "Network Error"){
            return "Serverda xatolik yuzaga keldi bir ozdan so'ng yana bir bor urunib ko'ring"
        }else {
            return e.response.data
        }
    }
}

export const LoginAPI = async (username , password)=>{
    const resData = {"login":username , "password": password}
    try {
        const res = await $host.post('login',resData)
        localStorage.setItem('token', res.data.access_token)
        console.log(res.data.access_token)
        return res.data.access_token
    }catch (e){
        if (e.message === "Network Error"){
            return "Serverda xatolik yuzaga keldi bir ozdan so'ng yana bir bor urunib ko'ring"
        }else {
            return e.response.data.detail
        }

    }
}


