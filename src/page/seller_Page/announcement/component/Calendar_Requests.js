import React, {useEffect, useState} from 'react';
import {Button, message} from "antd";
import {Box} from "@mui/material";
import styles from "../assets/request.module.css";
import {Icons} from "../../../../assets/icons/icons";
import {AcceptRequestAPI, DeleteBookingById, DenyRequestAPI, GetRequestAPI, GetUserById} from "../API/announcementAPI";
import {$authHost} from "../../../../processes/http/http";
import RequestsAnnouncement from "../requests_Announcement";
import {GetSellerBookingAPI} from "../../../item_Page/API/itemPageAPI";
import {jwtDecode} from "jwt-decode";

const CalendarRequests = (data) => {
    const [openBooking, setOpenBooking] = useState(true)
    const [openRequest, setOpenRequest] = useState(false)
    const [client, setClient] = useState([]);
    const [request, setRequest] = useState([])
    const [booking, setBooking] = useState([])
    const [bookingClient, setBookingClient] = useState([])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'};
        const formattedDate = date.toLocaleDateString('ru-RU', options);
        return formattedDate;
    };

    const bookingDelete = (val) => {
        console.log(val)
        DeleteBookingById(val).then(r => {
            if (r === 200) {
                message.success('deleted booking')
                window.location.reload()
            } else {
                message.error('error del booking')
            }
        })
    }

    const acceptRequest = (id) => {
        AcceptRequestAPI(id).then(r => {
            if (r?.status === 200) {
                message.success('success')
                window.location.reload()
            }
        })
    }
    const denyRequest = (id) => {
        DenyRequestAPI(id).then(r => {
            if (r?.status === 200) {
                message.success('success')
                window.location.reload()
            }
        })
    }

    const getClientRequest = async () => {
        for (const item of request) {
            try {
                const res = await $authHost.get('user/' + item.customer_id);
                console.log(res)
                setClient(prevState => [...prevState, res.data]);
            } catch (e) {
                console.log(e);
            }
        }
    };
    const getClientBooking = async () => {
        for (const item of booking) {
            try {
                const res = await $authHost.get('user/' + item.customer_id);
                console.log(res)
                setBookingClient(prevState => [...prevState, res.data]);
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        GetRequestAPI().then(r =>{
            const filterReq = r.data.filter(e=> e.accommodation_id === parseInt(data.idDacha))
            setRequest(filterReq)
        })
        GetSellerBookingAPI(jwtDecode(localStorage.getItem('token')).userId).then(r => {
            const filterReq = r.data.filter(e=> e.accommodation_id === parseInt(data.idDacha))
            setBooking(filterReq)
        })
        getClientRequest();
        getClientBooking()
    }, [data?.events]);

    console.log(client)
    return (
        <div>
            <Box>
                <Button onClick={() => {
                    setOpenBooking(true)
                    setOpenRequest(false)
                }}>Booking</Button>
                <Button style={{marginLeft: "20px"}} onClick={() => {
                    setOpenRequest(true)
                    setOpenBooking(false)
                }}>Request</Button>
            </Box>
            {openBooking && <>
                <h1>Bookings</h1>
                {data?.events?.map((item) => {
                const currentClient = bookingClient.find(clientItem => clientItem.id === item.customer_id);
                return (<>

                    <div key={item.id} className={styles['requestItem']} style={{marginTop: '20px'}}>

                        <div className={styles.req_start}>

                            <div className={styles.req_start__text}>
                                <h1>{currentClient?.username}</h1>
                                <p>Бронировал(а)</p>
                            </div>
                        </div>
                        <div className={styles.req_center}>
                            <div className={styles.req_center__text}>
                                <h1>{item?.title}</h1>
                                <p>С {formatDate(item?.start_day)} - до {formatDate(item?.end_day)} </p>
                            </div>
                        </div>
                        <div className={styles.req_footer}>
                            {/*<div className={styles.requestAccept}*/}
                            {/*     onClick={e => acceptRequest(item?.booking_id)}>*/}
                            {/*    <Icons.AcceptIcon/>*/}
                            {/*</div>*/}
                            <div className={styles.requestDeny}
                                 onClick={() => bookingDelete(item?.booking_id)}
                            >
                                <Icons.DenyIcon/>
                            </div>
                        </div>
                    </div>
                </>)
            })}</> }
            {openRequest && <> <h1>Requests</h1> {request?.map((item) => {
                const currentClient = client.find(clientItem => clientItem.id === item.customer_id);
                return (<>

                        <div key={item.id} className={styles['requestItem']} style={{marginTop: '20px'}}>

                            <div className={styles.req_start}>

                                <div className={styles.req_start__text}>
                                    <h1>{currentClient?.username}</h1>
                                    <p>Бронировал(а)</p>
                                </div>
                            </div>
                            <div className={styles.req_center}>
                                <div className={styles.req_center__text}>
                                    <h1>{item?.title}</h1>
                                    <p>С {formatDate(item?.start_day)} - до {formatDate(item?.end_day)} </p>
                                </div>
                            </div>
                            <div className={styles.req_footer}>
                                <div className={styles.requestAccept}
                                     onClick={() => acceptRequest(item?.booking_id)}>
                                    <Icons.AcceptIcon/>
                                </div>
                                <div className={styles.requestDeny}
                                     onClick={() => denyRequest(item?.booking_id)}
                                >
                                    <Icons.DenyIcon/>
                                </div>
                            </div>
                        </div>

                    </>
                )
            })}
            </>
            }
        </div>
    );
};

export default CalendarRequests;