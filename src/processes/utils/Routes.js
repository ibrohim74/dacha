import {
  ANNOUNCEMENT,
  ANNOUNCEMENT_ITEM_PAGE,
  CABINET,
  CHANGE_PASS_TOP,
  CREATE_ANNOUNCEMENT,
  CREATE_ROOM,
  HOME_ROUTE,
  HOSTEL,
  LOGIN_ROUTE,
  POLICY,
  PROFILE,
  REGISTER_ROUT,
  SCHEDULE,
  UPDATE_ANNOUNCEMENT,
  UPDATE_HOSTEL,
  VILLAS_ROUTE,
  PRODUCT_ROUTE, REQUEST_ANNOUNCEMENT, REQUEST_USER,
} from "./consts";
import Home from "../../page/home/home";
import Login from "../../page/auth/login";
import Registration from "../../page/auth/registration";
import LayoutCabinet from "../../page/layout/layoutCabinet";
import Profile from "../../page/profile/profile";
import Announcement from "../../page/seller_Page/announcement/announcement";
import Create_announcement from "../../page/seller_Page/announcement/create_announcement";
import Change_pass_TopBar from "../../components/change_pass_TopBar";
import Hostel from "../../page/seller_Page/hostel/hostel";
import CreateRoom from "../../page/seller_Page/hostel/hostelPage/component/createRoom";
import ScheduleSeller from "../../page/seller_Page/schedule/scheduleSeller";
import UpdateHostel from "../../page/seller_Page/hostel/hostelPage/component/updateHostel";
import Policy from "../../page/policy/policy";
import Announcement_Item_Page from "../../page/seller_Page/announcement/announcement_Item_Page";

import Villas from "../../page/villas/villas";
import Item_Page from "../../page/item_Page/item_Page";
import RequestsAnnouncement from "../../page/seller_Page/announcement/requests_Announcement";
import UserRequestPage from "../../page/user_Page/userRequest/user_requestPage";
export const Public =  [
  {
    Component: <Home/>,
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
    Component: <Policy />,
    path: POLICY,
  },
  {
    Component: <Villas />,
    path: VILLAS_ROUTE,
  },
  {
    Component: <Item_Page />,
    path: PRODUCT_ROUTE,
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
    Component: <UserRequestPage />,
    path: REQUEST_USER,
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
    Component: <Change_pass_TopBar />,
    path: CHANGE_PASS_TOP,
  },
  {
    Component: <Hostel />,
    path: HOSTEL,
  },
  {
    Component: <UpdateHostel />,
    path: UPDATE_HOSTEL,
  },
  {
    Component: <CreateRoom />,
    path: CREATE_ROOM,
  },
  {
    Component: <ScheduleSeller />,
    path: SCHEDULE,
  },
  {
    Component: <Announcement_Item_Page />,
    path: ANNOUNCEMENT_ITEM_PAGE,
  },
  {
    Component: <RequestsAnnouncement />,
    path: REQUEST_ANNOUNCEMENT,
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
