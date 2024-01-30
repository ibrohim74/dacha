import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import Create_InputLeft from "./component/create_InputLeft";
import "./assets/create_ann.css"
import {Input, message} from "antd";
import Header_adminPage from "../../../components/header_adminPage";
import {jwtDecode} from "jwt-decode";
import {CreateAnnouncementAPI} from "./API/announcementAPI";


const CreateAnnouncement = () => {
    const [inputLeft, setInputLeft] = useState(null)
    const [initialState, setInitialState] = useState(null)
    const JWT = jwtDecode(localStorage.getItem('token'))

    const handleSend = () => {
        if (initialState.title && initialState.info && initialState.price) {
            if (initialState.location_name) {
                if (initialState.floors &&
                    initialState.area && initialState.rooms_number
                    && initialState.minimum_book_days && initialState.minimum_preorder_days) {
                    CreateAnnouncementAPI(initialState).then(r => {
                        if (r.status === 200) {
                            message.success('success')
                            window.location.reload()
                        } else {
                            message.error('error send data')
                        }
                    })
                } else {                    
                    message.error('barcha malumotlarni toldiring')
                }

            } else {
                message.error('qidiruv tugmasi orqali kerakli joyni qidirib tanlang')
            }
        } else {
            message.error('barcha malumotlarni toldiring')
        }
    };

    useEffect(() => {
        setInitialState({
            ...initialState,
            user_id: JWT.userId,
            title: inputLeft?.title,
            location_name: inputLeft?.display_name,
            longitude: inputLeft?.longitude,
            latitude: inputLeft?.latitude,
            info: inputLeft?.info,
            type: inputLeft?.type,
            price: inputLeft?.price
        })
    }, [inputLeft])


    return (
        <Box m={'20px'}>
            <Header_adminPage title="Create" subtitle="Create announcement"/>
            <div className="create-calendar-box">
                <Create_InputLeft inputLeft={inputLeft} setInputLeft={setInputLeft}/>
                <div className="calendar-map">
                    <div className="box-2-input">
                        <div className="input-2-row" style={{marginTop: "10px"}}>
                            <label htmlFor="floor">Этажность</label>
                            <Input placeholder={""} size={"large"}
                                   type={'number'}
                                   onChange={e => setInitialState({...initialState, floors: e.target.value})}/>
                        </div>
                        <div className="input-2-row" style={{marginTop: "10px"}}>
                            <label htmlFor="area">Площадь</label>
                            <Input placeholder={""} size={"large"}
                                   type={'number'}
                                   onChange={e => setInitialState({...initialState, area: e.target.value})}/>
                        </div>
                    </div>
                    <div className="input" style={{marginTop: "10px"}}>
                        <label htmlFor="phone">количество комнат</label>
                        <Input type={'number'}
                               onChange={e => setInitialState({...initialState, rooms_number: e.target.value})}
                        />
                    </div>
                    <div className="input" style={{marginTop: "10px"}}>
                        <label htmlFor="phone">minimum_book_days</label>
                        <Input type={'number'}
                               onChange={e => setInitialState({...initialState, minimum_book_days: e.target.value})}
                        />
                    </div>
                    <div className="input" style={{marginTop: "10px"}}>
                        <label htmlFor="phone">minimum_preorder_days</label>
                        <Input type={'number'}
                               onChange={e => setInitialState({...initialState, minimum_preorder_days: e.target.value})}
                        />
                    </div>
                    <Button type="submit" color="secondary" variant="contained" size={"large"}
                            style={{width: "100%", marginTop: "20px"}}
                            onClick={handleSend}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default CreateAnnouncement;