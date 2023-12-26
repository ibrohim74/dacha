import {$host} from "../../../http/httpURLs";
import { jwtDecode } from "jwt-decode";
import {json} from "react-router-dom";


export const CurrentUserData = async ()=>{
    const JWT = jwtDecode(localStorage.getItem('token'))

    const res = await $host.get('users/'+JWT.sub)
    return console.log(res)
}