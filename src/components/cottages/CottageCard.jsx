import { useState } from "react";
import StarRating from "../starRating/StarRating";
import styles from "./CottageCard.module.css";
import Tag from "../Tag/Tag";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../processes/utils/consts";

export default function CottageCard({ cottage }) {
  const [userRating, setUserRating] = useState("");

  const {
    id,
    info,
    reviews_number,
    rating,
    photos_path,
    tags,
    price,
    title,
    price_type,
    location_name,
  } = cottage;

  const navigate = useNavigate();
  const handleCottageClick = () => {
    const path = PRODUCT_ROUTE.replace(":id", id);
    navigate(path);
  };

  return (
    <div className={styles["cottage-wrapper"]} onClick={handleCottageClick}>
      <img
        src={
          photos_path.lenght
            ? photos_path
            : require("../../assets/cottage_placeholder.png")
        }
        alt="cottage image placeholder"
        className={styles["cottage-img"]}
      />
      <div className={styles["cottage-inner-wrapper"]}>
        <div className={styles["cottage-upper-part"]}>
          <div className={styles["cottage-info"]}>
            <h4 className={styles["cottage-title"]}>{title}</h4>

            <div className={styles["cottage-infobox"]}>
              <p>Адрес:</p>
              <p>{location_name}</p>
            </div>

            <div className={styles["cottage-infobox"]}>
              <p>Описание:</p>
              <p>{info}</p>
            </div>
          </div>

          <div className={styles["cottage-ratings"]}>
            <div className={styles["cottage-ratings-nums"]}>
              <StarRating onSetRating={setUserRating} />
              <p>{reviews_number}</p>
            </div>
            <div className={styles["cottage-rate"]}>{rating.toFixed(1)}</div>
          </div>
        </div>

        <div className={styles["cottage-lower-part"]}>
          <Tag content="resort" />

          <div className={styles["cottage-prices"]}>
            <p>Цена:</p>
            <p>{price} UZS</p>
            <p>{price_type}</p>
            <button
              className={styles["cottage-btn"]}
              onClick={handleCottageClick}
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
