import {$authHost} from "../../../../processes/http/http";
import {jwtDecode} from "jwt-decode";

export const CreateEvents = async ()=>{
    const JWT = jwtDecode(localStorage.getItem('token'))
    try {
        const res = $authHost.post('obj')
    }catch (e){
        console.log(e)
    }
}