import {$authHost, $host} from "../../../processes/http/http";
import { jwtDecode } from "jwt-decode";




export const sendProfile_data = async (data)=>{
    const JWT =  jwtDecode(localStorage.getItem('token'))
    try {
        const res = await $authHost.put('user/'+JWT.userId , data )

        return res.status
    }catch (e){
        return e.response.data.detail
    }
}