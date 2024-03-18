import React, {useEffect, useRef, useState} from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {
  Admin,
  Layout,
  Moderate,
  Seller,
  Users,
} from "../../processes/utils/Routes";
import { jwtDecode } from "jwt-decode";
import { $host } from "../../processes/http/http";
import { ColorModeContext, useMode } from "../../components/theme";

import SellerHeader from "./seller-header/seller-header";
import Header from "../../components/header/Header";
import styles from "./seller-header/seller-header.module.css";
import {ANNOUNCEMENT, CABINET, HOSTEL, REQUEST_ANNOUNCEMENT} from "../../processes/utils/consts";

const headerSeller ={
  marginTop:0
}


const LayoutCabinet = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const JWT = jwtDecode(localStorage.getItem("token"));
  const [CurrentUser, setCurrentUser] = useState();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(null);


  function handleClickTab(value) {
    setActiveTab(value);
  }

  useEffect(() => {
    const setActiveTabFromLocation = () => {
      const pathAfterCabinet = location.pathname.split("/")[2];
      switch (pathAfterCabinet) {
        case ANNOUNCEMENT:
          setActiveTab(0);
          break;
        case HOSTEL:
          setActiveTab(1);
          break;
        case REQUEST_ANNOUNCEMENT:
          setActiveTab(2);
          break;
        default:
          setActiveTab(0);
      }
    }; 
    setActiveTabFromLocation();
  }, [location]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await $host.get("user/" + JWT.userId);
        setCurrentUser(res.data);

      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <div className={"layout-app"}>
        <main className="content">
          {/* <Topbar/> */}
          <Header props_style={{headerSeller: headerSeller}}/>
          {CurrentUser?.role === 'seller' &&
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
                to={CABINET + HOSTEL}
            >
                  Гостиница
            </Link>
            <Link
                className={`${styles["header-tab"]} ${
                    activeTab === 2 && styles["active"]
                }`}
                onClick={() => handleClickTab(2)}
                to={CABINET+REQUEST_ANNOUNCEMENT}
            >
              Запросы
            </Link>
          </div>}

          <Routes>
            {CurrentUser?.role === "user" &&
              Users.map(({ path, Component }) => (
                <Route key={path} path={path} element={Component} />
              ))}
            {CurrentUser?.role === "seller" &&
              Seller.map(({ path, Component }) => (
                <Route key={path} path={path} element={Component} />
              ))}
            {CurrentUser?.role === "admin" &&
              Admin.map(({ path, Component }) => (
                <Route key={path} path={path} element={Component} />
              ))}
            {CurrentUser?.role === "moderate" &&
              Moderate.map(({ path, Component }) => (
                <Route key={path} path={path} element={Component} />
              ))}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default LayoutCabinet;
