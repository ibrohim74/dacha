import React, {useEffect, useState} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import {Admin, Layout, Moderate, Seller, Users} from "../../processes/utils/Routes";
import { jwtDecode } from "jwt-decode";
import {$host} from "../../processes/http/http";
import {ANNOUNCEMENT, PROFILE} from "../../processes/utils/consts";


const LayoutCabinet = () => {
    const JWT = jwtDecode(localStorage.getItem('token'))
    const [CurrentUser , setCurrentUser] = useState()
    useEffect(()=>{
        const getUser = async ()=>{
            const res = await $host.get('users/'+JWT.sub)
            setCurrentUser(res.data)
        }
        getUser()
    },[])


    return (
        <div>
            {CurrentUser?.role === "user" && (<>
                <Link to={PROFILE}>Profile</Link>
            </>)}
            {CurrentUser?.role === "seller" && (<>
                <Link to={PROFILE}>Profile</Link>
                <Link to={ANNOUNCEMENT}>announcement</Link>
            </>)}
            <Routes>
                {CurrentUser?.role === 'user' &&  Users.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} exact/>
                ))}
                {CurrentUser?.role === 'admin' &&  Admin.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} exact/>
                ))}
                {CurrentUser?.role === 'moderate' &&  Moderate.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} exact/>
                ))}
                {CurrentUser?.role === 'seller' &&  Seller.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} exact/>
                ))}
            </Routes>
        </div>
    );
};

export default LayoutCabinet;