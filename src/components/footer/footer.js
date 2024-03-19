import React from "react";
import { Icons } from "../../assets/icons/icons";
import styles from "./footer.module.css";
import Logo from "../logo/Logo";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import LangDropdown from "../lang-dropdown/LangDropdown";

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
            <LangDropdown onlyIcon={false} />
          </div>

          <div className={styles["footer-menus"]}>
            <ul className={styles["footer-menu"]}>
              <h4>{t("footer_about_us")}</h4>
              <li>
                <NavLink>{t("footer_adds")}</NavLink>
              </li>
              <li>
                <NavLink>{t("footer_about_us")}</NavLink>
              </li>
              <li>
                <NavLink>{t("footer_map")}</NavLink>
              </li>
            </ul>

            <ul className={styles["footer-menu"]}>
              <h4>{t("footer_cooperation")}</h4>
              <li>
                <NavLink>{t("footer_cooperation_hotels")}</NavLink>
              </li>
              <li>
                <NavLink>{t("footer_cooperation_cottages")}</NavLink>
              </li>
            </ul>
          </div>
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
