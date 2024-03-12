import {$authHost} from "../../../processes/http/http";

export const CreateRequestAPI = async (data)=>{
    try {
        const res = await $authHost.post('/create_request', data)
        return res
    }catch (e){
        console.log(e)
    }
}
export const GetSellerBookingAPI = async (sellerId)=>{
    try {
        const res = await $authHost.get(`seller/${sellerId}/bookings`)

        return res
    }catch (e){
        if (e === 401){
            console.log('item page API 401 error line:19')
        }
        console.log(e)
    }
}
export const GetSellerBookingItemPageAPI = async (accommodation_id)=>{
    try {

        const res = await $authHost.get(`/dacha/${accommodation_id}/bookings`)
        return res
    }catch (e){
        if (e === 401){
            console.log('GetSellerBookingItemPageAPI error 401 line 32')
        }
        console.log(e)
    }
}