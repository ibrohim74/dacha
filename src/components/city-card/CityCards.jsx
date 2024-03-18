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
          title={t("geolocation_request")}
          descr={t("geolocation_request_descr")}
          img={require("../../assets/geolocation_request.png")}
          weather={{ weatherDeg: "", weatherDescr: "" }}
        />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <CityCard
          title={t("city_card_city_bukhara")}
          descr={t("city_card_descr_bukhara")}
          img={require("../../assets/citycard-image.png")}
          weather={{ weatherDeg: 17, weatherDescr: "облачно" }}
        />
      </SwiperSlide>
      {/* <SwiperSlide>
        <CityCard
          title={t("city_card_city_samarkand")}
          descr={t("city_card_descr_samarkand")}
          img={require("../../assets/citycard-image.png")}
          weather={{ weatherDeg: 17, weatherDescr: "облачно" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <CityCard
          title={t("city_card_city_khiva")}
          descr={t("city_card_descr_khiva")}
          img={require("../../assets/citycard-image.png")}
          weather={{ weatherDeg: 17, weatherDescr: "облачно" }}
        />
      </SwiperSlide> */}
    </Swiper>
  );
}

function CityCard({ title, descr, img, weather }) {
  const { t } = useTranslation();
  const { weatherDeg, weatherDescr } = weather;

  return (
    <div className={styles["city-card"]}>
      <div className={styles["city-card-info"]}>
        <h4>{title}</h4>
        <p>{descr}</p>
      </div>
      <img src={img} alt="city-card" className={styles["city-card-img"]} />
      {weatherDeg && weatherDescr && (
        <div className={styles["city-card-weather-box"]}>
          <p>{t("weather")}</p>
          <div>
            {weatherDeg}&deg;
            {weatherDescr}
          </div>
        </div>
      )}
    </div>
  );
}
