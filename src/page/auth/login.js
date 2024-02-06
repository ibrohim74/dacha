import React, {useState} from 'react';
import style from './style/registration.module.css'
import './style/login.css'
import {message, Select} from "antd";
import {Link} from "react-router-dom";
import {CABINET, POLICY, PROFILE, REGISTER_ROUT} from "../../processes/utils/consts";
import {Icons} from "../../assets/icons/icons";
import {LoginAPI} from "./API";
import {LoadingOutlined} from "@ant-design/icons";

const Login = () => {
    const [initialState, setInitialState] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const handleSend = () => {
        setIsLoading(true)
        if (initialState?.email && initialState?.password) {
            LoginAPI(initialState).then(r => {
                if (r === localStorage.getItem('token')) {
                    window.location.assign(CABINET + PROFILE)
                    setIsLoading(false)
                } else {
                    message.error('error')
                    setIsLoading(false)
                }           
            })
        } else {
            message.error('email && password')
            setIsLoading(false)
        }
    }
    return (
        <div className={style.regContainer}>
            <div className={style.regBox}>
                <div className={style.regLogo}>
                    <Icons.Logo/>
                    <div>Travid</div>
                </div>
                <span className={style.subTitleReg}>Войти в учётный запись</span>
                <div autoComplete={'new-login'} className={style.regContent}>
                    <div className={style.regInput}>
                        <label htmlFor="email">Почта</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete={'new-email'}
                            value={initialState?.email}
                            onChange={(e) =>
                                setInitialState({...initialState, email: e.target.value})
                            }
                        />
                    </div>

                    <div className={style.regInput}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete={'new-password'}
                            value={initialState?.password}
                            onChange={(e) =>
                                setInitialState({...initialState, password: e.target.value})
                            }
                        />
                    </div>
                    <span className={style.subTitleReg} style={{cursor: "pointer"}}>Забыли пароль ?</span>
                    {isLoading ?
                        <div className={style.regButton}>
                            <LoadingOutlined/>
                        </div>
                        :
                        <div className={style.regButton} onClick={handleSend}>
                            <button>Войти</button>
                        </div>
                    }


                </div>
            </div>
            <Link to={REGISTER_ROUT} style={{
                marginTop: '2%',
                color: '#6B6B6B',
                cursor: "pointer"
            }}>Зарегистрироваться</Link>
        </div>
    );
};

export default Login;