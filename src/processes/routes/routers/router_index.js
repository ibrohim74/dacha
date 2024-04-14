import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Admin, Layout, Public } from "../../utils/Routes";
import { NOT_FOUND } from "../../utils/consts";

const RouterIndex = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {Public.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
        {token ? (
          Layout.map(({ path, Component }) => (
            <Route key={path} path={`${path}/*`} element={Component} />
          ))
        ) : (
          <Route path="*" element={<Navigate to={NOT_FOUND} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterIndex;
