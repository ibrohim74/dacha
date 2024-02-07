import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {GetAnnouncementAPI, GetDachaAPI, GetRequestAPI} from "./API/announcementAPI";

const RequestsAnnouncement = () => {
    const [requests, setRequests] = useState([])
    const [dacha , setDacha] = useState()
    useEffect(() => {
        GetRequestAPI().then(r => {
            if (r?.status === 200) {
                setRequests(r.data)
            }
        })
        GetAnnouncementAPI().then(r=>{
            if (r?.status === 200){
                setDacha(r.data)
            }
        })
    }, [])
    console.log(dacha)
    return (
        <Box m={"20px"}>
            {requests ? requests.map((item) => {
                return (
                    <div>
                        {item.customer_id}
                    </div>
                )
            }) : ({})}
        </Box>
    );
};

export default RequestsAnnouncement;