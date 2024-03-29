import { useState } from "react";
import StarRating from "../starRating/StarRating";
import styles from "./CottageCard.module.css";
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
    <div className={styles["cottage-wrapper"]}>
      <div className={styles["cottage-img"]} onClick={handleCottageClick}>
        <img
          src={
            photos_path.length
              ? photos_path
              : require("../../assets/cottage_placeholder.png")
          }
          alt="cottage image placeholder"
        />
      </div>
      <div className={styles["cottage-inner-wrapper"]}>
        <div className={styles["cottage-upper-part"]}>
          <div className={styles["cottage-info"]}>
            <h4 className={styles["cottage-title"]}>{title}</h4>

            <div className={styles["cottage-infobox"]}>
              <p>{location_name}</p>
              <p>{info}</p>
            </div>
          </div>

          <div className={styles["cottage-ratings"]}>
            <StarRating onSetRating={setUserRating} />
            <div className={styles["cottage-rate"]}>{rating.toFixed(1)}</div>
            <p>{reviews_number} отзывов</p>
          </div>
        </div>

        <div className={styles["cottage-lower-part"]}>
          <div className={styles["cottage-prices"]}>
            <p className={styles["cottage-price-type"]}>{price_type}</p>
            <p>{price} UZS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
