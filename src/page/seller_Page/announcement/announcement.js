import React, { useEffect, useState } from "react";
import {GetAnnouncementAPI, GetRequestAPI} from "./API/announcementAPI";
import { Box, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styles from "./assets/create_ann.module.css";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import AnnouncementItemPage from "./announcementItemPage";
import {
  ANNOUNCEMENT_ITEM_PAGE,
  CABINET,
  CREATE_ANNOUNCEMENT,
  PRODUCT_ROUTE,
} from "../../../processes/utils/consts";
import { Icons } from "../../../assets/icons/icons";
import Score from "../../../components/score/score";
import ItemCard from "../../../components/item-card/item-card";

const Announcement = () => {
  const [announcementData, setAnnouncementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [notification , setNotification] = useState([])
  const navigate = useNavigate();

  const handleClickOpen = (id) => {
    navigate(CABINET + "announcement_item_page/" + `${id}`);
  };

  useEffect(() => {
    // Announcement datani olish
    GetAnnouncementAPI().then((r) => {
      setAnnouncementData(r.data);
      setLoading(false); // Ma'lumotlar yuklandi keyingi bosqichga o'tamiz
    });

    // Notification datani olish
    GetRequestAPI().then(r =>{
      setNotification(r.data)
    })
  }, []); // useEffect faqat bir marta ishga tushirilsin, shuning uchun bo'sh massiv uzaytirilgan

  if (loading) {
    return <div>Loading...</div>; // Yoki yuklash belgisini chiqaramiz
  }

  return (
      <Box
          m={"20px"}
          display={"flex"}
          className={`${styles["container-md"]} ${styles["announcement-grid"]}`}
      >
        <div
            className={`${styles["defBlockAnn"]}`}
            onClick={() => navigate(CABINET + CREATE_ANNOUNCEMENT)}
        >
          Добавить+
        </div>
        {announcementData &&
            announcementData.map((item, index) => {
              // Notificationlarni filter qilish
              const filterReq = notification.filter(e => e.accommodation_id === item.id);
              console.log(filterReq);
              const itemWithRoute = {
                ...item,
                notifications: filterReq.length,
                route: `${CABINET + ANNOUNCEMENT_ITEM_PAGE}`,
              };
              return <ItemCard {...itemWithRoute} key={index}/>;
            })}
      </Box>
  );
};

export default Announcement;

