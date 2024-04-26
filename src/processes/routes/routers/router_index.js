import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin, Layout, Public } from "../../utils/Routes";
import NotFound from "../../../components/not-found/NotFound";

const RouterIndex = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {Public.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
        {token &&
          Layout.map(({ path, Component }) => (
            <Route key={path} path={`${path}/*`} element={Component} />
          ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterIndex;
