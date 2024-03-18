import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import {
  CABINET,
  LOGIN_ROUTE,
  PROFILE,
  REGISTER_ROUT, REQUEST_USER,
} from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import { useTranslation } from "react-i18next";

export default function Sidebar({ onLogOut, user }) {
  const { image_path, username, phone } = user;
  const { t } = useTranslation();
  console.log(user)
  return (
    <div className={styles["sidebar"]}>
      <div className={styles["sidebar-profile"]}>
        <img
          src={
            image_path
              ? `https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net${image_path}`
              : require("../../assets/profile_placeholder.jpg")
          }
          alt="profile avatar placeholder"
        />
        <h4>{username}</h4>
        <p>{phone ? phone : ""}</p>
      </div>

      <div className={styles["sidebar-links-wrap"]}>
        <Link className={styles["sidebar-link"]} to={`${CABINET}${PROFILE}`}>
          <Icons.Profile />
          <div className={styles["sidebar-link-item"]}>
            {t("sidebar_profile")}
            <Icons.ChevronRight />
          </div>
        </Link>
        {user?.role === 'user' && (<>
          <Link className={styles["sidebar-link"]}>
            <Icons.Wallet />
            <div className={styles["sidebar-link-item"]}>
              {t("sidebar_payments")}
              <Icons.ChevronRight />
            </div>
          </Link>
          <Link className={styles["sidebar-link"]} to={CABINET+REQUEST_USER}>
            <Icons.Notification />
            <div className={styles["sidebar-link-item"]}>
              {t("sidebar_bookings")}
              <Icons.ChevronRight />
            </div>
          </Link>
          <Link className={styles["sidebar-link"]}>
            <Icons.ChatIcon />
            <div className={styles["sidebar-link-item"]}>
              {t("sidebar_fav")}
              <Icons.ChevronRight />
            </div>
          </Link>
        </>)}


        <Link className={styles["sidebar-link"]} onClick={onLogOut}>
          <Icons.Logout />
          <div className={styles["sidebar-link-item"]}>
            {t("sidebar_logout")}
            <Icons.ChevronRight />
          </div>
        </Link>
      </div>
    </div>
  );
}
