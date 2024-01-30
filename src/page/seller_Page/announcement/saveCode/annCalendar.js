import React, {useEffect, useState} from 'react';

import {formatDate} from "@fullcalendar/core";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import Header from "../../../components/header_adminPage";
import {tokens} from "../../../components/theme";
import Calendar from "./component/calendar";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {CABINET, CREATE_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT} from "../../../processes/utils/consts";


// announcement = e'lon

const AnnouncementCal = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [events, setEvents] = useState([])
    console.log(events)
    const navigate = useNavigate();
    useEffect(() => {

    }, [])

    const handleUpdateEvent = (id) => {
        navigate(CABINET+UPDATE_ANNOUNCEMENT)
    }
    return (
        <div>
            <Box m="20px">
                <Header title="Calendar" subtitle="Announcement calendar for seller"/>

                <Box display="flex" justifyContent="space-between">
                    {/* CALENDAR SIDEBAR */}
                    <Box
                        flex="1 1 20%"
                        backgroundColor={colors.primary[400]}
                        p="15px"
                        borderRadius="4px"
                    >
                        <Typography variant="h5">Events</Typography>
                        <List>
                            {events && events.map((event) => (

                                <ListItem
                                    key={event.id}
                                    sx={{
                                        backgroundColor: colors.greenAccent[500],
                                        margin: "10px 0",
                                        borderRadius: "2px",
                                        flexDirection: "column"
                                    }}
                                >
                                    <ListItemText
                                        primary={event.inputData.title}
                                        secondary={
                                            <Typography>
                                                start: {formatDate(event.start, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })} <br/>
                                                end: {formatDate(event.end, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                            </Typography>
                                        }
                                    />
                                    <Button onClick={() => handleUpdateEvent(event.id)}>Update</Button>
                                </ListItem>


                            ))}
                        </List>
                    </Box>

                    {/* CALENDAR */}
                    <Box flex="1 1 100%" ml="15px">
                        <Calendar/>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default AnnouncementCal;


