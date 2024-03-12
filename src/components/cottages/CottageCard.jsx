import { useState } from "react";
import StarRating from "../starRating/StarRating";
import styles from "./CottageCard.module.css";

//should limit the descr part for this card to avoid exessive overflow

export default function CottageCard() {
  const [userRating, setUserRating] = useState("");

  return (
    <div className={styles["cottage-wrapper"]}>
      <img
        src={require("../../assets/cottage_placeholder.png")}
        alt="cottage image placeholder"
        className={styles["cottage-img"]}
      />
      <div className={styles["cottage-inner-wrapper"]}>
        <div className={styles["cottage-upper-part"]}>
          <div className={styles["cottage-info"]}>
            <h4 className={styles["cottage-title"]}>Cottage in Kerhonkson</h4>

            <div className={styles["cottage-infobox"]}>
              <p>Адрес:</p>
              <p>Ташкент, Узбекистан</p>
            </div>

            <div className={styles["cottage-infobox"]}>
              <p>Описание:</p>
              <p>actual descr</p>
            </div>
          </div>

          <div className={styles["cottage-ratings"]}>
            <div className={styles["cottage-ratings-nums"]}>
              <StarRating onSetRating={setUserRating} />
              <p>2032 отзывов</p>
            </div>
            <div className={styles["cottage-rate"]}>4.1</div>
          </div>
        </div>

        <div className={styles["cottage-lower-part"]}>
          <div>tags</div>

          <div className={styles["cottage-prices"]}>
            <p>Цена:</p>
            <p>5 600 000 UZS</p>
            <p>за ночь</p>
          </div>
        </div>

        <button className={styles["cottage-btn"]}>Подробнее</button>
      </div>
    </div>
  );
}

function Tag({ content, color }) {}
