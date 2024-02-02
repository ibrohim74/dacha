import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./item-card.module.css";
import { Icons } from "../../assets/icons/icons";
import Score from "../score/score";
import { PRODUCT_ROUTE } from "../../processes/utils/consts";

const ItemCard = (props) => {
  // score function is not implemented yet so we have to use random scores for now
  let randomScore = +(Math.random() * 4 + 1).toFixed(1);

  // Use the useHistory hook here
  const navigate = useNavigate();

  // Function to handle click event
  const handleClick = () => {
    // Replace :id with the actual id from the props
    const path = PRODUCT_ROUTE.replace(":id", props.id);
    navigate(path);
  };

  return (
    <div className={styles["item-card"]} onClick={handleClick}>
      <Icons.ImgPlcHolder />
      <div className={styles["item-info"]}>
        <div className={styles["info-top"]}>{props.title || "Null"}</div>
        <div className={styles["info-bottom"]}>
          {/* <Score score={props.score} className={styles["score"]} /> */}
          <Score score={randomScore} className={styles["score"]} />
          <div className={styles["price"]}>
            {/* {`$`}
            {props.price || "Null"} */}
            {`${props.price || ""} ${props.type || ""}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
