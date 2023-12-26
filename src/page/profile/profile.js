import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import {$host} from "../../processes/http/http";
const Profile = () => {
    const [CurrentUser,setCurrentUser] = useState()
    const JWT = jwtDecode(localStorage.getItem('token'))
   useEffect(()=>{
       const getUser = async ()=>{
           const res = await $host.get('users/'+JWT.sub)
           setCurrentUser(res.data)
       }
       getUser()
   },[])
    return (
        <div>
            {CurrentUser &&(
                <div>
                    {CurrentUser.username} <br/>
                    {CurrentUser.role}
                </div>
            )}
        </div>
    );
};

export default Profile;