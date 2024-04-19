import React, { useState } from "react";
import AuthTemplate from "../AuthTemplate/AuthTemplate";
import styles from "./ForgotPassword.module.css";
import Button from "../../../components/Button/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  checkCodeAPI,
  restoreUser,
} from "../../../store/auth/authActions";
import { setUserField } from "../../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../processes/utils/consts";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth.user);

  const [newPassword, setNewPassword] = useState({});

  const [selectedVerificationType, setSelectedVerificationType] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [codeIsChecked, setCodeIsChecked] = useState(false);

  const [token, setToken] = useState("");

  const handleRestoreUser = () => {
    console.log(selectedVerificationType);
    //check email by regex and phone number
    dispatch(restoreUser(selectedVerificationType));
    dispatch(setUserField({ field: "email", value: selectedVerificationType }));
    setPasswordConfirm(true);
  };

  const handleCheckCode = async () => {
    const response = await checkCodeAPI(confirmationCode, email, "restore");
    if (response.status === 200) {
      setToken(response?.data.access_token);
      setCodeIsChecked(true);
    } else {
      console.error("Error checking code:", response);
    }
  };

  const handleChangePassword = async () => {
    const response = await changePassword(
      newPassword.new_password,
      newPassword.new_confirmed_password,
      token
    );

    if (response.status === 200) {
      navigate(LOGIN_ROUTE);
    }
  };

  return (
    <AuthTemplate>
      <div className={styles["forgot-password-wrapper"]}>
        <h4>{t("auth_password_recovery")}</h4>
        {!passwordConfirm && (
          <>
            <div className={styles["input-row"]}>
              <label htmlFor="email">{t("auth_password_recovery_email")}</label>
              <input
                type="email"
                id="email"
                placeholder={t("auth_password_recovery_email_placecholder")}
                required
                value={selectedVerificationType}
                onChange={(e) => setSelectedVerificationType(e.target.value)}
              />
            </div>
            <Button type="full-width-primary" onClick={handleRestoreUser}>
              {t("send")}
            </Button>
          </>
        )}

        {passwordConfirm && (
          <>
            <div className={styles["forgot-password-confirm"]}>
              <p>
                {t("auth_email_sent")} {t("auth_code_sent")}
              </p>
              <div className={styles["input-row"]}>
                <label htmlFor="confirm-code">
                  {t("auth_confirmation_code")}
                </label>
                <input
                  type="number"
                  id="confirm-code"
                  placeholder={t("auth_confirmation_code_placeholder")}
                  required
                  onChange={(e) => setConfirmationCode(e.target.value)}
                />
              </div>

              {codeIsChecked && (
                <>
                  <div className={styles["input-row"]}>
                    <label htmlFor="new-password">
                      {t("auth_new_password")}
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      placeholder={t("auth_new_password_placeholder")}
                      required
                      onChange={(e) =>
                        setNewPassword({
                          ...newPassword,
                          new_password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className={styles["input-row"]}>
                    <label htmlFor="confirm-password">
                      {t("auth_new_password_confirm")}
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      placeholder={t("auth_new_password_confirm_placeholder")}
                      required
                      onChange={(e) =>
                        setNewPassword({
                          ...newPassword,
                          new_confirmed_password: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <Button
              type="full-width-primary"
              onClick={codeIsChecked ? handleChangePassword : handleCheckCode}
            >
              {t("confirm")}
            </Button>
          </>
        )}
      </div>
    </AuthTemplate>
  );
};

export default ForgotPassword;
