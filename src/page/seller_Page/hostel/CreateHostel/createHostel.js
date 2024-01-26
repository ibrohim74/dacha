import React, {useState, useEffect} from 'react';
import {Box, Button} from "@mui/material";
import {Input, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import useMediaQuery from "@mui/material/useMediaQuery";
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import {MapContainer, TileLayer, Circle, useMap, Marker, Popup} from 'react-leaflet';
import Maps from "./component/maps";
import SearchInputMap from "./component/searchInputMap";
import {CreateHostelAPI} from "../API/hostelAPI";
import {jwtDecode} from "jwt-decode";
import {CABINET, HOSTEL} from "../../../../processes/utils/consts";
import Header_adminPage from "../../../../components/header_adminPage";


const CreateHostel = () => {
    const JWT = jwtDecode(localStorage.getItem('token'))
    const [selectPosition, setSelectPosition] = useState(null);
    const [initialState, setInitialState] = useState({user_id:JWT?.userId});
    const mediaQuery = useMediaQuery('(max-width:750px)');
    const CenterPositionTashkent = [41.311081, 69.240562];

useEffect(()=>{
    setInitialState({
        ...initialState, latitude: parseFloat(selectPosition?.lat),
        longitude:parseFloat(selectPosition?.lon) ,
        location_name: selectPosition?.display_name
    })
},[selectPosition])

    const handleSend = async () => {
        if (initialState.longitude && initialState.latitude && initialState.location_name &&
            initialState.title && initialState.info
        ){
            CreateHostelAPI(initialState).then(r => {
                if (r === 200){
                    window.location.assign(CABINET+HOSTEL)
                }
            })
        }else {
            message.error('barcha malumotlarni toldiring')
        }

    };
    return (
        <Box width={mediaQuery ? '100%' : '50%'}>
            <Header_adminPage title={'Hostel'} subtitle={'Hostel Create'}/>

            <div className="input">
                <label htmlFor="hostelName">Hostel Name</label>
                <Input
                    placeholder={'Hostel Name'}
                    onChange={(e) => setInitialState({...initialState, title: e.target.value})}
                />
            </div>
            <div className="input">
                <label htmlFor="hostelInfo">Hostel Info</label>
                <TextArea
                    onChange={(e) => setInitialState({...initialState, info: e.target.value})}
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                    }}
                    placeholder={'Hostel Info'}
                />
            </div>
            <Maps/>
            <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={handleSend}
                size={"large"}
            >
                Create
            </Button>
        </Box>
    );
};

export default CreateHostel;
