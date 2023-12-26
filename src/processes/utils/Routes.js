import {ANNOUNCEMENT, CABINET, HOME_ROUTE, LOGIN_ROUTE, PROFILE, REGISTER_ROUT} from "./consts";
import Home from "../../page/home/home";
import Login from "../../page/auth/login";
import Registration from "../../page/auth/registration";
import LayoutCabinet from "../../page/layout/layoutCabinet";
import Profile from "../../page/profile/profile";
import Announcement from "../../page/seller_Page/announcement/announcement";



export const Public =[
    {
        Component:<Home/>,
        path:HOME_ROUTE
    },
    {
        Component:<Login/>,
        path:LOGIN_ROUTE
    },
    {
        Component:<Registration/>,
        path:REGISTER_ROUT
    }
]
export const Layout = [
    {
        Component:<LayoutCabinet/>,
        path:CABINET
    }
]

export const Admin = [
    {
        Component:<Profile/>,
        path:PROFILE
    }
]
export const Users = [
    {
        Component:<Profile/>,
        path:PROFILE
    }
]
export const Seller = [
    {
        Component:<Profile/>,
        path:PROFILE
    },
    {
        Component:<Announcement/>,
        path:ANNOUNCEMENT
    }
]
export const Moderate = [
    {
        Component:<Profile/>,
        path:PROFILE
    }
]