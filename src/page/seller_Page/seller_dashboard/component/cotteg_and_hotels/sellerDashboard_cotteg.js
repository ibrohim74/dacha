import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ANNOUNCEMENT_ITEM_PAGE, CABINET} from "../../../../../processes/utils/consts";
import {GetAnnouncementAPI} from "../../../announcement/API/announcementAPI";
import style from './sellerDashboard_Cotteg_hotel.module.css'
import {Icons} from "../../../../../assets/icons/icons";
import Score from "../../../../../components/score/score";
import {Dropdown} from "antd";

const SellerDashboardCotteg = () => {
    const [announcementData, setAnnouncementData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [notification, setNotification] = useState([])
    const navigate = useNavigate();

    const handleClickOpen = (id) => {
        navigate(CABINET + "announcement_item_page/" + `${id}`);
    };

    useEffect(() => {

        GetAnnouncementAPI().then((r) => {
            setAnnouncementData(r.data);
            setLoading(false);
        });
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];
    console.log(announcementData)
    return (
        <div>
            {announcementData &&
                announcementData.map((item, index) => {
                    const filterReq = notification && notification.filter(e => e.accommodation_id === item.id);

                    const itemWithRoute = {
                        ...item,
                        notifications: filterReq?.length,
                        route: `${CABINET + ANNOUNCEMENT_ITEM_PAGE}`,
                    };
                    return (
                        <>
                            <div  className={style.sellerDashboard_cotteg_hotels_item}>
                                <div className={style.sellerDashboard_cotteg_hotels_item_1}>
                                    <h1>{item.title}</h1>
                                </div>
                                <div className={style.sellerDashboard_cotteg_hotels_item_2}>
                                    <Icons.LocationIconSellerDashboard/>
                                    <p>{item.location_name}</p>
                                </div>
                                <div className={style.sellerDashboard_cotteg_hotels_item_3}>
                                    <span>
                                        <Score score={item.rating}/>
                                        <h1>{item.rating}</h1>
                                        2032 отзывов
                                    </span>

                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        placement="bottomLeft"
                                        arrow
                                    >
                                        <button><Icons.Dots/></button>
                                    </Dropdown>

                                </div>
                            </div>
                        </>
                    );
                })}
        </div>
    );
};

export default SellerDashboardCotteg;