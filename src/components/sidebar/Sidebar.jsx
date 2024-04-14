import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  CABINET,
  PROFILE,
  SELLER_DASHBOARD,
  BOOKING_ROUTE,
  FAVORITES,
} from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentMethods from "../payment-methods/PaymentMethods";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useSelector } from "react-redux";
import Support from "../support/Support";

export default function Sidebar({ close, onLogout }) {
  const { username, phone, role, image_path } = useSelector(
    (state) => state.auth.user
  );

  // console.log(image_path);

  const [imgProfile, setImgProfile] = useState();
  const [loadingImg, setLoadingImg] = useState(false);
  const JWT = jwtDecode(localStorage.getItem("token"));
  const { t } = useTranslation();
  // console.log(username);

  const ref = useOutsideClick({ handler: close });

  return (
    <Modal>
      <div className={styles["sidebar-container"]} ref={ref}>
        <div className={styles["sidebar-arrow"]}>
          <Icons.SidebarArrow />
        </div>

        <div className={styles["sidebar"]}>
          <div className={styles["sidebar-profile"]}>
            <img
              src={
                image_path
                  ? `https://visitca.travel/api/${image_path}`
                  : require("../../assets/profile_placeholder.jpg")
              }
              alt="profile avatar placeholder"
            />
            <h4>{username}</h4>
            <p>{phone ? phone : ""}</p>
          </div>

          <div className={styles["sidebar-links-wrap"]}>
            {role === "seller" && (
              <Link
                className={styles["sidebar-link"]}
                to={`${CABINET}${SELLER_DASHBOARD}`}
              >
                <DashboardIcon />
                <div className={styles["sidebar-link-item"]}>
                  {t("sidebar_dashboard")}
                  <Icons.ChevronRight />
                </div>
              </Link>
            )}
            <Link
              className={styles["sidebar-link"]}
              to={`${CABINET}${PROFILE}`}
            >
              <Icons.Profile />
              <div className={styles["sidebar-link-item"]}>
                {t("profile_title")}
                <Icons.ChevronRight />
              </div>
            </Link>

            <Link to={BOOKING_ROUTE} className={styles["sidebar-link"]}>
              <Icons.Notification />
              <div className={styles["sidebar-link-item"]}>
                {t("sidebar_bookings")}
                <Icons.ChevronRight />
              </div>
            </Link>
            <Link to={FAVORITES} className={styles["sidebar-link"]}>
              <Icons.ChatIcon />
              <div className={styles["sidebar-link-item"]}>
                {t("sidebar_fav")}
                <Icons.ChevronRight />
              </div>
            </Link>
            <Modal.Open opens="support">
              <Link to={""} className={styles["sidebar-link"]}>
                <Icons.QuestionMark />
                <div className={styles["sidebar-link-item"]}>
                  {t("sidebar_support")}
                  <Icons.ChevronRight />
                </div>
              </Link>
            </Modal.Open>
            <Link className={styles["sidebar-link"]} onClick={onLogout}>
              <Icons.Logout />
              <div className={styles["sidebar-link-item"]}>Выйти</div>
            </Link>
          </div>
        </div>
      </div>

      <Modal.Window name="payment-methods" title={t("sidebar_payments")}>
        <PaymentMethods />
      </Modal.Window>

      <Modal.Window name="support" title={t("support_title")}>
        <Support />
      </Modal.Window>
    </Modal>
  );
}
