import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // Optional: Navigation Module CSS
import "swiper/css/pagination"; // Optional: Pagination Module CSS
import styles from "./SimilarItems.module.css";
import { Autoplay, FreeMode } from "swiper/modules";

const SimilarItems = ({ children }) => {
  return (
    <div className={styles["swiper-similar"]}>
      <Swiper
        modules={(Autoplay, FreeMode)}
        spaceBetween={16}
        grabCursor={true}
        a11y={true}
        freeMode={true}
        speed={3000}
        loop={true}
        slidesPerView={2}
        autoplay={{ delay: 500, disableOnInteraction: false }}
        style={{ transitionTimingFunction: "linear" }}
        breakpoints={{
          0: {
            spaceBetween: 30,
          },
          480: {
            spaceBetween: 30,
          },
          767: {
            spaceBetween: 40,
          },
          992: {
            spaceBetween: 40,
          },
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SimilarItems;
