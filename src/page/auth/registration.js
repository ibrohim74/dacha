import React, {useState} from 'react';
import {RegistrationAPI} from "./API";
import {useNavigate} from "react-router-dom";
import {CABINET, PROFILE} from "../../processes/utils/consts";
import {message} from "antd";

const Registration = () => {
    const [user, setUser] = useState({role:"user"});
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();


    const handleSend = async () => {
        if (user.username && user.email && user.password){
            RegistrationAPI(user).then(r=>{
                if (r === localStorage.getItem('token')){
                    navigate(CABINET+PROFILE)
                }else {
                    messageApi.open({
                        type: 'error',
                        content: r,
                    })
                }
            })
        }else {
            messageApi.open({
                type: 'error',
                content: "barcha malumotlarni toldirish shart",
            })
        }
    }
    return (
        <div>
            {contextHolder}
            <input type="text" placeholder={"username"} onChange={e => setUser({...user , username: e.target.value})}/>
            <input type="email" placeholder={"email"} onChange={e => setUser({...user ,email: e.target.value})}/>
            <input type="password" placeholder={"password"} onChange={e => setUser({...user ,password: e.target.value})}/>
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Registration;