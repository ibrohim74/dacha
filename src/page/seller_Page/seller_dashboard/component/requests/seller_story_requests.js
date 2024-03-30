import React, {useEffect, useState} from 'react';
import style from './seller_dashboard_requests.module.css';
import {
    AcceptRequestAPI,
    DenyRequestAPI,
    GetAnnouncementAPI,
    GetRequestAPI
} from "../../../announcement/API/announcementAPI";
import {message} from "antd";
import {jwtDecode} from "jwt-decode";
import {$authHost} from "../../../../../processes/http/http";
import {Icons} from "../../../../../assets/icons/icons";
import Score from "../../../../../components/score/score";

const SellerStoryRequests = () => {
    const [requests, setRequests] = useState([]);
    const [dacha, setDacha] = useState([]);
    const [client, setClient] = useState([]);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sellerBookings, setSellerBooking] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: "short", // short dan "Wed" uchun
            day: "2-digit",
            month: "2-digit",
        };
        const formattedDate = date.toLocaleDateString("ru-RU", options).replace('.', '/');
        return formattedDate;
    };


    const fetchData = async () => {
        setIsLoading(true);
        try {
            const requestResponse = await GetRequestAPI();
            if (requestResponse?.data) {
                setRequests(requestResponse.data);
            }

            const announcementResponse = await GetAnnouncementAPI();
            if (announcementResponse?.data) {
                setDacha(announcementResponse.data);
                const images = announcementResponse.data.map((item) =>
                    item?.photos_path?.split("\n").filter(Boolean).map(url => url.trim())
                );
                setPhotoUrls(images);
            }
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const sellerBooking = async () => {
            try {
                const JWT = jwtDecode(localStorage.getItem("token"));
                const res = await $authHost.get(`/seller/${JWT?.userId}/bookings`);
                setSellerBooking(res.data)
            } catch (e) {
                console.log(e);
            }
        };
        sellerBooking();
    }, []);

    const getClient = async () => {
        try {
            const clientData = [];
            for (const item of sellerBookings) {
                const res = await $authHost.get("user/" + item.customer_id);
                clientData.push(res.data);
            }
            setClient(clientData);
        } catch (error) {
            console.log("Error fetching client data:", error);
        }
    };

    useEffect(() => {
        getClient();
    }, [requests]);

    const combinedList = [...sellerBookings];

    // Sorting combined list by date (example sorting criteria)
    combinedList.sort((a, b) => new Date(a.start_day) - new Date(b.start_day));
    console.log(combinedList)
    return (
        <div>
            {combinedList?.length > 0 ? combinedList.map((item) => {
                const dachaItem = dacha.find(d => d.id === item.accommodation_id);
                if (!dachaItem) return null;
                const currentPhotoUrl = photoUrls.find((_, index) => dachaItem.id === item.accommodation_id);
                const currentClient = client.find(clientItem => clientItem.id === item.customer_id);
                console.log(combinedList)
                return (
                    <div key={item.id} className={style.sellerDashboard__new_request_item}>
                        <div className={style.sellerDashboard__new_request_item_column_1}>
                            <div className={style.sellerDashboard__new_request_item_column_photo}>
                                {currentPhotoUrl?.length > 0 ? <img
                                        src={`https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api${currentPhotoUrl[0]}`}
                                        alt={dachaItem?.title}/>
                                    :
                                    <Icons.ImgPlcHolder

                                        width={"100%"}
                                        height={"100%"}
                                    />
                                }
                            </div>
                            <div
                                className={style.sellerDashboard__new_request_item_column_title}>
                                <h1>{dachaItem?.title}</h1>
                                <p>{currentClient?.username}</p>
                            </div>
                            <div
                                className={style.sellerDashboard__new_request_item_column_rating}>
                                <Score score={dachaItem?.rating}/>
                            </div>
                        </div>

                        <div className={style.sellerDashboard__new_request_item_column_2}>
                            <div className={style.sellerDashboard__new_request_item_column_2_day}>
                                <p><Icons.Month/>{formatDate(item.start_day)}</p>
                                <p><Icons.Month/>{formatDate(item.end_day)}</p>
                            </div>
                            <div
                                className={style.sellerDashboard__new_request_item_column_2_people}>
                                <Icons.Request_people/>
                                {item?.adults} Взрослых
                            </div>
                            {item?.children ? <div
                                style={{width: '130px'}}
                                className={style.sellerDashboard__new_request_item_column_2_people}>
                                <Icons.Request_people/>
                                {item?.children} Дети
                            </div> : ''
                            }

                        </div>
                        <div className={style.sellerDashboard__new_request_item_column_3}>
                            <div
                                className={style.sellerDashboard__active_request_item_column_3_buttons}>
                                {item.status === "finished" &&
                                    <div className={style.sellerDashboard__status_item}
                                         style={{border: "1px solid #15CC69", background: 'rgba(21,204,105,0.05)'}}>
                                        <Icons.SuccessGreen/>
                                        <p style={{color: '#15CC69'}}>Завершен</p>
                                    </div>
                                }
                                {item.status === "pre-finished" &&
                                    <div className={style.sellerDashboard__status_item} style={{background: "#EEEFF5"}}>
                                        <Icons.DefolteSuccess/>
                                        <p style={{color: '#A6A6A6'}}>Досрочный выезд</p>
                                    </div>
                                }
                                {item.status === "awaiting" &&
                                    <div className={style.sellerDashboard__status_item} style={{
                                        border: "1px solid rgb(255, 255, 0)",
                                        background: 'rgba(255,255,0,0.09)'
                                    }}>
                                        <p style={{color: 'rgb(38,38,3)'}}>в ожидании</p>
                                    </div>
                                }
                                {item.status === "cancelled" &&
                                    <div className={style.sellerDashboard__status_item}
                                         style={{border: "1px solid #FF4141", background: 'rgba(255,65,65,0.05)'}}>
                                        <Icons.DenyRed/>
                                        <p style={{color: '#FF4141'}}>отменен</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                );
            }) : <div className={style.SellerDashboardNoData}>
                <Icons.NoDocuments/>
                <p>На данный момент ничего нету</p>
            </div>
            }
        </div>
    );
};

export default SellerStoryRequests;
