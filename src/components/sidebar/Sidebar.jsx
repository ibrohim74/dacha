import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { CABINET, PROFILE } from "../../processes/utils/consts";

export default function Sidebar({ onLogOut, ref, user }) {
  const { profilePic, username } = user;
  return (
    <div ref={ref} className={styles["sidebar"]}>
      <img
        src={
          profilePic
            ? profilePic
            : require("../../assets/profile_placeholder.jpg")
        }
        alt="profile avatar placeholder"
      />
      <h4>{username}</h4>

      <div className={styles["sidebar-links-wrap"]}>
        <Link className={styles["sidebar-link"]} to={`${CABINET}${PROFILE}`}>
          Профиль
        </Link>
        <Link className={styles["sidebar-link"]}>Способ оплаты</Link>
        <Link className={styles["sidebar-link"]}>Мои бронирования</Link>
        <Link className={styles["sidebar-link"]}>Валюта</Link>
        <Link className={styles["sidebar-link"]}>Избранные</Link>
        <Link className={styles["sidebar-link"]}>Переключить профиль</Link>
        <Link className={styles["sidebar-link"]}>Справка / Подержка</Link>
        <Link className={styles["sidebar-link"]} onClick={onLogOut}>
          Выйти
        </Link>
      </div>
    </div>
  );
}
