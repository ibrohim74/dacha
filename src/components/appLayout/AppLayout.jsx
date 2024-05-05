import React, { useEffect, useRef } from "react";
import Header from "../header/Header";
import styles from "./AppLayout.module.css";
import Footer from "../footer/footer";
import ServerProblems from "../server-problems/ServerProblems";
import { useGetUserQuery } from "../../servises/usersAPI";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setNewUser } from "../../store/auth/authSlice";

export default function AppLayout({ children, elementsRef }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const JWT = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;

  const {
    data: userData,
    isLoading: isLoadingUser,
    isSuccess,
  } = useGetUserQuery(JWT?.userId);

  useEffect(() => {
    if (isSuccess && !isLoadingUser) dispatch(setNewUser(userData));

    // console.log(userData);
  }, [isSuccess]);

  return (
    <>
      {isLoadingUser ? (
        <Loader />
      ) : (
        <div ref={elementsRef}>
          <div className={styles["container"]}>
            <Header elementsRef={elementsRef} />
            {children}
          </div>
          <Footer />
          {/* <ServerProblems /> */}
        </div>
      )}
    </>
  );
}
