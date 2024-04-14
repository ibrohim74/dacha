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

const Login = () => {
  const { password, username } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          console.log(res);
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

{
  /* <div className={styles[""]}>
  
<div className={styles[""]}>
  <div className={styles[""]}>
    <Icons.Logo />
    <div>Travid</div>
  </div>
  <span className={styles[""]}>Войти в учётный запись</span>
  <div autoComplete={"new-login"} className={styles[""]}>
    <div className={styles[""]}>
      <label htmlFor="username">имя пользователя</label>
      <input
        type="text"
        id="username"
        autoComplete={"new-email"}
        value={initialState?.email}
        onChange={(e) =>
          setInitialState({ ...initialState, email: e.target.value })
        }
      />
    </div>

    <div className={styles[""]}>
      <label htmlFor="password">Пароль</label>
      <input
        type="password"
        id="password"
        autoComplete={"new-password"}
        value={initialState?.password}
        onChange={(e) =>
          setInitialState({ ...initialState, password: e.target.value })
        }
      />
    </div>
    <Link to={FORGOT_PASSWORD}>
      {" "}
      <span className={styles[""]}>Забыли пароль ?</span>
    </Link>
    {isLoading ? (
      <div className={styles[""]}>
        <LoadingOutlined />
      </div>
    ) : (
      <div className={styles[""]} onClick={handleSend}>
        <button>Войти</button>
      </div>
    )}
  </div>
</div>
<Link to={REGISTER_ROUT}>Зарегистрироваться</Link>
</div> */
}
