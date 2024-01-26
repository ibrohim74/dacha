import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import Header_adminPage from "../../../../../components/header_adminPage";
import {CreateHostelAPI, DeleteHostelAPI, GetHostelsAPI, UpdateHostelsAPI} from "../../API/hostelAPI";
import {Input, Popconfirm} from "antd";
import TextArea from "antd/es/input/TextArea";
import Maps from "../../CreateHostel/component/maps";
import SearchInputMap from "../../CreateHostel/component/searchInputMap";
import {jwtDecode} from "jwt-decode";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CABINET, HOSTEL} from "../../../../../processes/utils/consts";

const UpdateHostel = () => {
    const [selectPosition, setSelectPosition] = useState(null);
    const [initialState, setInitialState] = useState();
    const [hostel, setHostel] = useState([])
    const mediaQuery = useMediaQuery('(max-width:750px)');

    const handleSend = async () => {
        hostel?.map((item)=>{
            UpdateHostelsAPI(item.id , initialState).then(r =>{
                if (r===200){
                    window.location.assign(CABINET+HOSTEL)
                }

            })
        })
    };
const handleDelete = async ()=>{
    hostel?.map((item)=>{
        DeleteHostelAPI(item.id).then(r =>{
            if (r===200){
                window.location.assign(CABINET+HOSTEL)
            }
        })
    })
}
    useEffect(() => {
        GetHostelsAPI().then(r => {
            setHostel(r);
            const latestHostel = r[r.length - 1];
            setSelectPosition({
                lat: latestHostel.latitude,
                lon: latestHostel.longitude,

            });
        });
    }, []);
    useEffect(() => {
        const latestHostel = hostel[hostel.length - 1];
        setInitialState({
            ...initialState,
            latitude: parseFloat(selectPosition?.lat),
            longitude: parseFloat(selectPosition?.lon),
            location_name: selectPosition?.display_name || latestHostel?.location_name
        });
    }, [selectPosition]);
    return (
        <Box m={'20px'}>
            <Header_adminPage title={'Update'} subtitle={'update hostel'}/>
            {hostel?.map((item)=>{
                return(
                    <Box width={mediaQuery ? '100%' : '50%'}>
                        <div className="input">
                            <label htmlFor="hostelName">Hostel Name : {item.title}</label>
                            <Input
                                placeholder={item.title}
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
                                placeholder={item.info}
                            />
                        </div>

                        {/*<div style={{width: "100%", height: "100%", display: 'flex', flexDirection: "column"}}>*/}
                        {/*    <Maps selectPosition={selectPosition}/>*/}
                        {/*</div>*/}
                        {/*<div style={{width: "100%"}}>*/}
                        {/*    <label htmlFor="Search">Search Location</label>*/}
                        {/*    <SearchInputMap selectPosition={selectPosition} setSelectPosition={setSelectPosition} placeholder={item?.location_name}/>*/}
                        {/*</div>*/}
                        <div
                        style={{display:"flex" , justifyContent:"space-between"}}
                        >
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                onClick={handleSend}
                                size={"large"}
                            >
                                Update
                            </Button>

                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={handleDelete}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    type="submit"
                                    color="error"
                                    variant="contained"
                                    size={"large"}
                                    // style={{marginLeft:"100px"}}
                                >
                                    Delete
                                </Button>
                            </Popconfirm>
                        </div>


                    </Box>
                )
            })}
        </Box>
    );
};

export default UpdateHostel;