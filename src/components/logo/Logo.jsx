import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../assets/icons/icons";
import { HOME_ROUTE } from "../../processes/utils/consts";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link className={styles["logo"]} to={HOME_ROUTE}>
      <Icons.Logo />
      <p>Travid</p>
    </Link>
  );
}
