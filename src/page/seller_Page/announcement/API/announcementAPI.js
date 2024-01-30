import {$authHost} from "../../../../processes/http/http";
import {jwtDecode} from "jwt-decode";

export const CreateAnnouncementAPI = async (data) =>{
    try {
        const res = await $authHost.post('/create_dacha' , data)
        return res
    }catch (e){
        console.log(e)
    }
}
export const GetAnnouncementAPI = async ()=>{
    try {
        const JWT = jwtDecode(localStorage.getItem('token'))
        const res = await $authHost.get(`/user/dachas/${JWT.userId}`)
        return res.data
    }catch (e){
        console.log(e)
    }
}