import React, { useState } from "react";
import styles from "./Filter.module.css";
import { Icons } from "../../assets/icons/icons";
import { LocationOnOutlined } from "@mui/icons-material";
import Button from "../Button/Button";
import { Slider } from "antd";
import { useTranslation } from "react-i18next";

export default function Filter() {
  const [rangeValues, setRangeValues] = useState([25000, 500000]);
  const [activeTab, setActiveTab] = useState("hotels");
  const { t } = useTranslation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRangeChange = (values) => {
    setRangeValues(values);
  };

  const numberFormatter = (value) => {
    // Function to format numbers for display
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add spaces every 3 digits
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
            <FilterBox>{numberFormatter(rangeValues[0])}</FilterBox>
            <Slider
              range
              min={25000}
              max={500000}
              defaultValue={rangeValues}
              className={styles["filter-range-slider"]}
              onChange={handleRangeChange}
              tooltip={{ formatter: null }}
            />
            <FilterBox>{numberFormatter(rangeValues[1])}</FilterBox>
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
  return (
    <div className={styles["filter-box"]}>
      <span>{children}</span>
    </div>
  );
}
