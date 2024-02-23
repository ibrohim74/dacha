import React, { memo, useEffect, useState } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import {message, Modal} from 'antd'; // Ant Design modalni import qilib olamiz
import { $authHost } from "../../../../processes/http/http";

import {DeleteBookingById, GetUserById} from "../API/announcementAPI";
import {jwtDecode} from "jwt-decode";
import {RequestPage} from "@mui/icons-material";
import RequestsAnnouncement from "../requests_Announcement";
import dayjs from "dayjs";

const Calendar = (data) => {
    const [dataEvents, setDataEvents] = useState([]);
    const [formattedEvents, setFormattedEvents] = useState([]);
    const getCalendarEvents = async () => {
        try {
            const JWT = jwtDecode(localStorage.getItem('token'));
            const res = await $authHost.get(`/seller/${JWT.userId}/bookings`);
            const filterRes = res?.data.bookings.filter(e=> e.accommodation_id === parseInt(data.idDacha))
            setDataEvents(filterRes);
            data.setEvents(filterRes)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCalendarEvents();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const formattedData = await Promise.all(dataEvents?.map(async (event) => {
                const user = await GetUserById(event?.customer_id);
                return {
                    id: event?.booking_id,
                    title: user.username,
                    start: new Date(event?.start_day),
                    end: new Date(event?.end_day),
                    backgroundColor: 'green',
                };
            }));
            setFormattedEvents(formattedData);
        };
        fetchData();
    }, [dataEvents]);

    const handleDateClick = (selected) => {
        const title = window.prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
    };

    const handleEventClick = (selected) => {
        Modal.confirm({
            title: 'Delete Event',
            content: `Are you sure you want to delete the event '${selected.event.title}'?
                  \n ${dayjs(selected.event.start).format('DD-MMMM HH:MM')} ||         
                  \n ${dayjs(selected.event.end).format('DD-MMMM HH:MM')}
            `,
            onOk() {
                DeleteBookingById(selected.event.id).then(r=>{
                    if (r === 200){
                        message.success('deleted')
                        window.location.reload()
                    }else {
                        message.error('failed')
                    }
                })
            },
        });
    };
    return (
        <>
            <FullCalendar
                height="75vh"
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                ]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                eventTimeFormat={{ hour12: false }}
                locale={'ru'}
                dayMaxEvents={true}
                select={handleDateClick}
                weekends={true}
                eventClick={handleEventClick}
                events={formattedEvents}
            />
        </>
    );
};

export default memo(Calendar);
