import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CABINET,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REQUEST_ANNOUNCEMENT,
  REQUEST_USER,
} from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "../../processes/http/http";
import Sidebar from "../sidebar/Sidebar";
import Button from "../Button/Button";
// import styles from "./Header.module.css";
import styles from "./header.module.css";
import LangDropdown from "../lang-dropdown/LangDropdown";
import { useTranslation } from "react-i18next";
import Logo from "../logo/Logo";
import SearchInput from "../searchInput/SearchInput";
import { Badge } from "antd";

const Header = (props, { elementsRef }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ username: "" });
  const [showSidebar, setShowSidebar] = useState(false);
  const [userRequest, setUserRequest] = useState([]);
  const { t } = useTranslation();

  const accMenuRef = useRef();
  const accButtonRef = useRef();

  const handleShowSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  const JWT = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;

  useEffect(() => {
    if (JWT) {
      const getUser = async () => {
        try {
          const res = await $host.get("user/" + JWT.userId);
          setCurrentUser(res.data);
        } catch (e) {
          console.log(e);
        }
      };
      getUser();
    }
  }, []);

  const removeToken = () => {
    localStorage.removeItem("token");
    setShowSidebar(false); // This will cause the component to re-render
    window.location.assign(HOME_ROUTE);
  };

  const handleClickOutside = (event) => {
    if (
      accMenuRef.current &&
      !accMenuRef.current.contains(event.target) &&
      accButtonRef.current !== event.target
    ) {
      closeSidebar();
    }
  };

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

  const getRequestsUser = async () => {
    if (currentUser?.role === "seller") {
      try {
        const res = await $authHost.get(`/seller/${currentUser.id}/requests`);
        console.log(res);
        setUserRequest(res?.data);
      } catch (e) {
        console.log(e);
      }
    } else if (currentUser?.role === "user") {
      try {
        const res = await $authHost.get(`/customer/${currentUser.id}/requests`);
        console.log(res);
        setUserRequest(res?.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getRequestsUser();
  }, [currentUser.role]);

  return (
    <>
      <div
        className={`${styles["header"]} ${styles["container-md"]}`}
        style={props.props_style && props.props_style.headerSeller}
      >
        <div className={styles["header-left"]}>
          <Logo />
          <SearchInput elementsRef={elementsRef} />
        </div>

        <div className={styles["header-right"]}>
          <LangDropdown />

          {isLoggedIn() ? (
            <>
              {currentUser.role === "seller" && (
                <Link
                  to={CABINET + REQUEST_ANNOUNCEMENT}
                  style={{ width: "25px", height: "25px" }}
                >
                  <Badge
                    count={userRequest.length}
                    showZero
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Icons.Bell
                      className={styles["notification-btn"]}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Badge>
                </Link>
              )}
              {currentUser.role === "user" && (
                <Link
                  to={CABINET + REQUEST_USER}
                  style={{ width: "25px", height: "25px" }}
                >
                  <Badge
                    count={userRequest.length}
                    showZero
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Icons.Bell
                      className={styles["notification-btn"]}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Badge>
                </Link>
              )}
              <div
                className={styles["header-profile"]}
                onClick={handleShowSidebar}
              >
                <img
                  src={
                    currentUser?.image_path
                      ? `https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net${currentUser.image_path}`
                      : require("../../assets/profile_placeholder.jpg")
                  }
                  alt="profile avatar placeholder"
                  className={styles["header-profile-pic"]}
                />
                <p>{currentUser.username}</p>
              </div>
              {showSidebar && (
                <Sidebar onLogOut={removeToken} user={currentUser} />
              )}
            </>
          ) : (
            <Button type="secondary" onClick={() => navigate(LOGIN_ROUTE)}>
              {t("login_btn")}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
