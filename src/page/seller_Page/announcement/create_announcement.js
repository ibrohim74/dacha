import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import Create_InputLeft from "./component/create_InputLeft";
import LocationMarker from "./component/create_MapRight";
import "./assets/create_ann.css"
import {MapContainer, TileLayer} from "react-leaflet";
import {Input, message} from "antd";
import {CreateEvents} from "./modul/announcementCRUD";
import {jwtDecode} from "jwt-decode";


const CreateAnnouncement = () => {
    const [inputData, setInputData] = useState();

    const [location, setLocation] = useState({locName:""});
    const CenterPosition = [41.311081, 69.240562];
    const [initialState, setInitialState] = useState()
    const handleInputData = async (data) => {
        await setInputData(data)
    }
    const handleSend = () => {
        const JWT = jwtDecode(localStorage.getItem('token'))
        setInitialState({ ...initialState, inputData , location , ParentID:JWT.sub });

        if (Array.isArray(inputData.img) && inputData.img.length > 0){
            if ( inputData.info){
                if (inputData.title){
                    if (location.locName || location.position){
                        if (initialState.inputData && initialState.location){
                            CreateEvents(initialState).then(r => {if (r === 201){
                                message.success("created")
                                setTimeout(()=>{window.location.reload()},1500)
                            }})
                            console.log(initialState)
                        }else {
                            message.error('Barcha malumotlarni tekshirib boshqatan urunib koring')
                        }
                    }else {
                        message.error('err')
                    }
                }else {
                    message.error('название yoq')
                }
            }else {
                message.error('opisaniya yoq')
            }
        }else {message.error('rasim yoq')}
    };

    const locName = (locName , position)=>{
       setLocation({locName:locName , position:position})
    }

    return (
        <Box m={'20px'}>
            <div className="create-calendar-box">
                <Create_InputLeft onInputData={handleInputData}/>
                <div className="calendar-map">
                    <MapContainer center={CenterPosition} zoom={13} scrollWheelZoom={false}
                                  style={{width: '100%', height: '200px', overflow: 'hidden', borderRadius: '20px'}}>
                        <TileLayer
                            attribution="Dacha.uz"
                            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                        />
                        <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />

                        <LocationMarker locName={locName}/>
                    </MapContainer>
                    <p>{location?.locName}</p>
                    <div className="input" style={{marginTop: "10px"}}>
                        <label htmlFor="name">Контактное лицо*</label>
                        <Input placeholder={"имя фамилия"} size={"large"}
                               onChange={e => setInitialState({...initialState, nameUser: e.target.value})}/>
                    </div>
                    <div className="input" style={{marginTop: "10px"}}>
                        <label htmlFor="phone">Номер телефона*</label>
                        <Input placeholder={""} size={"large"}
                               onChange={e => setInitialState({...initialState, userPhone: e.target.value})}/>
                    </div>

                    <div className="box-2-input">
                        <div className="input-2-row" style={{marginTop: "10px"}}>
                            <label htmlFor="phone">свободно от*</label>
                            <Input placeholder={""} size={"large"} type={"datetime-local"}
                                   onChange={e => setInitialState({...initialState, start: e.target.value})}/>
                        </div><div className="input-2-row" style={{marginTop: "10px"}}>
                            <label htmlFor="phone">свободно до*</label>
                            <Input placeholder={""} size={"large"} type={"datetime-local"}
                                   onChange={e => setInitialState({...initialState, end: e.target.value})}/>
                        </div>
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