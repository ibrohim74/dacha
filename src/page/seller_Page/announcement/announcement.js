import React, {useEffect, useState} from 'react';
import {GetAnnouncementAPI} from "./API/announcementAPI";
import {Box, Button} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './assets/create_ann.css'
import {Badge} from "antd";
import {useNavigate} from "react-router-dom";
import AnnouncementItemPage from "./component/announcementItemPage";
import {ANNOUNCEMENT_ITEM_PAGE, CABINET, CREATE_ANNOUNCEMENT, PRODUCT_ROUTE} from "../../../processes/utils/consts";
import styles from './assets/ann.module.css'
import {Icons} from "../../../assets/icons/icons";
import Score from "../../../components/score/score";

const Announcement = () => {
    const [announcementData, setAnnouncementData] = useState(null)
    const [photoUrls, setPhotoUrls] = useState([]); // Fayl yo'l(lar)ni saqlash uchun yangi state
    const navigate = useNavigate()

    const handleClickOpen = (id) => {
        navigate(CABINET + 'announcement_item_page/' + `${id}`)
    }

    useEffect(() => {
        GetAnnouncementAPI().then(r => {
            setAnnouncementData(r);
            const urls = r?.map(item => item?.photos_path.split('\n').filter(Boolean));
            setPhotoUrls(urls);
        });
    }, [announcementData?.length]);

    let randomScore = +(Math.random() * 4 + 1).toFixed(1);
    const handleClick = () => {
    }
    return (
        <Box m={'20px'} display={'flex'}>
            <div className={`${styles['defBlockAnn']}`} onClick={()=>navigate(CABINET+CREATE_ANNOUNCEMENT)}>Добавить+</div>
            {announcementData && announcementData.map((item, index) => {
                const currentPhotoUrl = photoUrls[index];
                return (
                    <Badge count={1}>
                        <div className={styles["item-card"]} onClick={()=>handleClickOpen(item.id)} key={index}
                             style={{
                                 width: '300px',
                                 height: '300px',
                                 margin: '10px'
                             }}
                        >
                            {currentPhotoUrl[0] ? (
                                <img
                                    src={'https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net' + currentPhotoUrl?.[0]}
                                    width={'100%'}
                                    height={'100%'}
                                    style={{objectFit: 'cover'}}
                                    alt={item.title || "Null"} className={styles["item-img"]}/>
                            ) : (
                                <Icons.ImgPlcHolder className={styles["item-img-placeholder"]}/>
                            )}
                            <div className={styles["item-info"]}>
                                <div className={styles["info-top"]}>{item.title || "Null"}</div>
                                <div className={styles["info-bottom"]}>
                                    <Score score={randomScore} className={styles["score"]}/>
                                    <div className={styles["price"]}>
                                        {`${item.price || ""} ${item.type || ""}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Badge>
                )
            })}

        </Box>
    );
};

export default Announcement;
