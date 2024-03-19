import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CABINET, PROFILE } from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import Bookings from "../bookings/Bookings";

export default function Sidebar({ onLogOut, user }) {
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

  return (
    <Modal>
      <div className={styles["sidebar-container"]}>
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

            <Link className={styles["sidebar-link"]}>
              <Icons.Wallet />
              <div className={styles["sidebar-link-item"]}>
                {t("sidebar_payments")}
                <Icons.ChevronRight />
              </div>
            </Link>
            <Modal.Open opens="bookings">
              <Link className={styles["sidebar-link"]}>
                <Icons.Notification />
                <div className={styles["sidebar-link-item"]}>
                  {t("sidebar_bookings")}
                  <Icons.ChevronRight />
                </div>
              </Link>
            </Modal.Open>
            <Link className={styles["sidebar-link"]}>
              <Icons.ChatIcon />
              <div className={styles["sidebar-link-item"]}>
                {t("sidebar_fav")}
                <Icons.ChevronRight />
              </div>
            </Link>

            <Link className={styles["sidebar-link"]} onClick={onLogOut}>
              <Icons.Logout />
              <div className={styles["sidebar-link-item"]}>
                {t("sidebar_logout")}
                <Icons.ChevronRight />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Modal.Window name="bookings" title="My bookings">
        <Bookings />
      </Modal.Window>
    </Modal>
  );
}
