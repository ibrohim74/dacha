import React, {memo, useEffect, useMemo, useState} from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import {message} from "antd";

const Calendar = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {

    }, [])

    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
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
        if (
            window.confirm(
                `Are you sure you want to delete the event '${selected.event.extendedProps.inputData.title}'`
            )
        ) {


        }
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
                eventTimeFormat={{hour12: false}}
                locale={'ru'}
                dayMaxEvents={true}
                select={handleDateClick}
                weekends={true}
                eventClick={handleEventClick}
                events={events}
            />

        </>
    );
};

export default memo(Calendar);