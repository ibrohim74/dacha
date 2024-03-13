/* eslint-disable */

import React from "react";
import styles from "./CityCard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

export default function CityCards() {
  const { t } = useTranslation();
  return (
    <Swiper className={styles["swiper-layout"]} slidesPerGroup={1}>
      <SwiperSlide className={styles["swiper-slide"]}>
        <CityCard
          title={t("city_card_city_bukhara")}
          descr={t("city_card_descr_bukhara")}
        />
      </SwiperSlide>
      <SwiperSlide>
        <CityCard
          title={t("city_card_city_samarkand")}
          descr={t("city_card_descr_samarkand")}
        />
      </SwiperSlide>
      <SwiperSlide>
        <CityCard
          title={t("city_card_city_khiva")}
          descr={t("city_card_descr_khiva")}
        />
      </SwiperSlide>
    </Swiper>
  );
}

function CityCard({ title, descr }) {
  return (
    <div className={styles["city-card"]}>
      <div className={styles["city-card-info"]}>
        <h4>{title}</h4>
        <p>{descr}</p>
      </div>
      <img
        src={require("../../assets/citycard-image.png")}
        alt="city-card"
        className={styles["city-card-img"]}
      />
      {/* <div className={styles["city-card-weather-box"]}>{weather}&deg;</div> */}
    </div>
  );
}
