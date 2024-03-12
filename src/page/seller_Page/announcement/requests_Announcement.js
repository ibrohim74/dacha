import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styles from "./assets/request.module.css";
import { Icons } from "../../../assets/icons/icons";
import { $authHost } from "../../../processes/http/http";
import {
  AcceptRequestAPI,
  DenyRequestAPI,
  GetAnnouncementAPI,
  GetRequestAPI,
} from "./API/announcementAPI";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";

const RequestsAnnouncement = () => {
  const [requests, setRequests] = useState([]);
  const [dacha, setDacha] = useState([]);
  const [client, setClient] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("ru-RU", options);
    return formattedDate;
  };

  const acceptRequest = (id) => {
    AcceptRequestAPI(id).then((r) => {
      if (r?.status === 200) {
        message.success("success");
        window.location.reload();
      }
    });
  };

  const denyRequest = (id) => {
    DenyRequestAPI(id).then((r) => {
      if (r?.status === 200) {
        message.success("success");
        window.location.reload();
      }
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    const requestResponse = await GetRequestAPI();
    const announcementResponse = await GetAnnouncementAPI();
    if (
        requestResponse?.status === 200 &&
        requestResponse?.data?.length !== 0
    ) {
      setRequests(requestResponse?.data);
      setIsLoading(false);
    }

    if (
        announcementResponse?.status === 200 &&
        announcementResponse?.data?.length !== 0
    ) {
      setDacha(announcementResponse.data);
      const images = announcementResponse.data.map((item) =>
          item?.photos_path?.split("\n").filter(Boolean)
      );
      setPhotoUrls(images);
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
      } catch (e) {
        console.log(e);
      }
    };
    sellerBooking();
  }, []);

  const getClient = async () => {
    for (const item of requests) {
      try {
        const res = await $authHost.get("user/" + item.customer_id);
        setClient((prevState) => [...prevState, res.data]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
      getClient();

  }, [requests]);

  return (
    <Box className={styles["containerReq"]}>
      {requests?.length >= 0 &&
        requests.map((item) =>{return(<div key={item.id}>
              {dacha.map((dachaItem, index) => {
                console.log(dachaItem)
                if (item.accommodation_id === dachaItem.id) {
                                                                                                                             
                  const currentPhotoUrl = photoUrls[index];
                  const currentClient = client.find(
                      (clientItem) => clientItem.id === item.customer_id
                  );
                  return (
                      <div key={dachaItem.id} className={styles["requestItem"]}>
                        <div className={styles["req_start"]}>
                          <div className={styles["imgReq"]}>
                            {currentPhotoUrl?.length > 0 ? (
                                <img
                                    src={
                                        "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net" +
                                        currentPhotoUrl[0]
                                    }
                                    alt=""
                                    width={"100%"}
                                    height={"100%"}
                                    className={styles["item-img"]}
                                />
                            ) : (
                                <Icons.ImgPlcHolder
                                    className={styles["item-img-placeholder"]}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            )}
                          </div>
                          <div className={styles.req_start__text}>
                            <h1>{currentClient?.username}</h1>
                            <p>Бронировал(а)</p>
                          </div>
                        </div>
                        <div className={styles["req_center"]}>
                          <div className={styles["req_center__text"]}>
                            <h1>{dachaItem?.title}</h1>
                            <p>
                              С {formatDate(item?.start_day)} - до{" "}
                              {formatDate(item?.end_day)}{" "}
                            </p>
                          </div>
                          {item.request_id} asd
                        </div>
                        <div className={styles["req_footer"]}>
                          <div
                              className={styles["requestAccept"]}
                              onClick={() => acceptRequest(item?.request_id)}
                          >
                            <Icons.AcceptIcon />
                          </div>
                          <div
                              className={styles["requestDeny"]}
                              onClick={() => denyRequest(item?.request_id)}
                          >
                            <Icons.DenyIcon />
                          </div>
                        </div>
                      </div>
                  );
                }
                return null;
              })}
            </div>
        )})}

      {!requests?.length && <p>Malumot yo'q</p>}
    </Box>
  );
};

export default RequestsAnnouncement;
