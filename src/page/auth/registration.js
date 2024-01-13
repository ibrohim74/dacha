import React, {useState} from 'react';
import {RegistrationAPI} from "./API";
import {Link, useNavigate} from "react-router-dom";
import {CABINET, LOGIN_ROUTE, PROFILE, REGISTER_ROUT} from "../../processes/utils/consts";
import {Checkbox, message} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const Registration = () => {
    const [user, setUser] = useState({role: "user"});
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false)

    
    const checkBox = (e) => {
        if (e.target.checked){
            setUser({...user, role:"seller"})
        }else {
            setUser({...user, role:"user"})
        }
    }
    console.log(user)
    
    const handleSend = async () => {
        setIsLoading(true)
        if (user.username && user.email && user.password && user.lastName && user.firstName && user.phone_number) {
            RegistrationAPI(user).then(r => {
                if (r === localStorage.getItem('token')) {
                    window.location.assign(CABINET + PROFILE)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1000)
                } else {
                    messageApi.open({
                        type: 'error',
                        content: r,
                    })
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1000)
                }
            })
        } else {
            messageApi.open({
                type: 'error',
                content: "barcha malumotlarni toldirish shart",
            })
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }
    return (
        <div>
            < >
                {contextHolder}
                <div className="container-login">
                    <div className="pic2"></div>
                    <img
                        src="https://store-images.s-microsoft.com/image/apps.28471.14139628370441750.28b315c6-e587-4ac5-8b42-4388ed4a2f09.d5ba0d3b-63ca-4d9d-ba00-47fcfa6b02e1"
                        alt=""/>
                    <h1>Registration</h1>
                    <div className="two-register-input">
                        <div className="inp">
                            <input type="email" placeholder={'email'} autoComplete="email"
                                   onChange={e => setUser({...user, email: e.target.value})}/>

                        </div>
                        <div className="inp">
                            <input type="text" placeholder={'username'} autoComplete="username"
                                   onChange={e => setUser({...user, username: e.target.value})}/>

                        </div>
                    </div>
                    <div className="two-register-input">
                        <div className="inp">
                            <input type="password" placeholder={'password'} autoComplete="new-password" id={'password'}
                                   onChange={e => setUser({...user, password: e.target.value})}/>

                        </div>
                        <div className="inp">
                            <input type="text" placeholder={'First Name'} autoComplete="First Name" id={'FirstName'}
                                   onChange={e => setUser({...user, firstName: e.target.value})}/>

                        </div>
                    </div>
                    <div className="two-register-input">
                        <div className="inp">
                            <input type="text" placeholder={'Last Name'} autoComplete="Last Name" id={'LastName'}
                                   onChange={e => setUser({...user, lastName: e.target.value})}/>

                        </div>
                        <div className="inp">
                            <input type="tel" placeholder={'Phone Number'} autoComplete="Phone Number" id={'PhoneNumber'}
                                   onChange={e => setUser({...user, phone_number: e.target.value})}/>

                        </div>
                    </div>
                    <Checkbox onChange={checkBox}><p style={{color:"white"}}>Seller?</p></Checkbox>

                    {isLoading ? (
                        <button type="submit" onClick={handleSend} disabled={true}><LoadingOutlined/></button>
                    ) : (
                        <button type="submit" onClick={handleSend}>Sign up</button>
                    )}

                    <Link to={LOGIN_ROUTE}>Do you have account? Login</Link>
                </div>
            </>
        </div>

    );
};

export default Registration;