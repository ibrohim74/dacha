import {$authHost, $host} from "../../../../processes/http/http";

export const CreatePlace = async (data)=>{
    try {
        const res =await $authHost.post('/add_place' , data)
        return res
    }catch (e){
        console.log(e)
    }
}
export const GetAllPlaces = async ()=>{
    try {
        const res =await $host.post('/places', {json:[]})
        return res
    }catch (e){
        console.log(e)
    }
}

export const UpdatePlace = async (data, id)=>{
    console.log(data)
    try {
        const res =await $authHost.put(`/place/${parseInt(id)}`, data)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
    }
}
export const DeletePlaceAPI = async (item)=>{
    try {
        const res =await $authHost.delete(`/place/${item.id}`)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
    }
}