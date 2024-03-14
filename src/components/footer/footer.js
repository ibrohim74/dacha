import React from "react";
import { Icons } from "../../assets/icons/icons";
import styles from "./footer.module.css";
import Logo from "../logo/Logo";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const date = new Date();
  return (
    <footer className={styles["footer"]}>
      <div
        className={`${styles["container-md"]} ${styles["footer-inner-wrapper"]} `}
      >
        <div className={styles["footer-main-wrapper"]}>
          <div className={styles["footer-brand"]}>
            <Logo />
            <p className={styles["footer-brand-motto"]}>{t("footer_motto")}</p>
          </div>

          <ul className={styles["footer-menu"]}>
            <h4>{t("footer_about")}</h4>
            <li>
              <NavLink>{t("footer_about_us")}</NavLink>
            </li>
            <li>
              <NavLink>{t("footer_features")}</NavLink>
            </li>
            <li>
              <NavLink>{t("footer_news")}</NavLink>
            </li>
            <li>
              <NavLink>{t("footer_careers")}</NavLink>
            </li>
            <li>
              <NavLink>{t("footer_faq")}</NavLink>
            </li>
          </ul>

          <ul className={styles["footer-menu"]}>
            <h4>{t("footer_support")}</h4>
            <li>
              <NavLink>{t("footer_account")}</NavLink>
            </li>
            <li>
              <NavLink>{t("footer_support_center")}</NavLink>
            </li>
            <li>
              <NavLink>{t("footer_feedback")}</NavLink>
            </li>
            <li>
              <NavLink>{t("footer_contact")}</NavLink>
            </li>
            <li>
              <NavLink>{t("footer_accessibility")}</NavLink>
            </li>
          </ul>

          <div className={styles["footer-app-links"]}>
            <h4>{t("footer_get_app")}</h4>
            <div className={styles["footer-app-links-wrapper"]}>
              <Link to="" className={styles["footer-app-link"]}>
                <Icons.AppStore />
              </Link>
              <Link to="" className={styles["footer-app-link"]}>
                <Icons.GooglePlay />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles["footer-copyright"]}>
          <p>
            {t("footer_copyright")} {date.getFullYear()} {t("footer_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
