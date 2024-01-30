import React, {useEffect, useState} from 'react';
import {GetAnnouncementAPI} from "./API/announcementAPI";
import {Box} from "@mui/material";
import Header_adminPage from "../../../components/header_adminPage";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './assets/create_ann.css'
const Announcement = () => {
    const [announcementData , setAnnouncementData] = useState(null)
    useEffect(()=>{
        GetAnnouncementAPI().then(r => {
            setAnnouncementData(r)
        })
    },[])
    console.log(announcementData)
    return (
        <Box m={'20px'}>
        <Header_adminPage title={"Announcement"} subtitle={'all announcement'}/>
            <div className="ann-box">
                <div className="ann-box-item">
                    <div className="ann-box-photo">
                       <h3 style={{margin:'0'}}>Add photo</h3>
                        <AddCircleOutlineIcon style={{marginTop:'5px'}}/>
                    </div>
                    <div className="ann-box-info">
                        <div className="ann-item-title">
                            <h1>skaldklaskdasjdnks nakdjaskjdks  adajsdh hg</h1>
                        </div>
                    </div>
                </div>

            </div>
        </Box>
    );
};

export default Announcement;