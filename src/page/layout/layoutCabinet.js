import { Route, Routes, useLocation } from "react-router-dom";
import { Admin, Moderate, Seller, Users } from "../../processes/utils/Routes";
import Breadcrumb_dashboard from "../../components/breadcrumb_dashboard/breadcrumb_dashboard";
import { useSelector } from "react-redux";
import AppLayout from "../../components/appLayout/AppLayout";

const LayoutCabinet = () => {
  const { role } = useSelector((state) => state.auth.user);

  return (
    <AppLayout>
      <main className="content">
        {role === "seller" && <Breadcrumb_dashboard />}

        <Routes>
          {role === "user" &&
            Users.map(({ path, Component }) => (
              <Route key={path} path={path} element={Component} />
            ))}
          {role === "seller" &&
            Seller.map(({ path, Component }) => (
              <Route key={path} path={path} element={Component} />
            ))}
          {role === "admin" &&
            Admin.map(({ path, Component }) => (
              <Route key={path} path={path} element={Component} />
            ))}
          {role === "moderate" &&
            Moderate.map(({ path, Component }) => (
              <Route key={path} path={path} element={Component} />
            ))}
        </Routes>
      </main>
    </AppLayout>
  );
};

export default LayoutCabinet;
