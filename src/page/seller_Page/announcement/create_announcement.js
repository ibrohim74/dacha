import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Create_InputLeft from "./component/create_InputLeft";
import styles from "./assets/create_ann.module.css";
import { Input, message } from "antd";
import Header_adminPage from "../../../components/header_adminPage";
import { jwtDecode } from "jwt-decode";
import { CreateAnnouncementAPI } from "./API/announcementAPI";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ANNOUNCEMENT, CABINET } from "../../../processes/utils/consts";

const CreateAnnouncement = () => {
  const [inputLeft, setInputLeft] = useState(null);
  const [initialState, setInitialState] = useState({
    type: "dacha",
    tags: "string",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const JWT = jwtDecode(localStorage.getItem("token"));
  const handleSend = () => {
    setLoading(true);
    if (initialState.title && initialState.info && initialState.price) {
      if (initialState.location_name) {
        if (
          initialState.floors &&
          initialState.area &&
          initialState.rooms_number &&
          initialState.minimum_book_days &&
          initialState.minimum_preorder_days
        ) {
          CreateAnnouncementAPI(initialState).then((r) => {
            console.log(r)
            setLoading(false);
            if (r?.status === 200) {
              message.success("success");
              navigate(CABINET + ANNOUNCEMENT);
            } else {
              if (r?.response?.status === 401) {
                // localStorage.clear();
                // window.location.assign("/");
              } else {
                message.error("error send data");
              }
            }
          });
        } else {
          message.error("barcha malumotlarni toldiring");
          setLoading(false);
        }
      } else {
        message.error("qidiruv tugmasi orqali kerakli joyni qidirib tanlang");
        setLoading(false);
      }
    } else {
      message.error("barcha malumotlarni toldiring");
      setLoading(false);
    }
  };
  console.log(initialState);

  useEffect(() => {
    setInitialState({
      ...initialState,
      user_id: JWT.userId,
      title: inputLeft?.title,
      location_name: inputLeft?.display_name,
      longitude: inputLeft?.longitude,
      latitude: inputLeft?.latitude,
      info: inputLeft?.info,
      price_type: inputLeft?.price_type,
      price: inputLeft?.price,
    });
  }, [inputLeft]);
  return (
    <Box m={"20px"} className={styles["container-md"]}>
      {/* <Header_adminPage title="Create" subtitle="Create announcement" /> */}
      <div className={styles["create-calendar-box"]}>
        <Create_InputLeft inputLeft={inputLeft} setInputLeft={setInputLeft} />
        <div className={styles["calendar-map"]}>
          <div className={styles["box-2-input"]}>
            <div
              className={`${styles["input-2-row"]} ${styles["input"]}`}
              style={{ marginTop: "10px" }}
            >
              {/* <label htmlFor="floor">Этажность</label> */}
              <Input
                placeholder={"Этажность"}
                size={"large"}
                type={"number"}
                onChange={(e) =>
                  setInitialState({ ...initialState, floors: e.target.value })
                }
              />
            </div>
            <div
              className={`${styles["input-2-row"]} ${styles["input"]}`}
              style={{ marginTop: "10px" }}
            >
              {/* <label htmlFor="area">Площадь</label> */}
              <Input
                placeholder={"Площадь"}
                size={"large"}
                type={"number"}
                onChange={(e) =>
                  setInitialState({ ...initialState, area: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles["input"]} style={{ marginTop: "10px" }}>
            {/* <label htmlFor="phone">количество комнат</label> */}
            <Input
              placeholder="Количество комнат"
              type={"number"}
              onChange={(e) =>
                setInitialState({
                  ...initialState,
                  rooms_number: e.target.value,
                })
              }
            />
          </div>
          <div className={styles["input"]} style={{ marginTop: "10px" }}>
            {/* <label htmlFor="phone">minimum_book_days</label> */}
            <Input
              placeholder="Минимальное количество дней бронирования"
              type={"number"}
              onChange={(e) =>
                setInitialState({
                  ...initialState,
                  minimum_book_days: e.target.value,
                })
              }
            />
          </div>
          <div className={styles["input"]} style={{ marginTop: "10px" }}>
            {/* <label htmlFor="phone">minimum_preorder_days</label> */}
            <Input
              placeholder="Минимальное количество дней предзаказа"
              type={"number"}
              onChange={(e) =>
                setInitialState({
                  ...initialState,
                  minimum_preorder_days: e.target.value,
                })
              }
            />
          </div>
          {loading ? (
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size={"large"}
              style={{ width: "100%", marginTop: "20px" }}
              disabled={true}
            >
              <LoadingOutlined />
            </Button>
          ) : (
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size={"large"}
              style={{ width: "100%", backgroundColor: "#505050" }}
              onClick={handleSend}
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default CreateAnnouncement;
