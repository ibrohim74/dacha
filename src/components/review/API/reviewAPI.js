import {$authHost, $host} from "../../../processes/http/http";
import {jwtDecode} from "jwt-decode";

export const GetUserByJWT=async ()=>{
    try {
        const JWT = jwtDecode(localStorage.getItem('token'))
        const res = await  $host.get(`user/${JWT.userId}`)
        return  res.data
    }catch (e){
        console.log(e)
    }
}

export const SendReview = async (data)=>{
    console.log(data)
    try {
        const res = await  $authHost.post(`add_review`, data)
        return  res
    }catch (e){
        console.log(e)
    }
}
export const GetReviewByDachaId = async (id , pageNumber)=>{
    try {
        const res = await  $host.get(`dacha/${id}/reviews`,{params:{
                page: pageNumber ? pageNumber : 1
            }})
        return  res
    }catch (e){
        console.log(e)
    }
}
export const GetReviewByUserId = async ()=>{
    try {
        const JWT = jwtDecode(localStorage.getItem('token'))
        const res = await  $host.get(`user/${JWT.userId}/reviews`)
        return  res
    }catch (e){
        console.log(e)
    }
}

export const ReviewUpdate = async (data)=>{
    try {
        const res = await $authHost.put(`/reviews/${data.id}` , {
            title:data.title,
            body: data.body,
            rating:data.rating
        })
        return res
    }catch (e){
        console.log(e)
    return e
    }
}