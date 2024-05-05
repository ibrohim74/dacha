import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GOOGLE_STORAGE_URL, LOGIN_ROUTE } from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import Sidebar from "../sidebar/Sidebar";
import Button from "../Button/Button";
import styles from "./header.module.css";
import LangDropdown from "../lang-dropdown/LangDropdown";
import { useTranslation } from "react-i18next";
import Logo from "../logo/Logo";
import SearchInput from "../searchInput/SearchInput";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/profile/profileActions";
import Modal from "../modal/Modal";
import Notifications from "../notifications/Notifications";

const Header = (props, { elementsRef }) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userRequest, setUserRequest] = useState([]);
  const { t } = useTranslation();

  const { id, username, image_path, role } = useSelector(
    (state) => state.auth.user
  );

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuth);

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
    setShowNotifications(false);
  };

  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowSidebar(false);
  };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   const searchTerm = event.target.elements.search.value;
  //   navigate(`/villas?search=${searchTerm}`);
  // };

  return (
    <Modal>
      <div
        className={`${styles["header"]} ${styles["container-md"]}`}
        style={props.props_style && props.props_style.headerSeller}
      >
        <div className={styles["header-left"]}>
          <Logo />
          {/* <SearchInput elementsRef={elementsRef} /> */}
        </div>

        <div className={styles["header-right"]}>
          <LangDropdown />

          {isAuth ? (
            <>
              <Link
                className={styles["header-notification"]}
                onClick={handleShowNotifications}
              >
                {role === "seller" && (
                  <Badge
                    count={userRequest.length}
                    showZero
                    className={styles["header-notification-badge"]}
                  >
                    <Icons.Bell
                      className={styles["notification-btn"]}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Badge>
                )}
                {role === "user" && (
                  <Badge
                    count={userRequest.length}
                    showZero
                    className={styles["header-notification-badge"]}
                  >
                    <Icons.Bell
                      className={styles["notification-btn"]}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Badge>
                )}
              </Link>

              {showNotifications && (
                <Notifications close={() => setShowNotifications(false)} />
              )}
              <div
                className={styles["header-profile"]}
                onClick={handleShowSidebar}
              >
                <img
                  src={
                    image_path
                      ? `${GOOGLE_STORAGE_URL}${image_path}`
                      : require("../../assets/profile_placeholder.jpg")
                  }
                  alt="profile avatar placeholder"
                  className={styles["header-profile-pic"]}
                />
                <p>{username}</p>
              </div>
              {showSidebar && (
                <Sidebar
                  onLogout={logout}
                  close={() => setShowSidebar(false)}
                />
              )}
            </>
          ) : (
            <Button type="secondary" onClick={() => navigate(LOGIN_ROUTE)}>
              {t("login_btn")}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Header;
