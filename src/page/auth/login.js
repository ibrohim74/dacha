import React, {useEffect, useState} from 'react';
import {Button, Input, message} from "antd";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import {LoginAPI} from "./API";
import {Link, useNavigate} from "react-router-dom";
import {ANNOUNCEMENT, CABINET, PROFILE, REGISTER_ROUT} from "../../processes/utils/consts";
import './style/login.css'

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading , setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        password: ''
    })



    const handleLogin = () => {
        setIsLoading(true)
        if (user.username && user.password) {
            LoginAPI(user.username, user.password).then(r =>{
                if (r === localStorage.getItem('token')){
                    window.location.assign(CABINET+ANNOUNCEMENT)
                    setIsLoading(false)
                }else {
                    messageApi.open({
                        type: 'error',
                        content: r,
                    })
                    setTimeout(()=>{
                        setIsLoading(false)
                    },1000)
                }
            })
        } else {
            messageApi.open({
                type: 'error',
                content: 'Barcha malumotlarni toldiring',
            });
            setTimeout(()=>{
                setIsLoading(false)
            },1000)
        }
    }
    return (
        <div style={{height:"100%"}}>
            {contextHolder}
            <div class="container-login">
                <div class="pic2"></div>
                <img
                    src="https://store-images.s-microsoft.com/image/apps.28471.14139628370441750.28b315c6-e587-4ac5-8b42-4388ed4a2f09.d5ba0d3b-63ca-4d9d-ba00-47fcfa6b02e1"
                    alt=""/>
                    <h1>Log in To Continue</h1>
                    <div class="inp">
                        <input type="text" placeholder={'Username'} autoComplete="username"   onChange={e=>setUser({...user, username: e.target.value})}/>

                    </div>
                    <div class="inp">
                        <input type="password" placeholder={'Password'} autoComplete="new-password"   onChange={e=>setUser({...user, password: e.target.value})}/>

                    </div>
                    <div style={{display:"flex"}}><a href="">Forgot Password? - Support</a></div>
                {isLoading ? (
                    <button type="submit" onClick={handleLogin} disabled={true} ><LoadingOutlined/></button>
                ):(
                    <button type="submit" onClick={handleLogin}>Login</button>
                )}

                    <Link to={REGISTER_ROUT}>Dont have a account? Sign up</Link>
            </div>
        </div>
    );
};

export default Login;