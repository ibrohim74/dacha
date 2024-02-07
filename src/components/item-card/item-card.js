import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./item-card.module.css";
import { Icons } from "../../assets/icons/icons";
import Score from "../score/score";
import { PRODUCT_ROUTE } from "../../processes/utils/consts";

const ItemCard = (props) => {
  let route = props.route ? props.route : PRODUCT_ROUTE;
  let randomScore = +(Math.random() * 4 + 1).toFixed(1);
  const [itemImgs, setItemImgs] = useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    const path = route.replace(":id", props.id);
    navigate(path);
  };

  useEffect(() => {
    const images = props?.photos_path?.split("\n").filter(Boolean);
    setItemImgs(images);
  }, [props.photos_path]);

  return (
    <>
      <div className={styles["item-card"]} onClick={handleClick}>
        {props.notifications > 0 && (
          <div className={styles["notification-badge"]}>
            {props.notifications > 9 ? "9+" : props.notifications}
          </div>
        )}
        {itemImgs?.length > 0 ? (
          <img
            src={
              "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net" +
              itemImgs[0]
            }
            width={"100%"}
            height={"100%"}
            // style={{ objectFit: "cover" }}
            alt={props.title || "Null"}
            className={styles["item-img"]}
          />
        ) : (
          <Icons.ImgPlcHolder className={styles["item-img-placeholder"]} />
        )}
        <div className={styles["item-info"]}>
          <div className={styles["info-top"]}>{props.title || "Null"}</div>
          <div className={styles["info-bottom"]}>
            <Score score={randomScore} className={styles["score"]} />
            <div className={styles["price"]}>
              {`${props.price || ""} ${props.type || ""}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
