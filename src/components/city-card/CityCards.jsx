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
import { UserLocationContext } from "../../context/UserLocation";
import { getWeather } from "../../helpers/getWeather";
import { findLocationRegion } from "../../helpers/findLocationRegion";

export default function CityCards() {
  const { t } = useTranslation();

  const { userLocation } = useContext(UserLocationContext);
  const location = localStorage.getItem("userLocation");

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
          location={location}
          img={require("../../assets/citycard-image.png")}
        />
      )}
    </>
  );
}

export function CityCard({ img, location }) {
  const { t } = useTranslation();

  const [temp, setTemp] = useState("");
  const [condition, setCondition] = useState("");

  const userLocation = JSON.parse(location);
  const { latitude, longitude } = userLocation;

  const region = findLocationRegion(latitude, longitude);

  getWeather(latitude, longitude)
    .then((weatherData) => {
      if (weatherData) {
        setTemp(weatherData.current.temp_c);
        setCondition(weatherData.current.condition.icon);
      } else {
        console.log("Failed to retrieve weather data");
      }
    })
    .catch((error) => console.error(error));

  return (
    <div className={styles["city-card"]}>
      <div className={styles["city-card-info"]}>
        <h4>{region.name}</h4>
        <p>{region.descr}</p>
      </div>
      <img src={img} alt="city-card" className={styles["city-card-img"]} />
      {temp && (
        <div className={styles["city-card-weather-box"]}>
          <p>{t("weather")}</p>
          <div className={styles["city-card-weather-info"]}>
            <p className={styles["city-card-weather-info-deg"]}>{temp}&deg;</p>
            <img src={condition} alt="weather-icon" />
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
      <button onClick={handleCityClick}>{t("choose")}</button>
    </div>
  );
};
