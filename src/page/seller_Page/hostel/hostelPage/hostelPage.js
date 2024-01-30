import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {CABINET, CREATE_ROOM, UPDATE_HOSTEL} from "../../../../processes/utils/consts";
import TableRoom from "./component/tableRoom";
import Header_adminPage from "../../../../components/header_adminPage";



const HostelPage = () => {
    const navigate = useNavigate();

    return (
        <Box width={'100%'} m={'20px'}>
            <Header_adminPage title={'Hostel'} subtitle={'Hostel info'}/>
            <Button
                type="submit"
                color="secondary"
                variant="contained"
                size={"large"}
                onClick={()=>{
                    navigate(CABINET+UPDATE_HOSTEL)
                }}
            >
                Update hotel
            </Button>
            <Button
                type="submit"
                color="secondary"
                variant="contained"
                size={"large"}
                onClick={() => {
                    navigate(CABINET + CREATE_ROOM)
                }}
            >
                Create Room
            </Button>
            <TableRoom/>
        </Box>
    );
};

export default HostelPage;
