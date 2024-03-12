import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
    LOGIN_ROUTE,
    REGISTER_ROUT,
    HOME_ROUTE,
} from "../../processes/utils/consts";
import {Icons} from "../../assets/icons/icons";
import {jwtDecode} from "jwt-decode";
import {$authHost, $host} from "../../processes/http/http";
import styles from "./header.module.css";
import Sidebar from "../sidebar/Sidebar";
import {Badge} from "antd";

const Header = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({username: ""});
    const [showSidebar, setShowSidebar] = useState(false);
    const [userRequest, setUserRequest] = useState([]);

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

    const getRequestsUser = async () => {
        if (currentUser?.role === 'seller') {
            try {
                const res = await $authHost.get(`/seller/${currentUser.id}/requests`)
                console.log(res)
                setUserRequest(res?.data)
            } catch (e) {
                console.log(e)
            }
        }else if (currentUser?.role === 'user'){
            try {
                const res = await $authHost.get(`/customer/${currentUser.id}/requests`)
                console.log(res)
                setUserRequest(res?.data)
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        getRequestsUser()
    }, [currentUser.role]);

    return (
        <>
            <div className={`${styles["Header"]} ${styles["container-md"]}`}>
                <div className={styles["header-left"]}>
                    <Link className={styles["header-logo"]} to={HOME_ROUTE}>
                        <Icons.Logo/>
                        <div>Travid</div>
                    </Link>
                    <form className={styles["header-searchbar"]} onSubmit={handleSearch}>
                        <Icons.Magnifier/>
                        <input type="text" name="search" placeholder="Найти"/>
                    </form>
                </div>
                <div className={styles["header-right"]}>
                    <Icons.Language className={styles["language-btn"]}/>

                    <button
                        className={styles["mobile-menu-btn"]}
                        onClick={handleShowSidebar}
                    >
                        <Icons.MenuLogo/>
                    </button>

                    {isLoggedIn() ? (
                        <>
                            {currentUser && <Badge count={userRequest.length} showZero>
                                <Icons.Bell className={styles["notification-btn"]}/>
                            </Badge>}



                            <Icons.Hamburger
                                className={styles["notification-btn"]}
                                onClick={handleShowSidebar}
                            />
                            {showSidebar && (
                                <Sidebar
                                    ref={accMenuRef}
                                    onLogOut={removeToken}
                                    user={currentUser}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <div className={styles["auth-routes"]}>
                                <div>
                                    <Link to={LOGIN_ROUTE} className={styles["auth-btn"]}>
                                        sign in
                                    </Link>
                                </div>
                                <div>
                                    <Link to={REGISTER_ROUT} className={styles["auth-btn"]}>
                                        sign up
                                    </Link>
                                </div>
                            </div>

                            <nav
                                className={
                                    styles[`${showSidebar ? "mobile_nav_active" : "mobile_nav"}`]
                                }
                            >
                                <ul className={styles["mobile-nav-menu"]}>
                                    <li className={styles["mobile-nav-link"]}>
                                        <Link
                                            to={LOGIN_ROUTE}
                                            className={styles["auth-btn"]}
                                            onClick={closeSidebar}
                                        >
                                            Sign in
                                        </Link>
                                    </li>
                                    <li className={styles["mobile-nav-link"]}>
                                        <Link
                                            to={REGISTER_ROUT}
                                            className={styles["auth-btn"]}
                                            onClick={closeSidebar}
                                        >
                                            Sign up
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
