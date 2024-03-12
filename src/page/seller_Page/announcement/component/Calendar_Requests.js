import React, { useEffect, useState } from 'react';
import { Button, message } from "antd";
import { Box } from "@mui/material";
import styles from "../assets/request.module.css";
import { Icons } from "../../../../assets/icons/icons";
import { AcceptRequestAPI, DeleteBookingById, DenyRequestAPI, GetRequestAPI, GetUserById } from "../API/announcementAPI";
import { $authHost } from "../../../../processes/http/http";
import { GetSellerBookingAPI } from "../../../item_Page/API/itemPageAPI";
import { jwtDecode } from "jwt-decode";

const CalendarRequests = (data) => {
    const [openBooking, setOpenBooking] = useState(true);
    const [openRequest, setOpenRequest] = useState(false);
    const [client, setClient] = useState([]);
    const [request, setRequest] = useState([]);
    const [booking, setBooking] = useState([]);
    const [bookingClient, setBookingClient] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
        const formattedDate = date.toLocaleDateString('ru-RU', options);
        return formattedDate;
    };

    const bookingDelete = (val) => {
        DeleteBookingById(val)
            .then(r => {
                if (r === 200) {
                    message.success('deleted booking');
                    window.location.reload();
                } else {
                    message.error('error del booking');
                }
            })
            .catch(error => console.error('Error deleting booking:', error));
    };

    const acceptRequest = (id) => {
        AcceptRequestAPI(id)
            .then(r => {
                if (r?.status === 200) {
                    message.success('success');
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error accepting request:', error));
    };

    const denyRequest = (id) => {
        DenyRequestAPI(id)
            .then(r => {
                if (r?.status === 200) {
                    message.success('success');
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error denying request:', error));
    };

    const getClientRequest = async () => {
        for (const item of request) {
            try {
                const res = await $authHost.get('user/' + item.customer_id);
                setClient(prevState => [...prevState, res.data]);
            } catch (error) {
                console.error('Error fetching client request:', error);
            }
        }
    };

    const getClientBooking = async () => {
        for (const item of booking) {
            try {
                const res = await $authHost.get('user/' + item.customer_id);
                setBookingClient(prevState => [...prevState, res.data]);
            } catch (error) {
                console.error('Error fetching client booking:', error);
            }
        }
    };

    useEffect(() => {
        GetRequestAPI()
            .then(r => {
                if (r.status === 200) {
                    const filterReq = r.data.requests.filter(e => e.accommodation_id === parseInt(data.idDacha));
                    setRequest(filterReq);
                    console.log(r)
                }
            })
            .catch(error => console.error('Error fetching requests:', error));

        GetSellerBookingAPI(jwtDecode(localStorage.getItem('token')).userId)
            .then(r => {
                console.log(r)
                if (r.status === 200) {
                    const filterReq = r.data.bookings.filter(e => e.accommodation_id === parseInt(data.idDacha));
                    setBooking(filterReq);
                }
            })       
            .catch(error => console.error('Error fetching seller bookings:', error));

        getClientRequest();
        getClientBooking();
    }, [data?.events]);

    return (
        <div>
            <Box>
                <Button onClick={() => {
                    setOpenBooking(true);
                    setOpenRequest(false);
                }}>Booking</Button>
                <Button style={{ marginLeft: "20px" }} onClick={() => {
                    setOpenRequest(true);
                    setOpenBooking(false);
                }}>Request</Button>
            </Box>
            {openBooking && <>
                <h1>Bookings</h1>
                {data?.events?.map((item) => {
                    const currentClient = bookingClient.find(clientItem => clientItem.id === item.customer_id);
                    return (
                        <div key={item.id} className={styles['requestItem']} style={{ marginTop: '20px' }}>
                            <div className={styles.req_start}>
                                <div className={styles.req_start__text}>
                                    <h1>{currentClient?.username}</h1>
                                    <p>Booked</p>
                                </div>
                            </div>
                            <div className={styles.req_center}>
                                <div className={styles.req_center__text}>
                                    <h1>{item?.title}</h1>
                                    <p>From {formatDate(item?.start_day)} - to {formatDate(item?.end_day)}</p>
                                </div>
                            </div>
                            <div className={styles.req_footer}>
                                <div className={styles.requestDeny} onClick={() => bookingDelete(item?.booking_id)}>
                                    <Icons.DenyIcon />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>}
            {openRequest && <>
                <h1>Requests</h1>
                {request?.map((item) => {
                    const currentClient = client.find(clientItem => clientItem.id === item.customer_id);
                    return (
                        <div key={item.id} className={styles['requestItem']} style={{ marginTop: '20px' }}>
                            <div className={styles.req_start}>
                                <div className={styles.req_start__text}>
                                    <h1>{currentClient?.username}</h1>
                                    <p>Requested</p>
                                </div>
                            </div>
                            <div className={styles.req_center}>
                                <div className={styles.req_center__text}>
                                    <h1>{item?.title}</h1>
                                    <p>From {formatDate(item?.start_day)} - to {formatDate(item?.end_day)}</p>
                                </div>
                            </div>
                            <div className={styles.req_footer}>
                                <div className={styles.requestAccept} onClick={() => acceptRequest(item?.booking_id)}>
                                    <Icons.AcceptIcon />
                                </div>
                                <div className={styles.requestDeny} onClick={() => denyRequest(item?.booking_id)}>
                                    <Icons.DenyIcon />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>}
        </div>
    );
};

export default CalendarRequests;
