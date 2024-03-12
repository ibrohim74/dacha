import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import { jwtDecode } from "jwt-decode";
import { $host } from "../../processes/http/http";
import Sidebar from "../sidebar/Sidebar";
import { CloseOutlined } from "@ant-design/icons";
import Button from "../button/Button";
import styles from "./Header.module.css";
import LangDropdown from "../lang-dropdown/LangDropdown";

const Header = ({ villasHeader = false }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ username: "" });
  const [showSidebar, setShowSidebar] = useState(false);

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
                <Sidebar
                  ref={accMenuRef}
                  onLogOut={removeToken}
                  user={currentUser}
                  isLoggedIn={isLoggedIn()}
                  isOpen={showSidebar}
                />
              )}
            </>
          ) : (
            <Button type="secondary" onClick={() => navigate(LOGIN_ROUTE)}>
              Войти
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
