import {$authHost, $host} from "../../../processes/http/http";
import { jwtDecode } from "jwt-decode";



export const CurrentUserData = async ()=>{
    const JWT =  jwtDecode(localStorage.getItem('token'))
    const res = await $host.get('users/'+JWT.sub)
    return console.log(res)
}

export const sendProfile_data = async (data)=>{
    const JWT =  jwtDecode(localStorage.getItem('token'))
    try {
        const res = await $authHost.put('user/'+JWT.userId , data )
        console.log(res.status)
        return res.status
    }catch (e){
        return e.response.data.detail
    }
}