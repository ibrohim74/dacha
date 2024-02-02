import {$host} from "../../../processes/http/http";

export const GetAllDacha =async ()=>{
    try {
        const res =await $host('dachas')
       return res
    }catch (e){
        console.log(e)
    }
}