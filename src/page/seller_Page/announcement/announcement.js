import React, {useEffect, useState} from 'react';
import {GetAnnouncementAPI} from "./API/announcementAPI";
import {Box, Button} from "@mui/material";
// import Header_adminPage from "../../../components/header_adminPage";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './assets/create_ann.css'
import {Badge} from "antd";
import {useNavigate} from "react-router-dom";
import AnnouncementItemPage from "./component/announcementItemPage";
import {ANNOUNCEMENT_ITEM_PAGE, CABINET} from "../../../processes/utils/consts";
import Header_adminPage from "../../../components/header_adminPage";

const Announcement = () => {
    const [announcementData, setAnnouncementData] = useState(null)
    const navigate = useNavigate()

    const handleClickOpen = (id) => {
        navigate(CABINET + 'announcement_item_page/' + `${id}`)
    }
    useEffect(() => {
        GetAnnouncementAPI().then(r => {
            setAnnouncementData(r)
        })
    }, [])
    return (
        <Box m={'20px'}>
            <Header_adminPage title={"Announcement"} subtitle={'all announcement'}/>
            <div className="ann-box">
                {announcementData && announcementData.map((item) => {
                    return (
                        <div className="ann-box-item" key={item.id}>
                            <div className="ann-box-photo">
                                <h3 style={{margin: '0'}}>Add photo</h3>
                                <AddCircleOutlineIcon style={{marginTop: '5px'}}/>
                            </div>
                            <div className="ann-box-info">
                                <div className="ann-item-title">
                                    <h1>{item?.title}</h1>
                                    <p style={{color: "gray", fontSize: "20px"}}>{item?.info}</p>
                                </div>
                                <div className="ann-box-footer">
                                    <Box alignItems={"center"} display={"flex"}>
                                        <Badge count={3} showZero size={'small'}>
                                            <NotificationsIcon style={{margin: '0 5px 0 0', color: "white"}}/>
                                        </Badge>
                                        <Button type={'button'} color="secondary" variant="contained"
                                                onClick={() => handleClickOpen(item.id)}>Open</Button>
                                    </Box>

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Box>
    );
};

export default Announcement;