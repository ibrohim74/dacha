import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTER_ROUT,
  HOME_ROUTE,
  CABINET,
  PROFILE,
  CREATE_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  HOSTEL,
  SCHEDULE,
  ANNOUNCEMENT, REQUEST_ANNOUNCEMENT,
} from "../../../processes/utils/consts";
import { Icons } from "../../../assets/icons/icons";
import { jwtDecode } from "jwt-decode";
import { $host } from "../../../processes/http/http";
import styles from "./seller-header.module.css";

const SellerHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAccMenu, setshowAccMenu] = useState(false);
  const accMenuRef = useRef();
  const accButtonRef = useRef();
  const [activeTab, setActiveTab] = useState(null); // null, 0, 1, 2...

  useEffect(() => {
    const setActiveTabFromLocation = () => {
      const pathAfterCabinet = location.pathname.split("/")[2];
      switch (pathAfterCabinet) {
        case ANNOUNCEMENT:
          setActiveTab(0);
          break;
        default:
          setActiveTab(1);
      }
    };

    setActiveTabFromLocation();
  }, [location]);

  const JWT = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;
  const [CurrentUser, setCurrentUser] = useState({ username: "" });
  useEffect(() => {
    if (JWT) {
      const getUser = async () => {
        try {
          const res = await $host.get("user/" + JWT.userId);
          setCurrentUser(res.data);
          console.log(res);
        } catch (e) {
          console.log(e);
        }
      };
      getUser();
    }
  }, []);

  const removeToken = () => {
    localStorage.removeItem("token");
    window.location.assign(HOME_ROUTE)
    setshowAccMenu(false); // This will cause the component to re-render
  };

  const handleOpenAccMenu = () => {
    setshowAccMenu(true);
  };
  const handleCloseAccMenu = () => {
    setshowAccMenu(false);
  };

  const handleClickOutside = (event) => {
    if (
      accMenuRef.current &&
      !accMenuRef.current.contains(event.target) &&
      accButtonRef.current !== event.target
    ) {
      handleCloseAccMenu();
    }
  };

  function handleClickTab(value) {
    setActiveTab(value);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isLoggedIn = () => {
    return JWT != null;
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    navigate(`/villas?search=${searchTerm}`);
  };

  return (
    <>
      <div className={`${styles["Seller-header"]} ${styles["container-md"]}`}>
        <div className={styles["header-left"]}>
          <Link className={styles["header-logo"]} to={HOME_ROUTE}>
            <Icons.Logo />
            <div>Travid</div>
          </Link>
          <div className={styles["header-tabs"]}>
            <Link
              className={`${styles["header-tab"]} ${
                activeTab === 0 && styles["active"]
              }`}
              onClick={() => handleClickTab(0)}
              to={CABINET + ANNOUNCEMENT}
            >
              Мои объявления
            </Link>
            <Link
              className={`${styles["header-tab"]} ${
                activeTab === 1 && styles["active"]
              }`}
              onClick={() => handleClickTab(1)}
              to={CABINET+REQUEST_ANNOUNCEMENT}
            >
              Запросы
            </Link>
          </div>
        </div>
        <div className={styles["header-right"]}>
          <Icons.Language className={styles["language-btn"]} />
          <Icons.Bell className={styles["notification-btn"]} />
          <div ref={accButtonRef} onClick={handleOpenAccMenu}>
            {CurrentUser.username}
          </div>
          {showAccMenu && (
            <>
              <div ref={accMenuRef} className={styles["account-menu"]}>
                <div>
                  <Link
                    className={styles["menu-btn"]}
                    to={CABINET + PROFILE} // not sure if good practice /cabinet/profile
                  >
                    Профиль
                  </Link>
                  <Link className={styles["menu-btn"]} to={CABINET + HOSTEL}>
                    Hostel
                  </Link>
                  <Link className={styles["menu-btn"]} to={CABINET + SCHEDULE}>
                    Schedule
                  </Link>
                  <Link
                    className={styles["menu-btn"]}
                    to={CABINET + ANNOUNCEMENT}
                  >
                    Announcement
                  </Link>
                  <Link
                    className={styles["menu-btn"]}
                    to={CABINET + CREATE_ANNOUNCEMENT}
                  >
                    Create
                  </Link>
                </div>
                <div className={styles["menu-btn"]} onClick={removeToken}>
                  Выйти
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SellerHeader;
