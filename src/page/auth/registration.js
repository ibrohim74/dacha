import React, {useState} from 'react';
import style from './style/registration.module.css';
import {Icons} from '../../assets/icons/icons';
import {Link, useNavigate} from 'react-router-dom';
import {ANNOUNCEMENT, CABINET, POLICY, PROFILE, REGISTER_STEP2_ROUT} from '../../processes/utils/consts';
import {message, Select} from "antd";
import Reg_step2 from "./component/reg_step2";
import './style/login.css'
import {CheckEmail, CheckEmailAPI, CheckRegistrationCodeAPI, RegistrationAPI} from "./API";
import {LoadingOutlined} from "@ant-design/icons";

const Registration = () => {
    const [initialState, setInitialState] = useState({
        email: '',
        password: '',
        username: '',
        lastName: '',
        firstName: '',
        role: 'user'
    });
    const [confirmPass, setConfirmPass] = useState({passConfirm: '', checkBox: false,});
    const [checkCode, setCheckCode] = useState()
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [token, setToken] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const isStrongPassword = (pass) => {
        if (pass.length >= 8) {
            if (/[A-Z]/.test(pass)) {
                if (/[a-z]/.test(pass)) {
                    if (/\d/.test(pass)) {
                        if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
                            return true;
                        } else {
                            message.error("simvol yoki belgi bolishi kerak");
                        }
                    } else {
                        message.error(
                            "Kamida bitta raqam bo'lishi va  simvol yoki belgi bolishi kerak"
                        );
                    }
                } else {
                    message.error(
                        "Kamida bitta kichik harf bolishi va raqam , simvol yoki belgi bolishi kerak"
                    );
                }
            } else {
                message.error(
                    "Kamida bitta katta harf bolishi va kichik xarif , raqam , simvol yoki belgi bolishi kerak "
                );
            }
        } else {
            message.error(
                "parol 8 tadan kam bolmasligi va katta xarif , kichik xarif , raqam , simvol yoki belgi bolishi kerak"
            );
            return false;
        }
    };

    const handleSend = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setLoading(true)
        if (initialState?.email && emailRegex.test(initialState.email)) {
            if (isStrongPassword(initialState.password)) {
                if (initialState.password === confirmPass.passConfirm) {
                    if (confirmPass.checkBox) {
                        setStep1(false);
                        setStep3(false)
                        CheckEmailAPI(initialState?.email).then(r => {
                            if (r === 200) {
                                setLoading(false)
                                setStep2(true);
                                setStep3(false)
                                setStep1(false)
                            }else {
                                setStep2(false);
                                setStep3(false)
                                setStep1(true)
                                setLoading(false)
                                message.error('bu email registratsiyadan otgan')
                            }
                        })
                    } else {
                        message.error('policy');
                        setLoading(false)
                    }
                } else {
                    message.error('confirm pass');
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        } else {
            setLoading(false)
            message.error('Please enter a valid email');
        }
    };
    const handleSendStep2 = () => {
        setLoading(true)
        if (initialState?.email) {
            if (checkCode?.code) {
                CheckRegistrationCodeAPI(checkCode.code, initialState.email).then(r => {
                    if (r?.status === 200) {
                        setToken(r.data.token)
                        setStep3(true)
                        setStep1(false)
                        setStep2(false)
                        setLoading(false)
                    } else {
                        message.error('xabar jonatishda xatolik')
                        setLoading(false)
                        setStep3(false)
                        setStep1(false)
                        setStep2(true)
                    }
                })
            }
        }
    }
    const handleSendStep3 = () => {
        setLoading(true)
        if (initialState.username) {
            if (initialState.firstName) {
                if (initialState.lastName) {
                    if (token) {
                        RegistrationAPI(initialState, token).then(r => {
                            if (r?.status === 200) {
                                setLoading(false)
                                if (initialState.role === 'user') {
                                    window.location.assign(CABINET + PROFILE)
                                }
                                if (initialState.role === 'seller') {
                                    window.location.assign(CABINET + ANNOUNCEMENT)
                                }
                            } else {
                                // message.error()
                                message.error(r?.detail)
                                setLoading(false)
                                setStep3(true)
                                setStep1(false)
                                setStep2(false)
                            }
                        })       
                    } else {
                        setLoading(false)
                        message.error('registratsiyada xatolik yuzaga keldi qaytadan urunib koring')
                    }
                } else {
                    setLoading(false)
                    message.error('lastname')
                }
            } else {
                setLoading(false)
                message.error('firstName')
            }
        } else {
            setLoading(false)
            message.error('username')
        }
    }
    const handleTypeUser = (val) => {
        setInitialState({...initialState, role: val})
    }
    console.log(initialState)
    return (
        <div className={style.regContainer}>
            <div className={style.regBox}>
                <div className={style.regLogo}>
                    <Icons.Logo/>
                    <div>Travid</div>
                </div>
                <span className={style.subTitleReg}>Создать учётный запись</span>

                {step1 && <div autoComplete={'off'} className={style.regContent}>
                    <div className={style.regInput}>
                        <label htmlFor="userType">Кем вы являетесь</label>
                        <Select
                            id={'userType'}
                            value={initialState?.role}
                            defaultValue={initialState?.role}
                            style={{
                                width: "100%",

                            }}
                            onChange={handleTypeUser}
                            options={[
                                {
                                    value: 'user',
                                    label: 'покупатель',
                                }, {
                                    value: 'seller',
                                    label: 'Продовец',
                                }

                            ]}
                        />
                    </div>
                    <div className={style.regInput}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete={'off'}
                            value={initialState?.email}
                            onChange={(e) =>
                                setInitialState({...initialState, email: e.target.value})
                            }
                        />
                    </div>

                    <div className={style.regInput}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete={'off'}
                            value={initialState?.password}
                            onChange={(e) =>
                                setInitialState({...initialState, password: e.target.value})
                            }
                        />
                    </div>

                    <div className={style.regInput}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            autoComplete={'off'}
                            value={confirmPass?.passConfirm}
                            onChange={(e) =>
                                setConfirmPass({
                                    ...confirmPass,
                                    passConfirm: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className={style.regCheckBox}>
                        <label htmlFor="checkBox">
                            I give my consent to Travid and persons acting on its behalf to
                            process my personal data in accordance{' '}
                            <Link to={POLICY} style={{color: 'black'}}>
                                with the Policy
                            </Link>
                        </label>
                        <input
                            type="checkbox"
                            id="checkBox"
                            autoComplete={'off'}
                            checked={confirmPass?.checkBox}
                            onChange={(e) =>
                                setConfirmPass({...confirmPass, checkBox: e.target.checked})
                            }
                        />
                    </div>
                    {loading ?
                        <div className={style.regButton} disabled={true}>
                            <LoadingOutlined/>
                        </div>
                        :
                        <div className={style.regButton} onClick={handleSend}>
                            <button>Далее</button>
                        </div>
                    }

                </div>}
                {step2 && <div autoComplete={'off'} className={style.regContent}>
                    <div className={style.regInput}>
                        <label htmlFor="checkCode">Потвердите почту</label>
                        <input type={'number'} onChange={e => setCheckCode({...checkCode, code: e.target.value})}/>
                    </div>
                    {loading ?
                        <div className={style.regButton} disabled={true}>
                            <LoadingOutlined/>
                        </div>
                        :
                        <div className={style.regButton} onClick={handleSendStep2}>
                            <button>Далее</button>
                        </div>
                    }
                </div>}
                {step3 && <div autoComplete={'off'} className={style.regContent}>
                    <div className={style.regInput}>
                        <label htmlFor="email">Юзернейм</label>
                        <input
                            type="text"
                            id="username"
                            autoComplete={'off'}
                            value={initialState?.username}
                            onChange={(e) =>
                                setInitialState({...initialState, username: e.target.value})
                            }
                        />
                    </div>

                    <div className={style.regInput}>
                        <label htmlFor="firstName">Имя</label>
                        <input
                            type="text"
                            id="firstName"
                            autoComplete={'off'}
                            value={initialState?.firstName}
                            onChange={(e) =>
                                setInitialState({...initialState, firstName: e.target.value})
                            }
                        />
                    </div>

                    <div className={style.regInput}>
                        <label htmlFor="lastName">Фамиля</label>
                        <input
                            type="text"
                            id="lastName"
                            autoComplete={'off'}
                            value={initialState?.lastName}
                            onChange={(e) =>
                                setInitialState({
                                    ...initialState,
                                    lastName: e.target.value,
                                })
                            }
                        />
                    </div>
                    {loading ?
                        <div className={style.regButton} disabled={true}>
                            <LoadingOutlined/>
                        </div>
                        :
                        <div className={style.regButton} onClick={handleSendStep3}>
                            <button>Создать</button>
                        </div>
                    }
                </div>}
            </div>
        </div>
    );
};

export default Registration;
