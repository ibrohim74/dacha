import React from "react";
import Button from "../Button/Button";
import styles from "./NotFound.module.css";
import { NavLink } from "react-router-dom";
import { HOME_ROUTE } from "../../processes/utils/consts";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className={styles["not-found-wrapper"]}>
      <h2>404</h2>
      <p>
        {t("not_found_descr_1")} <br />
        {t("not_found_descr_2")}
      </p>
      <NavLink className={styles["not-found-link"]} to={HOME_ROUTE}>
        <Button type="full-width-pr imary">{t("home_page_link")}</Button>
      </NavLink>
    </div>
  );
}
