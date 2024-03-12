import React, { useState } from "react";
import styles from "./Filter.module.css";
import { Icons } from "../../assets/icons/icons";
import { LocationOnOutlined } from "@mui/icons-material";
import Button from "../Button/Button";
import { Slider } from "antd";

export default function Filter() {
  const [minVal, setMinVal] = useState("25,000");
  const [maxVal, setMaxVal] = useState("500,000");
  const [activeTab, setActiveTab] = useState("hotels");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRangeChange = () => {
    setMinVal(minVal);
    setMaxVal(maxVal);
  };

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-wrapper"]}>
        {/* search input */}
        <div className={styles["filter-item-location-box"]}>
          <input
            type="text"
            className={styles["filter-location-input"]}
            placeholder="Искать на карте"
          />
          <div className={styles["filter-location-output"]}>
            <LocationOnOutlined />
            Location
          </div>
        </div>

        {/* tabs: hotels / cottages */}
        <ul className={styles["filter-tabs"]}>
          <li
            className={
              activeTab === "hotels"
                ? styles["filter-tab-active"]
                : styles["filter-tab-inactive"]
            }
            onClick={() => handleTabClick("hotels")}
          >
            Отели
          </li>
          <li
            className={
              activeTab === "cottages"
                ? styles["filter-tab-active"]
                : styles["filter-tab-inactive"]
            }
            onClick={() => handleTabClick("cottages")}
          >
            Дачи
          </li>
        </ul>

        {/* price range */}

        <div className={styles["filter-item-box"]}>
          <label htmlFor="priceRange">Цена</label>
          <div className={styles["filter-range"]}>
            <FilterBox>{minVal}</FilterBox>
            <Slider
              range
              min={minVal}
              max={maxVal}
              defaultValue={[minVal, maxVal]}
              className={styles["filter-range-slider"]}
              onChange={handleRangeChange}
              tooltip={{ formatter: null }}
            />
            <FilterBox>{maxVal}</FilterBox>
          </div>
        </div>

        {/* rating boxes */}
        <div className={styles["filter-item-box"]}>
          <label htmlFor="">Звездный рейтинг</label>
          <div className={styles["boxes-wrapper"]}>
            <FilterBox>
              <Icons.Star /> <span>1</span>
            </FilterBox>
            <FilterBox>
              <Icons.Star /> <span>2</span>
            </FilterBox>
            <FilterBox>
              <Icons.Star /> <span>3</span>
            </FilterBox>
            <FilterBox>
              <Icons.Star /> <span>5</span>
            </FilterBox>
            <FilterBox>
              <Icons.Star /> <span>5</span>
            </FilterBox>
          </div>
        </div>

        {/* utilities */}
        <div className={styles["filter-item-box"]}>
          <label htmlFor="">Удобства</label>
          <div className={styles["boxes-wrapper"]}>
            <FilterBox> Парковка</FilterBox>
            <FilterBox>Wi-Fi</FilterBox>
          </div>
        </div>

        {/* distance */}
        <div className={styles["filter-item-box"]}>
          <label htmlFor="">Расстояние до центра</label>
          <div className={styles["boxes-wrapper"]}>
            <FilterBox> &lt;5км</FilterBox>
            <FilterBox>&lt;10км</FilterBox>
            <FilterBox>&lt;15км</FilterBox>
          </div>
        </div>
      </div>
      {/* clear all button */}
      <Button type="full-width-gray">Очистить все</Button>
    </div>
  );
}

function FilterBox({ children }) {
  return <div className={styles["filter-box"]}>{children}</div>;
}
