import React, { useState } from "react";
import AuthTemplate from "../AuthTemplate/AuthTemplate";
import Button from "../../../components/Button/Button";
import styles from "./RegistrationSetup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setNewUser, setUserField } from "../authSlice";
import { registrationAPI } from "../API";
import { useNavigate } from "react-router";
import { HOME_ROUTE } from "../../../processes/utils/consts";
import { message } from "antd";
import { isStrongPassword } from "./helper";
import { useTranslation } from "react-i18next";
import ProfileImage from "../../../components/profile-image/ProfileImage";

export default function RegistrationSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { email } = useSelector((state) => state.auth.user);

  const [createdUser, setCreatedUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email,
    role: "",
  });

  const handlePasswordCheck = (e) => {
    const checkedPassword = isStrongPassword(e.target.value);
    console.log(checkedPassword);
    setCreatedUser({
      ...createdUser,
      password: e.target.value,
    });
  };

  const handleCreateProfile = () => {
    // console.log(createdUser);
    if (createdUser.firstName && createdUser.password) {
      dispatch(setNewUser(createdUser));
      registrationAPI(createdUser);
      navigate(HOME_ROUTE);
    } else {
      // setLoading(false);
      message.error("Please fill in all fields");
    }
  };

  return (
    <AuthTemplate>
      <div className={styles["create-profile-setup"]}>
        <h4>{t("auth_profile_setup")}</h4>

        <ProfileImage />

        <div className={styles["create-profile-inputs"]}>
          <div className={styles["input-row"]}>
            <label htmlFor="name">{t("profile_form_name")}</label>
            <input
              type="text"
              id="name"
              placeholder={t("auth_profile_name_placeholder")}
              required
              onChange={(e) =>
                setCreatedUser({ ...createdUser, firstName: e.target.value })
              }
            />
          </div>

          <div className={styles["input-row"]}>
            <label htmlFor="surname">{t("profile_form_surname")}</label>
            <input
              type="text"
              id="surname"
              placeholder={t("auth_profile_surname_placeholder")}
              required
              onChange={(e) =>
                setCreatedUser({ ...createdUser, lastName: e.target.value })
              }
            />
          </div>

          <div className={styles["input-row"]}>
            <label htmlFor="username">{t("auth_profile_username")}</label>
            <input
              type="text"
              id="username"
              placeholder={t("auth_profile_username_placeholder")}
              required
              onChange={(e) =>
                setCreatedUser({ ...createdUser, username: e.target.value })
              }
            />
          </div>

          <div className={styles["input-row"]}>
            <label htmlFor="password">{t("profile_password")}</label>
            <input
              type="password"
              id="password"
              placeholder={t("auth_profile_password_placeholder")}
              required
              onChange={handlePasswordCheck}
            />
          </div>
          <div className={styles["input-row"]}>
            <label htmlFor="role">Who are you?</label>
            <input
              type="text"
              id="role"
              placeholder="enter your role"
              required
              onChange={(e) =>
                setCreatedUser({ ...createdUser, role: e.target.value })
              }
            />
          </div>
        </div>

        <Button type="full-width-primary" onClick={handleCreateProfile}>
          {t("create")}
        </Button>
      </div>
    </AuthTemplate>
  );
}
