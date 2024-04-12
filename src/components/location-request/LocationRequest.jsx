import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import styles from "./LocationRequest.module.css";
import useUserLocation from "../../hooks/useUserLocation";

export default function LocationRequest() {
  const { t } = useTranslation();
  const { getUserLocation } = useUserLocation();

  return (
    <div className={styles["location-request-container"]}>
      <div className={styles["location-request-wrapper"]}>
        <img src={require("../../assets/geolocation_request.png")} />
        <div className={styles["location-request-text"]}>
          <h4>{t("geolocation_request")}</h4>
          <p>{t("geolocation_request_descr")}</p>
        </div>
        <Button type="primary" onClick={getUserLocation}>
          {t("allow")}
        </Button>
      </div>
    </div>
  );
}
