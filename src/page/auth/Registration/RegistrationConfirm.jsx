import React, { useState } from "react";
import AuthTemplate from "../AuthTemplate/AuthTemplate";
import styles from "./Registration.module.css";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setToken } from "../../../store/auth/authSlice";
import { checkCodeAPI } from "../../../store/auth/authActions";
import { message } from "antd";
import { useNavigate } from "react-router";
import { REGISTRATION_SETUP } from "../../../processes/utils/consts";
import { useTranslation } from "react-i18next";

export default function RegistrationConfirm() {
  //enter code and hit step2 function
  const [confirmationCode, setConfirmationCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { email } = useSelector((state) => state.auth.user);
  // console.log(email);

  const handleCheckVerification = () => {
    dispatch(setIsLoading(true));

    if (confirmationCode) {
      checkCodeAPI(confirmationCode, email, "register").then((res) => {
        if (res?.status === 200) {
          // console.log(res.data.access_token);
          dispatch(setToken(res.data?.access_token));
          localStorage.setItem("token", res.data?.access_token);
          navigate(REGISTRATION_SETUP);
        } else {
          // console.log(res);
          // console.log(res.data);
          message.error("smth is wrong in reg confirm");
        }
      });
    } else {
      message.error("email pochtangizga kelgan xabarni yozing");
    }
  };

  return (
    <AuthTemplate>
      <div className={styles["registration-wrapper"]}>
        <h4>{t("auth_registration_title")}</h4>
        <p>
          {t("auth_email_sent")} {email} {t("auth_code_sent")}
        </p>

        <div className={styles["input-row"]}>
          <label htmlFor="code">{t("auth_confirmation_code")}</label>
          <input
            type="text"
            id="code"
            onChange={(e) => {
              setConfirmationCode(e.target.value);
            }}
            placeholder={t("auth_confirmation_code_placeholder")}
          />
        </div>
        <div className={styles["registration-btn"]}>
          <Button type="full-width-primary" onClick={handleCheckVerification}>
            {t("create")}
          </Button>
        </div>
      </div>
    </AuthTemplate>
  );
}
