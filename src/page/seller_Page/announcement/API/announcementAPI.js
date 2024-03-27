import {$authHost, $host} from "../../../../processes/http/http";
import {jwtDecode} from "jwt-decode";

export const CreateAnnouncementAPI = async (data) =>{
    try {
        const res = await $authHost.post('/create_dacha' , data)
        return res
    }catch (e){
       return e
    }
}
export const GetAnnouncementAPI = async ()=>{
    try {
        const JWT = jwtDecode(localStorage.getItem('token'))
        const res = await $authHost.get(`/user/dachas/${JWT.userId}`)
        return res
    }catch (e){
        console.log(e)
    }
}
export const GetDachaAPI = async (id)=>{

    try {
        const res = await $authHost.get(`/dacha/${id}`)
        return res.data
    }catch (e){
        console.log(e)
    }
}
export const UpdateDachaAPI = async (id,data)=>{
    try {
        const res = await $authHost.put(`/dacha/${id}`, data)
        return res
    }catch (e){
        console.log(e)
        return e
    }
}
export const DeleteDachaAPI = async (id)=>{
    try {
        const res = await $authHost.delete(`/dacha/${id}`)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
        return e
    }
}
export const DeleteDachaPhotoAPI = async (url)=>{
    try {
        const res = await $authHost.delete(url)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
        return e
    }
}

export const GetRequestAPI = async ()=>{
    try {
        const JWT = jwtDecode(localStorage.getItem('token'))
        const res = await $authHost.get(`/seller/${JWT.userId}/requests`)
        return res
    }catch (e){
        console.log(e)}
}

export const AcceptRequestAPI = async (id)=>{
    console.log(id)
    try {
        const res = await $authHost.post(`/request/${parseInt(id)}/accept`)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
    }
}
export const DenyRequestAPI = async (id)=>{
    try {
        const res = await $authHost.post(`/request/${parseInt(id)}/deny`)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
    }
}

export const GetUserById=async (id)=>{
    try {
        const res = await  $host.get(`user/${id}`)
        return  res.data
    }catch (e){
        console.log(e)
    }
}

export const DeleteBookingById = async (booking_id) =>{
    try {
        const res = await $authHost.delete(`/booking/${booking_id}`)
        return res.status
    }catch (e){
        console.log(e)
        return e?.response?.status
    }
}