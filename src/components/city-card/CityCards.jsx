/* eslint-disable */

import React from "react";
import styles from "./CityCard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function CityCards() {
  return (
    <Swiper className={styles["swiper-layout"]} slidesPerGroup={1}>
      <SwiperSlide className={styles["swiper-slide"]}>
        <CityCard
          title="Бухара"
          descr="Бухара - древний узбекский город, через который проходил Великий шелковый путь (торговая дорога, соединявшая Восток и Запад). В средние века город был крупным центром исламской теологии и культуры."
        />
      </SwiperSlide>
      <SwiperSlide>
        <CityCard
          title="Самарканд"
          descr="Древний узбекский город, через который пролегал Великий шелковый путь."
        />
      </SwiperSlide>
      <SwiperSlide>
        <CityCard
          title="Хива"
          descr="Древний узбекский город, через который пролегал Великий шелковый путь."
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
