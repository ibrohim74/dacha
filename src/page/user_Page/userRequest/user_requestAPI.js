import {$authHost} from "../../../processes/http/http";
import {jwtDecode} from "jwt-decode";

export const GetUserRequest = async ()=>{
    try {
        const JWT = jwtDecode(localStorage.getItem('token'))
        const res =await $authHost.get(`/customer/${JWT.userId}/requests`)
        return res
    }catch (e){
        console.log(e)
    }
}
export const GetUserBooking = async ()=>{
    try {
        const JWT = jwtDecode(localStorage.getItem('token'))
        const res =await $authHost.get(`/customer/${JWT.userId}/bookings`)
        return res
    }catch (e){
        console.log(e)
    }
}