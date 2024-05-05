import React, { useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import styles from "./login.module.css";
import {
  CABINET,
  FORGOT_PASSWORD,
  HOME_ROUTE,
  POLICY,
  PROFILE,
  REGISTER_ROUT,
} from "../../../processes/utils/consts";
import { loginAPI } from "../../../store/auth/authActions";
import AuthTemplate from "../AuthTemplate/AuthTemplate";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignedIn,
  setToken,
  setUserField,
} from "../../../store/auth/authSlice";
import { useTranslation } from "react-i18next";
import { updateAuthHeader } from "../../../processes/http/http";
import { setAccessToken } from "../../../servises/tokenStorage";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { password, username } = useSelector((state) => state.auth.user);

  console.log(localStorage.getItem("token"));

  const handleUsernameChange = (e) => {
    dispatch(setUserField({ field: "username", value: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    dispatch(setUserField({ field: "password", value: e.target.value }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const data = { username, password };

  const handleSend = () => {
    setIsLoading(true);
    if (username && password) {
      loginAPI(data).then((res) => {
        console.log("login token", res);
        if (res.status === 200) {
          localStorage.setItem("token", res?.data?.access_token);
          // setAccessToken(res.data.access_token);
          // updateAuthHeader(res.data.access_token);
          // console.log(res);
          dispatch(setSignedIn(res.data));
          navigate(HOME_ROUTE);
        } else {
          message.error("Данные введены неверно");
          setIsLoading(false);
        }
      });
    } else {
      message.error("email && password");
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate>
      <div className={styles["login-wrapper"]}>
        <h4>{t("auth_login_title")}</h4>

        <div className={styles["inputs"]}>
          <div className={styles["input-row"]}>
            <label htmlFor="username">{t("auth_login_first_input")}</label>
            <input
              type="text"
              id="username"
              autoComplete={"new-email"}
              value={username}
              onChange={handleUsernameChange}
              placeholder={t("auth_login_first_input_placeholder")}
            />
          </div>

          <div className={styles["input-row"]}>
            <label htmlFor="password">{t("auth_login_second_input")}</label>
            <input
              type="password"
              id="password"
              autoComplete={"new-password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder={t("auth_login_second_input_placeholder")}
            />
          </div>
        </div>

        <div className={styles["login-forget-password"]}>
          <Link to={FORGOT_PASSWORD}>{t("auth_login_forgot_password")}</Link>
        </div>
        <Button onClick={handleSend} type="full-width-primary">
          {t("auth_login_btn")}
        </Button>

        <div className={styles["login-link-wrapper"]}>
          <p>{t("auth_login_signup_link")}</p>
          <Link to={REGISTER_ROUT}>{t("auth_registration_title")}</Link>
        </div>
      </div>
    </AuthTemplate>
  );
};

export default Login;
