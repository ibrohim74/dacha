import React, { useEffect, useState } from "react";
import { GetAnnouncementAPI } from "./API/announcementAPI";
import { Box, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styles from "./assets/create_ann.module.css";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import AnnouncementItemPage from "./component/announcementItemPage";
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
  const [loading, setLoading] = useState(true); // Add this line
  const [photoUrls, setPhotoUrls] = useState([]); // Fayl yo'l(lar)ni saqlash uchun yangi state
  const navigate = useNavigate();

  const handleClickOpen = (id) => {
    navigate(CABINET + "announcement_item_page/" + `${id}`);
  };

  useEffect(() => {
    GetAnnouncementAPI().then((r) => {
      setAnnouncementData(r.data);
      setLoading(false); // Set loading to false after data has loaded
    });
  }, [announcementData?.length]);

  if (loading) {
    return <div>Loading...</div>; // Or some loading spinner
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
          const currentPhotoUrl = photoUrls[index];
          let randomNotifications = +Math.floor(Math.random() * 13) + 1;
          const itemWithRoute = {
            ...item,
            notifications: randomNotifications,
            route: `${CABINET + ANNOUNCEMENT_ITEM_PAGE}`,
          };
          return <ItemCard {...itemWithRoute} />;
        })}
    </Box>
  );
};

export default Announcement;
