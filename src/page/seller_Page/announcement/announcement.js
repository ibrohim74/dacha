import React, { useEffect, useState } from "react";
import { GetAnnouncementAPI } from "./API/announcementAPI";
import { Box, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styles from "./assets/create_ann.moule.css";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ANNOUNCEMENT_ITEM_PAGE,
  CABINET,
} from "../../../processes/utils/consts";

const Announcement = () => {
  const [announcementData, setAnnouncementData] = useState(null);
  const [photoUrls, setPhotoUrls] = useState([]); // Fayl yo'l(lar)ni saqlash uchun yangi state
  const navigate = useNavigate();

  const handleClickOpen = (id) => {
    navigate(CABINET + "announcement_item_page/" + `${id}`);
  };

  useEffect(() => {
    GetAnnouncementAPI().then((r) => {
      setAnnouncementData(r);
      const urls = r?.map((item) =>
        item?.photos_path.split("\n").filter(Boolean)
      );
      setPhotoUrls(urls);
    });
  }, [announcementData?.length]);
  console.log(photoUrls);
  return (
    <Box m={"20px"}>
      {/* <Header_adminPage title={"Announcement"} subtitle={"all announcement"} /> */}
      <div className={styles["ann-box"]}>
        {announcementData &&
          announcementData.map((item, index) => {
            const currentPhotoUrl = photoUrls[index];

            return (
              <div className={styles["ann-box-item"]} key={item.id}>
                {currentPhotoUrl[0] ? (
                  <div
                    className={styles["ann-box-photo"]}
                    style={{ border: "none" }}
                  >
                    <img
                      src={
                        "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net" +
                        currentPhotoUrl?.[0]
                      }
                      alt=""
                      width={"100%"}
                      height={"100%"}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div className={styles["ann-box-photo"]}>
                    <h3 style={{ margin: "0" }}>Add photo</h3>
                    <AddCircleOutlineIcon style={{ marginTop: "5px" }} />
                  </div>
                )}

                <div className={styles["ann-box-info"]}>
                  <div className={styles["ann-item-title"]}>
                    <h1>{item?.title}</h1>
                    <p style={{ color: "gray", fontSize: "20px" }}>
                      {item?.info}
                    </p>
                  </div>
                  <div className={styles["ann-box-footer"]}>
                    <Box alignItems={"center"} display={"flex"}>
                      <Badge count={3} showZero size={"small"}>
                        <NotificationsIcon
                          style={{ margin: "0 5px 0 0", color: "white" }}
                        />
                      </Badge>
                      <Button
                        type={"button"}
                        color="secondary"
                        variant="contained"
                        onClick={() => handleClickOpen(item.id)}
                      >
                        Open
                      </Button>
                    </Box>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Box>
  );
};

export default Announcement;
