import {$authHost, $host} from "../../../processes/http/http";



export const RegistrationAPI = async (user)=>{
    try {
        const res =await $host.post('register',user)
        localStorage.setItem('token', res.data.accessToken)
        return res.data.accessToken
    }catch (e){
        console.log(e)
        return e.response.data
    }
}

export const LoginAPI = async (email , password)=>{
    const resData = {"email":email , "password": password}
    try {
        const res = await $host.post('login',resData)
        localStorage.setItem('token', res.data.accessToken)

        return res.data.accessToken
    }catch (e){
        return e.response.data
    }
}


