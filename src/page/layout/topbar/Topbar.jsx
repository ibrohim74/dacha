import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {
    ANNOUNCEMENT,
    CABINET,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PROFILE,
    REGISTER_ROUT,
    REQUEST_ANNOUNCEMENT
} from "../../../processes/utils/consts";
import {Icons} from "../../../assets/icons/icons";
import {jwtDecode} from "jwt-decode";
import {$host} from "../../../processes/http/http";
import styles from '../assets/layout.module.css'

const Topbar = () => {
    const navigate = useNavigate();
    const [showAccMenu, setshowAccMenu] = useState(false);
    const accMenuRef = useRef();
    const accButtonRef = useRef();
    const url = useLocation()
    const
        JWT = localStorage.getItem("token")
            ? jwtDecode(localStorage.getItem("token"))
            : null;
    const [CurrentUser, setCurrentUser] = useState({username: ""});
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
        localStorage.clear();
        setshowAccMenu(false); // This will cause the component to re-render
        window.location.assign(HOME_ROUTE)
    };

    const handleOpenAccMenu = () => {
        setshowAccMenu(true);
    };
    const handleCloseAccMenu = () => {
        setshowAccMenu(false);
    };

    const handleClickOutside = (event) => {
        if (
            accMenuRef.current &&
            !accMenuRef.current.contains(event.target) &&
            accButtonRef.current !== event.target
        ) {
            handleCloseAccMenu();
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
    return (
        <div className={`${styles["top-box"]} ${styles.container}`}>
            <div className={styles['top-box-left']}>
                <Link className={styles["header-logo"]} to={HOME_ROUTE}>
                    <Icons.Logo/>
                    <div>Travid</div>
                </Link>
            </div>
            <div className={styles['top-box-center']}>
                <div className={url.pathname === CABINET + ANNOUNCEMENT ? styles["topLinkActive"] : ''}>
                    <Link to={CABINET+ANNOUNCEMENT}>Мои обявления</Link>
                </div>
                <div className={url.pathname === CABINET + REQUEST_ANNOUNCEMENT ? styles["topLinkActive"] : ''}>
                    <Link to={CABINET + REQUEST_ANNOUNCEMENT }>Запросы</Link>
                </div>
            </div>

            <div className={styles['top-box-right']}>
                <Icons.Language className={styles["language-btn"]}/>
                {isLoggedIn() ? (
                    <>
                        <Icons.Bell className={styles["notification-btn"]}/>
                        <div ref={accButtonRef} onClick={handleOpenAccMenu}>
                            {CurrentUser.username}
                        </div>
                        {showAccMenu && (
                            <>
                                <div ref={accMenuRef} className={styles["account-menu"]}>
                                    <div>
                                        <Link
                                            className={styles["menu-btn"]}
                                            to={`${CABINET}${PROFILE}`} // not sure if good practice /cabinet/profile
                                        >
                                            Аккаунт
                                        </Link>
                                        <Link className={styles["menu-btn"]}>Избранные</Link>
                                        <Link className={styles["menu-btn"]}>
                                            Забронированные
                                        </Link>
                                    </div>
                                    <div className={styles["menu-btn"]} onClick={removeToken}>
                                        Выйти
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default Topbar;