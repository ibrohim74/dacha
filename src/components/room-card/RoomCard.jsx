import React from "react";
import styles from "./RoomCard.module.css";
import Button from "../Button/Button";

import { useTranslation } from "react-i18next";
import Form from "../form/Form";
import AccordionItem from "../accordion-item/AccordionItem";

export default function RoomCard({ location }) {
  //   const {rooms, } = location;

  return (
    <div className={styles["room-card"]}>
      <div className={styles["room-card-details"]}>
        <div className={styles["room-card-image"]}>
          <img
            src={require("../../assets/no-photos-placeholder.png")}
            alt="room-image"
          />
        </div>

        <div className={styles["room-card-details-overview"]}>
          <div className={styles["room-card-info"]}>
            <p className={styles["room-card-amount"]}>2 rooms</p>
            <p className={styles["room-card-type"]}>Standart double room</p>
          </div>

          <div className={styles["room-card-price"]}>
            <p>Per day</p>
            <span>3.600.000 som</span>
          </div>
        </div>
      </div>

      <div className={styles["room-accordion"]}>
        <AccordionItem title="Смотреть удобства" content="Lorem ipsum" />
      </div>

      <div className={styles["room-card-form"]}>
        <Form type="roomPicker" />
      </div>
    </div>
  );
}
