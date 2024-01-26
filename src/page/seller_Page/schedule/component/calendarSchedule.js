import React, {memo, useEffect, useMemo, useState} from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import {Input, message, Modal} from "antd";
import {Button} from "@mui/material";

const CalendarSchedule = () => {
    const [events, setEvents] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const handleDateClick = (selected) => {
        setModalTitle("Enter a new title for your event");
        setModalVisible(true);
        setSelectedEvent({
            dateStr: selected.dateStr,
            startStr: selected.startStr,
            endStr: selected.endStr,
            allDay: selected.allDay,
        });
    };

    const handleEventClick = (selected) => {
        setModalTitle(`Delete the event '${selected.event._def.title}'?`);
        setModalVisible(true);
        setSelectedEvent(selected);
    };

    const handleModalOk = (title) => {
        setModalVisible(false);

        if (title && selectedEvent) {
            const newEvent = {
                id: `${title}`,
                title,
                start: selectedEvent.startStr,
                end: selectedEvent.endStr,
                allDay: selectedEvent.allDay,
            };

            setEvents([...events, newEvent]);
        }
    };


    const handleModalCancel = () => {
        setModalVisible(false);
    };
    console.log(events)
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
            <Modal
                title={modalTitle}
                visible={modalVisible}
                onOk={() => handleModalOk(inputValue)}
                onCancel={handleModalCancel}
            >
                {selectedEvent && (
                    <>
                        <p>{`Start: ${selectedEvent.startStr}, End: ${selectedEvent.endStr}`}</p>
                        <Input
                            placeholder="Enter a new title for your event"
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button onClick={()=>handleModalOk(inputValue)}>sad</Button>
                    </>
                )}
            </Modal>

        </>
    );
};

export default memo(CalendarSchedule);