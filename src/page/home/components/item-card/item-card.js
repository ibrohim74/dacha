import React from "react";
import styles from "./item-card.module.css";
import { Icons } from "../../../../assets/css/icons/icons";

const ItemCard = (props) => {
  const score = props.score;
  const fullStars = Math.floor(score);
  const halfStars = score % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const renderStars = (Icon, count) => {
    return Array(count)
      .fill(null)
      .map((_, i) => <Icon key={i} />);
  };

  return (
    <div className={styles["item-card"]}>
      <Icons.ImgPlcHolder />
      <div className={styles["item-info"]}>
        <div className={styles["info-top"]}>{props.name || "Null"}</div>
        <div className={styles["info-bottom"]}>
          <div className={styles["score"]}>
            {renderStars(Icons.StarFull, fullStars)}
            {renderStars(Icons.StarHalf, halfStars)}
            {renderStars(Icons.StarEmpty, emptyStars)}
          </div>
          <div className={styles["price"]}>
            {`$`}
            {props.price || "Null"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
