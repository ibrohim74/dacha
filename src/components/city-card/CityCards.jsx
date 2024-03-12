/* eslint-disable */

import React from "react";
import styles from "./CityCard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function CityCards() {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      className="mySwiper"
      slidesPerGroup={1}
    >
      <SwiperSlide className={styles["swiper-slide"]}>
        <CityCard
          title="Бухара"
          descr="Древний узбекский город, через который пролегал Великий шелковый путь."
          weather="17"
        />
      </SwiperSlide>
      <SwiperSlide>
        <CityCard
          title="Самарканд"
          descr="Древний узбекский город, через который пролегал Великий шелковый путь."
          weather="18"
        />
      </SwiperSlide>
      <SwiperSlide>
        <CityCard
          title="Хива"
          descr="Древний узбекский город, через который пролегал Великий шелковый путь."
          weather="24"
        />
      </SwiperSlide>
    </Swiper>
  );
}

function CityCard({ title, descr, weather }) {
  return (
    <div className={styles["city-card"]}>
      <img
        src={require("../../assets/city-card-img.png")}
        alt="city-card"
        className={styles["city-card-img"]}
      />
      <div className={styles["city-card-info"]}>
        <h4>{title}</h4>
        <p>{descr}</p>
      </div>
      <div className={styles["city-card-weather-box"]}>{weather}&deg;</div>
    </div>
  );
}
