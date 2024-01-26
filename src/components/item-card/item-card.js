import React from "react";
import styles from "./item-card.module.css";
import { Icons } from "../../assets/icons/icons";
import Score from "../score/score";

const ItemCard = (props) => {
  return (
    <div className={styles["item-card"]}>
      <Icons.ImgPlcHolder />
      <div className={styles["item-info"]}>
        <div className={styles["info-top"]}>{props.name || "Null"}</div>
        <div className={styles["info-bottom"]}>
          <Score score={props.score} className={styles["score"]} />
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
