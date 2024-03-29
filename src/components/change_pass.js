import React, {useState} from 'react';
import {Box, Button} from "@mui/material";
import Header_adminPage from "./header_adminPage";
import {Input, message} from "antd";
import LockResetIcon from '@mui/icons-material/LockReset';
import HttpsIcon from '@mui/icons-material/Https';
import {$authHost} from "../processes/http/http";
import {jwtDecode} from "jwt-decode";
import useMediaQuery from "@mui/material/useMediaQuery";

const ChangePass = () => {
    const [initialState, setInitialState] = useState({})
    const JWT = jwtDecode(localStorage.getItem('token'))
    const mediaQuery = useMediaQuery('(max-width:750px)');
    const handleSend = async () => {
        if (initialState.old_password && initialState.new_password) {
            if (initialState.old_password.length >= 8 && initialState.new_password.length >= 8) {
                try {
                    console.log(initialState)
                    const res = await $authHost.post(`change_old_password/${JWT.userId}`, {initialState})
                    if (res.status === 200) {
                        message.success('parrol almashdi')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500)
                    }

                } catch (e) {
                    console.log(e)
                    message.error('parol notogri')
                }
            } else {
                message.error('parol 8tadan kam bolmasligi kerak')
            }

        } else {
            message.error('barcha malumotlarni toldiring')
        }

    }
    return (
        <Box m="20px">
            <Box width={mediaQuery ? "100%" : "50%"}>
                <Input size="large" placeholder="old password" prefix={<HttpsIcon/>}
                       style={{marginBottom: "20px"}}
                       onChange={e => setInitialState({...initialState, old_password: e.target.value})}
                />
                <Input size="large" placeholder="new password" prefix={<LockResetIcon/>}
                       style={{marginBottom: "20px"}}
                       onChange={e => setInitialState({...initialState, new_password: e.target.value})}
                />
                <Button type="submit" color="secondary" variant="contained" onClick={handleSend} size={"large"}
                        style={{width: "50%"}}>
                    Change
                </Button>
            </Box>
        </Box>
    );
};

export default ChangePass;