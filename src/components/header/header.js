import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
    LOGIN_ROUTE,
    REGISTER_ROUT,
    HOME_ROUTE,
    CABINET,
    PROFILE,
} from "../../processes/utils/consts";
import {Icons} from "../../assets/icons/icons";
import {jwtDecode} from "jwt-decode";
import {$host} from "../../processes/http/http";
import styles from "./header.module.css";

const Header = () => {
    const navigate = useNavigate();
    const [showAccMenu, setshowAccMenu] = useState(false);
    const accMenuRef = useRef();
    const accButtonRef = useRef();

    const JWT = localStorage.getItem("token")
        ? jwtDecode(localStorage.getItem("token"))
        : null;
    const [CurrentUser, setCurrentUser] = useState({username: ""});
    useEffect(() => {
      if (JWT){
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
      }


    }, []);

    const removeToken = () => {
        localStorage.removeItem("token");
        setshowAccMenu(false); // This will cause the component to re-render
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

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.search.value;
        navigate(`/villas?search=${searchTerm}`);
    };

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
        </>
    );
};

export default Header;
