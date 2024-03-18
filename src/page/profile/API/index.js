import {$authHost, $host} from "../../../processes/http/http";
import { jwtDecode } from "jwt-decode";




export const sendProfile_data = async (data)=>{
    console.log(data)
    try {
        const JWT =  jwtDecode(localStorage.getItem('token'))
        const res = await $authHost.put('user/'+JWT.userId , data )

        return res
    }catch (e){
        console.log(e)
        return e
    }
}