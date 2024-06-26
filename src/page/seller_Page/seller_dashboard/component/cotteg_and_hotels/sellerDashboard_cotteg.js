import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {
    ANNOUNCEMENT,
    ANNOUNCEMENT_ITEM_PAGE,
    CABINET,
    CREATE_ANNOUNCEMENT, SELLER_DASHBOARD
} from "../../../../../processes/utils/consts";
import {DeleteDachaAPI, GetAnnouncementAPI} from "../../../announcement/API/announcementAPI";
import style from './sellerDashboard_Cotteg_hotel.module.css'
import {Icons} from "../../../../../assets/icons/icons";
import Score from "../../../../../components/score/score";
import {Dropdown} from "antd";

const SellerDashboardCotteg = ({id}) => {
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

    const handleDelete = (id) => {
        DeleteDachaAPI(id).then(r => {
            if (r.status === 200) {
                const updatedAnnouncementData = announcementData.filter(item => item.id !== id);
                setAnnouncementData(updatedAnnouncementData);
            }
        })
    }
                                                                                  

    const renderDropdownItems = (itemId) => [
        {
            key: '1',
            label: (
                <Link to={CABINET + 'announcement_item_page/' + `${itemId}`}>
                    Изменить
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <div>
                    Статистика
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Изменить даты
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <div onClick={() => handleDelete(itemId)}>
                    Удалить
                </div>
            ),
        },
    ];
    console.log(announcementData)
    return (
        <div style={{width: '100%', height: "100%", position: "relative"}}>
            {announcementData.length > 0 ?
                announcementData.map((item, index) => {
                    return (
                        <div key={index} className={style.sellerDashboard_cotteg_hotels_item}>
                            <div className={style.sellerDashboard_cotteg_hotels_item_1}>
                                <h1>{item.title}</h1>
                                <p>{item.id}</p>
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
                                        items: renderDropdownItems(item.id),
                                    }}
                                    placement="bottomLeft"
                                    arrow
                                >
                                    <button><Icons.Dots/></button>
                                </Dropdown>
                            </div>
                        </div>
                    );
                }) : <div className={style.SellerDashboardNoData}>
                    <Icons.NoDocuments/>
                    <p>На данный момент ничего нету</p>
                </div>}
            <div className={style.sellerDashboard_cotteg_create_box}>
                <a href={CABINET + CREATE_ANNOUNCEMENT} className={style.sellerDashboard_cotteg_create}>
                    <p>Создать</p>
                </a>
            </div>

        </div>
    );
};

export default SellerDashboardCotteg;
