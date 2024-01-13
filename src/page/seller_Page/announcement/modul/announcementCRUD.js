import {$authHost} from "../../../../processes/http/http";
import {jwtDecode} from "jwt-decode";
import '../assets/create_ann.css'

export const CreateEvents = async (sel) => {
    const JWT = jwtDecode(localStorage.getItem('token'))
    try {
        const res = await $authHost.post('obj', sel)
        console.log(res)
        return res.status
    } catch (e) {
        console.log(e)
    }
}
export const GetEvents = async () => {
    const JWT = jwtDecode(localStorage.getItem('token'))
    try {
        const res = await $authHost.get(`obj?ParentID=${JWT.sub}`)
        console.log(res)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const DeleteEvent = async (eventID) => {
    try {
        const res = await $authHost.delete(`obj/${eventID}`)
        return res.status
    } catch (e) {
        return e.message
    }
}