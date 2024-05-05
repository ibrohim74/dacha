/* eslint-disable */

import React, { useContext, useEffect, useState } from "react";
import styles from "./CityCard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import { Navigation } from "swiper/modules";
import { citiesData } from "./citiesDatabase";
import { ABOUT_CITY } from "../../processes/utils/consts";
import { useNavigate } from "react-router-dom";
import { isEmptyObject } from "../../helpers/isEmptyObj";
import { UserLocationContext } from "../../context/UserLocation";

export default function CityCards() {
  const { t } = useTranslation();

  const { userLocation } = useContext(UserLocationContext);
  const location = localStorage.getItem("userLocation");

  // console.log(userLocation);
  // console.log(location);

  return (
    <>
      {!location && (
        <div className={styles["cities-wrapper"]}>
          <Swiper
            slidesPerGroup={2.8}
            slidesPerView={2.8}
            loop={false}
            centeredSlides={false}
            loopFillGroupWithBlank={true}
            modules={[Navigation]}
            rewind={true}
            navigation
            spaceBetween={18}
          >
            {citiesData.map((city) => (
              <SwiperSlide key={city.name + Math.random()}>
                <PreviewCityCard city={city} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {location && (
        <CityCard
          title={t("city_card_city_bukhara")}
          descr={t("city_card_descr_bukhara")}
          img={require("../../assets/citycard-image.png")}
          weather={{ weatherDeg: 17, weatherDescr: "облачно" }}
        />
      )}
    </>
    // <CityCard
    //   title={t("geolocation_request")}
    //   descr={t("geolocation_request_descr")}
    //   img={require("../../assets/geolocation_request.png")}
    //   weather={{ weatherDeg: "", weatherDescr: "" }}
    // />
  );
}

export function CityCard({ title, descr, img, weather }) {
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

const PreviewCityCard = ({ city }) => {
  const { id, name, img, latitude, longitude } = city;
  const navigate = useNavigate();

  const handleCityClick = () => {
    const route = ABOUT_CITY.replace(":id", id);
    navigate(route);
  };

  return (
    <div className={styles["preview-city-card"]}>
      <span>{name}</span>
      <img alt={name} src={img[0].imgPath} />
      <button onClick={handleCityClick}>Выбрать</button>
    </div>
  );
};
