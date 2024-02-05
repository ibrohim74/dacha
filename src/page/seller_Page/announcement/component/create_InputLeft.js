import React, { useEffect, useRef, useState, memo } from "react";
import { Button, Input, message, Select, Upload } from "antd";
import styles from "../assets/create_ann.module.css";
import "@splidejs/react-splide/css";
import TextArea from "antd/es/input/TextArea";
import Header_adminPage from "../../../../components/header_adminPage";
import MapsAnnouncement from "./mapsAnnouncement";

const CreateInputLeft = (props) => {
  const { inputLeft, setInputLeft } = props;
  const [selectPosition, setSelectPosition] = useState(null);
  const { Option } = Select;
  useEffect(() => {
    setInputLeft({
      ...inputLeft,
      display_name: selectPosition?.display_name,
      latitude: parseFloat(selectPosition?.lat),
      longitude: parseFloat(selectPosition?.lon),
      type: inputLeft?.type ? inputLeft.type : "UZS",
    });
  }, [selectPosition]);

  const priceType = (val) => {
    setInputLeft({ ...inputLeft, type: val });
  };

  const selectAfter = (
    <Select defaultValue="UZS" onChange={priceType}>
      <Option value="UZS">UZS</Option>
      <Option value="Y.E">Y.E</Option>
    </Select>
  );
  return (
    <div className={styles["calendar-input"]}>
      <div className={styles["input"]}>
        {/* <label htmlFor="name">Укажите название*</label> */}
        <Input
          placeholder={"Название*"}
          size={"large"}
          onChange={(e) =>
            setInputLeft({ ...inputLeft, title: e.target.value })
          }
        />
      </div>
      <div className={styles["input"]}>
        {/* <label htmlFor="name">Описание*</label> */}
        <TextArea
          value={inputLeft?.info}
          onChange={(e) => setInputLeft({ ...inputLeft, info: e.target.value })}
          placeholder="Подумайте, какие подробности вы хотели бы узнать из объявления. И добавьте их в описание*"
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
        />
      </div>
      <div className={styles["input"]}>
        {/* <label htmlFor="price">цена*</label> */}
        <Input
          placeholder="Цена*"
          addonAfter={selectAfter}
          value={inputLeft?.price
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          type={"text"}
          onChange={(e) => {
            const cleanedValue = e.target.value.replace(/\s/g, "");
            setInputLeft({
              ...inputLeft,
              price: cleanedValue !== "" ? parseInt(cleanedValue) : 0,
            });
          }}
          onBlur={() => {
            if (!inputLeft.price || isNaN(inputLeft.price)) {
              setInputLeft({
                ...inputLeft,
                price: 0,
              });
            }
          }}
        />
      </div>
      <div className={styles["input"]}>
        <MapsAnnouncement
          setSelectPosition={setSelectPosition}
          selectPosition={selectPosition}
        />
      </div>
    </div>
  );
};

export default memo(CreateInputLeft);
