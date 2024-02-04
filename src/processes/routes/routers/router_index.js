import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Admin, Layout, Public } from "../../utils/Routes";

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
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterIndex;
