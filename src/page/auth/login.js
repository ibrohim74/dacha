import React, {useEffect, useState} from 'react';
import {Button, Input, message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {LoginAPI} from "./API";
import {useNavigate} from "react-router-dom";
import {CABINET, PROFILE} from "../../processes/utils/consts";


const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })



    const handleLogin = () => {
        if (user.email && user.password) {
            LoginAPI(user.email, user.password).then(r =>{
                if (r === localStorage.getItem('token')){
                    navigate(CABINET+PROFILE)
                }else {
                    messageApi.open({
                        type: 'error',
                        content: r,
                    })
                }
            })
        } else {
            messageApi.open({
                type: 'error',
                content: 'Barcha malumotlarni toldiring',
            });
        }
    }
    return (
        <div>
            {contextHolder}
            <Input size={'large'} autocomplete="new-email" type={"email"} placeholder="email" prefix={<UserOutlined/>}
                   onChange={e => setUser({...user, email: e.target.value})}/>
            <Input size={'large'} autocomplete="new-password" type={"password"} placeholder="Password"
                   prefix={<UserOutlined/>} onChange={e => setUser({...user, password: e.target.value})}/>
            <Button onClick={handleLogin}>Login</Button>

        </div>
    );
};

export default Login;