import {$authHost} from "../../../processes/http/http";

export const CreateRequestAPI = async (data)=>{
    try {
        const res = await $authHost.post('/create_request', data)
        console.log(data)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
    }
}
export const GetSellerBookingAPI = async (sellerId)=>{
    try {
        const res = await $authHost.get(`seller/${sellerId}/bookings`)
        console.log(sellerId)
        console.log(res)
        return res
    }catch (e){
        if (e === 401){
            console.log('234234234234')
        }
        console.log(e)
    }
}