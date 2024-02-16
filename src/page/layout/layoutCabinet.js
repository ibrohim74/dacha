import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
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

const LayoutCabinet = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const JWT = jwtDecode(localStorage.getItem("token"));
  const [CurrentUser, setCurrentUser] = useState();
  useEffect(() => {
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
  }, []);

  return (
    <div>
      <div className={"layout-app"}>
        <main className="content">
          {/* <Topbar/> */}
          <SellerHeader />
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
