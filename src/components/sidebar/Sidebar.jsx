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
import Bookings from "../bookings/Bookings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentMethods from "../payment-methods/PaymentMethods";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export default function Sidebar({ onLogOut, user, close }) {
  const { username, phone } = user;
  const [imgProfile, setImgProfile] = useState();
  const [loadingImg, setLoadingImg] = useState(false);
  const JWT = jwtDecode(localStorage.getItem("token"));
  const { t } = useTranslation();
  console.log(user);

  useEffect(() => {
    const getPhoto = async () => {
      setLoadingImg(true);
      try {
        const res = await $authHost.get(`/media/users/${JWT.userId}`, {
          responseType: "arraybuffer",
        });
        if (res?.status === 200) {
          const imageData = res.data;
          const base64Image = btoa(
            new Uint8Array(imageData).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const dataUrl = `data:image/jpeg;base64,${base64Image}`;
          setImgProfile(dataUrl);
          setLoadingImg(false);
        }
        setLoadingImg(false);
      } catch (e) {
        setLoadingImg(false);
        console.log(e);
      }
    };
    getPhoto();
  }, []);

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
                imgProfile
                  ? imgProfile
                  : require("../../assets/profile_placeholder.jpg")
              }
              alt="profile avatar placeholder"
            />
            <h4>{username}</h4>
            <p>{phone ? phone : ""}</p>
          </div>

          <div className={styles["sidebar-links-wrap"]}>
            {user?.role === "seller" && (
              <Link
                className={styles["sidebar-link"]}
                to={`${CABINET}${SELLER_DASHBOARD}`}
              >
                <DashboardIcon />
                <div className={styles["sidebar-link-item"]}>
                  {t("dashboard")}
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
                {t("sidebar_profile")}
                <Icons.ChevronRight />
              </div>
            </Link>

            {/* <Modal.Open opens="payment-methods">
              <Link className={styles["sidebar-link"]}>
                <Icons.Wallet />
                <div className={styles["sidebar-link-item"]}>
                  {t("sidebar_payments")}
                  <Icons.ChevronRight />
                </div>
              </Link>
            </Modal.Open> */}

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
            <Link to={""} className={styles["sidebar-link"]}>
              <Icons.QuestionMark />
              <div className={styles["sidebar-link-item"]}>
                {t("sidebar_support")}
                <Icons.ChevronRight />
              </div>
            </Link>
            {/* 
            <Link className={styles["sidebar-link"]} onClick={onLogOut}>
              <Icons.Logout />
              <div className={styles["sidebar-link-item"]}>
                {t("sidebar_logout")}
                <Icons.ChevronRight />
              </div>
            </Link> */}
          </div>
        </div>
      </div>

      <Modal.Window name="payment-methods" title={t("sidebar_payments")}>
        <PaymentMethods />
      </Modal.Window>
    </Modal>
  );
}
