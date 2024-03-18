import React, { useEffect, useState } from 'react';
import styles from "../../seller_Page/announcement/assets/request.module.css";
import userRequestStyle from './user_request.module.css';
import { Icons } from "../../../assets/icons/icons";
import {GetDachaUserRequestPageAPI, GetUserBooking, GetUserRequest} from "./api/user_requestAPI";
import { GetDachaAPI } from "../../seller_Page/announcement/API/announcementAPI";
import { $authHost } from "../../../processes/http/http";
import RequestUser from "./component/requestUser";
import BookingUser from "./component/bookingUser";

const UserRequestPage = () => {
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

    useEffect(() => {
        GetUserBooking().then(r => {
            if (r?.status === 200) {
                setBooking(r.data.bookings);
                setDachasIdList(r.data.bookings.map((item) => item.accommodation_id));
            }
        });

    }, []);

    useEffect(() => {
        if (dachasIdList.length > 0) {
            GetDachaUserRequestPageAPI(dachasIdList.map((item) => item)).then(r => {
                if (Array.isArray(r)){
                    setDachasList(r);
                    const images =r.map((item)=> item.photos_path.split("\n").filter(Boolean))
                    setPhotoUrls(images);
                }else {
                    setDachasList(r);
                    const images =  r.photos_path.split("\n").filter(Boolean);
                    setPhotoUrls(images);
                }

            }).catch(err=>console.log(err))
        }
    }, [dachasIdList]);
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
                {activePage ?
                    <RequestUser
                        dachasList={dachasList}
                        dachaImg={photoUrls}
                        setDachasIdList={setDachasIdList}
                        dachasIdList={dachasIdList}
                        formData={formatDate}
                        photoUrl={photoUrls}
                    /> :
                    <BookingUser
                        dachasList={dachasList}
                        dachaImg={photoUrls}
                        setDachasIdList={setDachasIdList}
                        dachasIdList={dachasIdList}
                        formData={formatDate}
                        photoUrl={photoUrls}
                    />}
            </div>
        </div>
    );
};

export default UserRequestPage;
