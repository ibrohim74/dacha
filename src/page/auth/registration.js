import React, {useState} from 'react';
import {RegistrationAPI} from "./API";
import {Link, useNavigate} from "react-router-dom";
import {ANNOUNCEMENT, CABINET, LOGIN_ROUTE, POLICY, PROFILE, REGISTER_ROUT} from "../../processes/utils/consts";
import {Checkbox, message} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const Registration = () => {
    const [user, setUser] = useState({role: "user"});
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false)
    const [checkPolicy , setCheckPolicy] = useState(false)
    message.config({duration:10})

    const checkBox = (e) => {
        if (e.target.checked) {
            setUser({...user, role: "seller"})
        } else {
            setUser({...user, role: "user"})
        }
    }

    const isStrongPassword = (pass) => {
        if (pass.length >= 8){
            if (/[A-Z]/.test(pass)){
                if (/[a-z]/.test(pass)){
                    if (/\d/.test(pass)){
                        if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)){
                            return true
                        }else {
                            message.error('simvol yoki belgi bolishi kerak')
                        }
                    }else {
                        message.error("Kamida bitta raqam bo'lishi va  simvol yoki belgi bolishi kerak")
                    }
                }else {
                    message.error('Kamida bitta kichik harf bolishi va raqam , simvol yoki belgi bolishi kerak')
                }
            }else {
                message.error('Kamida bitta katta harf bolishi va kichik xarif , raqam , simvol yoki belgi bolishi kerak ')
            }
        }else {

            message.error('parol 8 tadan kam bolmasligi va katta xarif , kichik xarif , raqam , simvol yoki belgi bolishi kerak')
            return false
        }
    };

    const handleSend = async () => {
        setIsLoading(true)
        if (user.username && user.email && user.password && user.lastName && user.firstName && user.phone_number) {
            if (isStrongPassword(user.password)){
                if (checkPolicy){
                    RegistrationAPI(user).then(r => {
                        if (r === localStorage.getItem('token')) {
                            window.location.assign(CABINET + ANNOUNCEMENT)
                            setTimeout(() => {
                                setIsLoading(false)
                            }, 1000)
                        } else {
                            if (Array.isArray(r.detail)) {
                                message.error(r.detail?.map((err) => {
                                    return err.msg
                                }))
                            } else {
                                message.error(r.detail)
                            }
                            setTimeout(() => {
                                setIsLoading(false)
                            }, 1000)
                        }
                    })
                }else {
                    message.error('Пользовательское соглашение')
                    setIsLoading(false)
                }

            }else {
                setIsLoading(false)
                console.log('error')
            }
        } else {
            messageApi.open({
                type: 'error',
                content: "barcha malumotlarni toldirish shart",
            })
            setIsLoading(false)
        }
    }
    return (
        <div style={{height:'100%'}}>
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
                            <input type="tel" placeholder={'Phone Number'} autoComplete="Phone Number"
                                   id={'PhoneNumber'}
                                   onChange={e => setUser({...user, phone_number: e.target.value})}/>

                        </div>
                    </div>
                    <Checkbox onChange={checkBox}><p style={{color: "white"}}>Seller?</p></Checkbox>
                    <Checkbox onChange={(e)=>setCheckPolicy(e.target.checked)}>
                        <p style={{color: "white", width:'100%' , margin:0}}>I give my consent to Binovo LLC and
                        persons acting on its behalf to process my personal data in accordance <Link to={POLICY}>with the Policy</Link>  </p>
                    </Checkbox>

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