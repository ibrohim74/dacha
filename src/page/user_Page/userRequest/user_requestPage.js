import React, {useEffect, useState} from 'react';
import styles from "../../seller_Page/announcement/assets/request.module.css";
import userRequestStyle from './user_request.module.css'
import {Icons} from "../../../assets/icons/icons";
import {GetUserBooking, GetUserRequest} from "./user_requestAPI";
import {GetDachaAPI} from "../../seller_Page/announcement/API/announcementAPI";
import {$authHost} from "../../../processes/http/http";

const UserRequestPage = () => {
    const [request, setRequest] = useState([]);
    const [booking, setBooking] = useState([]);
    const [activePage, setActivePage] = useState(true);
    const [dachasIdList, setDachasIdList] = useState([]);
    const [dachasList, setDachasList] = useState([]);
    const [photoUrls, setPhotoUrls] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    };

    const getDachas = async () => {
        try {
            const dachaDetailsPromises = dachasIdList.map(async (item) => {
                const res = await $authHost.get(`/dacha/${item}`);
                return res.data;
            });
            const dachaDetails = await Promise.all(dachaDetailsPromises);
            setDachasList(dachaDetails);
            const images = dachaDetails.map((item) => item?.photos_path?.split("\n").filter(Boolean));
            setPhotoUrls(images);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetUserRequest().then(r => {
            if (r.status === 200) {
                setRequest(r.data);
                setDachasIdList(r.data.map((item) => item.accommodation_id));
            }
        });
        GetUserBooking().then(r => {
            if (r.status === 200) {
                setBooking(r.data);
                setDachasIdList(r.data.map((item) => item.accommodation_id));
            }
        });
        getDachas();
    }, []);
    return (
        <div>
            <div className={userRequestStyle.user_req_headerBox}>
                <div className={userRequestStyle.user_req_BtnBox}>
                    <div className={`${userRequestStyle.user_req_Btn} ${activePage ? userRequestStyle.active : ''}`}
                         onClick={() => setActivePage(true)}>
                        Мои запросы
                    </div>
                    <div className={`${userRequestStyle.user_req_Btn} ${!activePage ? userRequestStyle.active : ''}`}
                         onClick={() => setActivePage(false)}>
                        История бронирования
                    </div>
                </div>
            </div>
            <div className={userRequestStyle.user_req_content}>
                {activePage ? (request?.map((item, index) => {
                    const currentPhotoUrls = photoUrls[index] || [];
                    return dachasList?.map((itemDacha , indexDach) => {
                        if (item.accommodation_id === itemDacha.id){
                            return (<div key={index} className={styles['requestItem']}>
                                <div className={styles.req_start}>
                                    <div className={styles.imgReq} style={{width:"100%"}}>
                                        {currentPhotoUrls.length>0 ? currentPhotoUrls.map((photoUrl, indexPhoto) => (
                                                <img key={indexPhoto}
                                                     src={"https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net" + photoUrl}
                                                     alt="Dacha"
                                                     width={"100%"}
                                                     height={"100%"}
                                                     className={styles["item-img"]}
                                                />
                                            )):
                                            <Icons.ImgPlcHolder
                                                width={"100%"}
                                                height={"100%"}
                                                className={styles["item-img"]}
                                            />
                                        }
                                    </div>
                                    <div className={styles.req_start__text}>
                                    </div>
                                </div>
                                <div className={styles.req_center}>
                                    <div className={styles.req_center__text}>
                                        <h1>{itemDacha?.title}</h1>
                                        <p>С {formatDate(item?.start_day)} - до {formatDate(item?.end_day)} </p>
                                    </div>
                                </div>
                                <div className={styles.req_footer}>
                                    запрос ешо не принять
                                </div>
                            </div>)
                        }
                    })
                })) :
                    ('')}
            </div>
        </div>
    );
};

export default UserRequestPage;


