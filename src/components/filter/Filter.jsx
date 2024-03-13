import React, { useState } from "react";
import styles from "./Filter.module.css";
import { Icons } from "../../assets/icons/icons";
import { LocationOnOutlined } from "@mui/icons-material";
import Button from "../button/Button";
import { Slider } from "antd";
import { useTranslation } from "react-i18next";

export default function Filter() {
  const [minVal, setMinVal] = useState("25,000");
  const [maxVal, setMaxVal] = useState("500,000");
  const [activeTab, setActiveTab] = useState("hotels");
  const { t } = useTranslation();

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
        <div className={styles["filter-item-location-box"]}>
          <input
            type="text"
            className={styles["filter-location-input"]}
            placeholder={t("filter_search_placeholder")}
          />
          <div className={styles["filter-location-output"]}>
            <LocationOnOutlined />
            Location
          </div>
        </div>

        <ul className={styles["filter-tabs"]}>
          <li
            className={
              activeTab === "hotels"
                ? styles["filter-tab-active"]
                : styles["filter-tab-inactive"]
            }
            onClick={() => handleTabClick("hotels")}
          >
            {t("hotels_title")}
          </li>
          <li
            className={
              activeTab === "cottages"
                ? styles["filter-tab-active"]
                : styles["filter-tab-inactive"]
            }
            onClick={() => handleTabClick("cottages")}
          >
            {t("cottages_title")}
          </li>
        </ul>

        <div className={styles["filter-item-box"]}>
          <label htmlFor="priceRange">{t("filter_price")}</label>
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

        <div className={styles["filter-item-box"]}>
          <label htmlFor="">{t("filter_rating")}</label>
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

        <div className={styles["filter-item-box"]}>
          <label htmlFor="">{t("filter_services")}</label>
          <div className={styles["boxes-wrapper"]}>
            <FilterBox>{t("filter_services_parking")}</FilterBox>
            <FilterBox>Wi-Fi</FilterBox>
          </div>
        </div>

        <div className={styles["filter-item-box"]}>
          <label htmlFor="">{t("filter_distance")}</label>
          <div className={styles["boxes-wrapper"]}>
            <FilterBox> &lt;5{t("km")}</FilterBox>
            <FilterBox>&lt;10{t("km")}</FilterBox>
            <FilterBox>&lt;15{t("km")}</FilterBox>
          </div>
        </div>
      </div>
      <Button type="full-width-gray">{t("filter_clear_btn")}</Button>
    </div>
  );
}

function FilterBox({ children }) {
  return <div className={styles["filter-box"]}>{children}</div>;
}
