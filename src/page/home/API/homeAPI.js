import {$host} from "../../../processes/http/http";

export const GetAllDacha =async (page)=>{
    try {
        const res =await $host.get('dachas' ,{params:{page:page}})
       return res
    }catch (e){
        console.log(e)
    }
}