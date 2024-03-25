import React, { useState } from "react";
import { Icons } from "../../assets/icons/icons";


const ImageSlider = ({ slides , className, styles }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className={`${styles["slider"]} ${className}`}>
      <div
        className={`${styles["arrow-hitbox"]} ${styles["left"]}`}
        onClick={prevSlide}
      >
        <Icons.ChevronL className={styles["left-arrow"]} />
      </div>
      <div
        className={`${styles["arrow-hitbox"]} ${styles["right"]}`}
        onClick={nextSlide}
      >
        <Icons.ChevronR className={styles["right-arrow"]} />
      </div>
      {slides && slides?.map((slide, index) => {
        return (
          <div
            className={styles[index === current ? "slide active" : "slide"]}
            key={index}
          >
            {index === current && (
              <img
                src={'https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api'+slide}
                alt="travel image"
                className={styles["image"]}
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
