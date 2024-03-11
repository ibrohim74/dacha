import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import {
  CABINET,
  LOGIN_ROUTE,
  PROFILE,
  REGISTER_ROUT,
} from "../../processes/utils/consts";

export default function Sidebar({ onLogOut, ref, user, isLoggedIn, isOpen }) {
  const { profilePic, username } = user;

  return (
    <div
      ref={ref}
      className={styles[`${isOpen ? "sidebar" : "sidebar-hidden"}`]}
    >
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
        {isLoggedIn ? (
          <Link className={styles["sidebar-link"]} to={`${CABINET}${PROFILE}`}>
            Профиль
          </Link>
        ) : (
          <>
            <Link
              to={LOGIN_ROUTE}
              className={styles["sidebar-link"]}
              //   onClick={closeSidebar}
            >
              Войти
            </Link>

            <Link
              to={REGISTER_ROUT}
              className={styles["sidebar-link"]}
              //   onClick={closeSidebar}
            >
              Зарегистрироваться
            </Link>
          </>
        )}

        <Link className={styles["sidebar-link"]}>Способ оплаты</Link>
        <Link className={styles["sidebar-link"]}>Мои бронирования</Link>
        <Link className={styles["sidebar-link"]}>Валюта</Link>
        <Link className={styles["sidebar-link"]}>Избранные</Link>
        <Link className={styles["sidebar-link"]}>Переключить профиль</Link>
        <Link className={styles["sidebar-link"]}>Справка / Подержка</Link>
        {isLoggedIn && (
          <Link className={styles["sidebar-link"]} onClick={onLogOut}>
            Выйти
          </Link>
        )}
      </div>
    </div>
  );
}
