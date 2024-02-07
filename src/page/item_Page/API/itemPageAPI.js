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