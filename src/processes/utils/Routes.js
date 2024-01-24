import {
  ANNOUNCEMENT,
  CABINET,
  CHANGE_PASS_TOP,
  CREATE_ANNOUNCEMENT,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE,
  REGISTER_ROUT,
  UPDATE_ANNOUNCEMENT,
  VILLAS_ROUTE,
} from "./consts";
import Home from "../../page/home/home";
import Login from "../../page/auth/login";
import Registration from "../../page/auth/registration";
import LayoutCabinet from "../../page/layout/layoutCabinet";
import Profile from "../../page/profile/profile";
import Announcement from "../../page/seller_Page/announcement/announcement";
import Create_announcement from "../../page/seller_Page/announcement/create_announcement";
import Update_announcement from "../../page/seller_Page/announcement/update_announcement";
import Change_pass_TopBar from "../../components/change_pass_TopBar";
import Villas from "../../page/villas/villas";

export const Public = [
  {
    Component: <Home />,
    path: HOME_ROUTE,
  },
  {
    Component: <Login />,
    path: LOGIN_ROUTE,
  },
  {
    Component: <Registration />,
    path: REGISTER_ROUT,
  },
  {
    Component: <Villas />,
    path: VILLAS_ROUTE,
  },
];
export const Layout = [
  {
    Component: <LayoutCabinet />,
    path: CABINET,
  },
];

export const Admin = [
  {
    Component: <Profile />,
    path: PROFILE,
  },
  {
    Component: <Change_pass_TopBar />,
    path: CHANGE_PASS_TOP,
  },
];
export const Users = [
  {
    Component: <Profile />,
    path: PROFILE,
  },
  {
    Component: <Change_pass_TopBar />,
    path: CHANGE_PASS_TOP,
  },
];
export const Seller = [
  {
    Component: <Profile />,
    path: PROFILE,
  },
  {
    Component: <Announcement />,
    path: ANNOUNCEMENT,
  },
  {
    Component: <Create_announcement />,
    path: CREATE_ANNOUNCEMENT,
  },
  {
    Component: <Update_announcement />,
    path: UPDATE_ANNOUNCEMENT,
  },
  {
    Component: <Change_pass_TopBar />,
    path: CHANGE_PASS_TOP,
  },
];
export const Moderate = [
  {
    Component: <Profile />,
    path: PROFILE,
  },
  {
    Component: <Change_pass_TopBar />,
    path: CHANGE_PASS_TOP,
  },
];
