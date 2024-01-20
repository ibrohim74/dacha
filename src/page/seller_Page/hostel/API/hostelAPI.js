import {$authHost, RefreshToken, refreshToken} from "../../../../processes/http/http";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import login from "../../../auth/login";

export const CreateHostelAPI = async (data) => {
    try {
        const res = await axios.post('https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/hotel_create', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.status
    } catch (e) {
        console.log(e)
    }
}
export const GetHostelsAPI = async () => {
    try {
        const JWT = jwtDecode(localStorage.getItem('token'))
        const res = await $authHost.get(`/user/hotels/${JWT.userId}`)
        return res.data?.map((item) => {
            return item
        })
    } catch (e) {
        console.log(e)
    }
}
export const UpdateHostelsAPI = async (id,data) => {

    try {
        const res = await $authHost.put(`/hotel/${id}`, data)
        console.log(res)
        return res.status
    } catch (e) {
        console.log(e)
    }
}

export const DeleteHostelAPI = async (id)=>{
    try {
        const res = await $authHost.delete(`/hotel/${id}`)
        return res.status
    }catch (e){
        console.log(e)
    }
}

export const CreateRoomAPI = async (data) => {
    try {
        const res = await $authHost.post('add_room', data)
        return res?.status
    } catch (e) {
        console.log(e)
    }
}

export const GetRoomsAPI = async () => {
    try {
        const JWT = jwtDecode(localStorage.getItem('token'))
        const resHostel = await $authHost.get(`/user/hotels/${JWT.userId}`)
        const id = resHostel.data?.map((item) => {
            return item.id
        })
        const res = await $authHost.get(`/hotel/${id}/rooms`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const UpdateRoomAPI = async (data, roomID) => {
    try {
        const res = await $authHost.put(`room/${roomID}`, data)
        return res.status
    } catch (e) {
        console.log(e)
    }
}

export const DeleteRoomAPI = async (id) => {
    try {
        const res = await $authHost.delete(`room/${id}`)
        return res.status
    } catch (e) {
        console.log(e)
    }
}

export const PostPhotoRoom = async (idRoom, file) => {
    console.log(idRoom)
    console.log(file)
    try {
        const res = await $authHost.post(`/room/${idRoom}/upload_photo`, {file:file},{headers:{
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }})
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export const GetPhotoRoom = async (idRoom , fileId) => {
    try {

    }catch (e){
        console.log(e)}
}