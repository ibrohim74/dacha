import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "../../processes/http/http";
import Sidebar from "../sidebar/Sidebar";
import { Badge } from "antd";
import Button from "../button/Button";
import styles from "./Header.module.css";
import LangDropdown from "../lang-dropdown/LangDropdown";
import { useTranslation } from "react-i18next";

const Header = () => {
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
      <div className={`${styles["header"]} ${styles["container-md"]}`}>
        <div className={styles["header-left"]}>
          <Link className={styles["header-logo"]} to={HOME_ROUTE}>
            <Icons.Logo />
            <p>Travid</p>
          </Link>
        </div>
        <div className={styles["header-right"]}>
          <LangDropdown />

          <button
            className={styles["mobile-menu-btn"]}
            onClick={handleShowSidebar}
          >
            <Icons.MenuLogo />
          </button>

          {isLoggedIn() ? (
            <>
              {currentUser && (
                <Badge count={userRequest.length} showZero>
                  <Icons.Bell className={styles["notification-btn"]} />
                </Badge>
              )}
              <div
                className={styles["header-profile"]}
                onClick={handleShowSidebar}
              >
                <img
                  src={
                    currentUser.profilePic
                      ? currentUser.profilePic
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
