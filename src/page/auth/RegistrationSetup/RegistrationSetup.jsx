import React, { useState } from "react";
import AuthTemplate from "../AuthTemplate/AuthTemplate";
import Button from "../../../components/Button/Button";
import styles from "./RegistrationSetup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setNewUser, setUserField } from "../../../store/auth/authSlice";
import { registrationAPI } from "../../../store/auth/authActions";
import { useNavigate } from "react-router";
import { HOME_ROUTE } from "../../../processes/utils/consts";
import { message } from "antd";
import { isStrongPassword } from "./helper";
import { useTranslation } from "react-i18next";
import ProfileImage from "../../../components/profile-image/ProfileImage";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

        <div className={styles["create-profile-img"]}>
          <ProfileImage />
        </div>

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
            <label htmlFor="role" id="role">
              {t("registration_role_label")}
            </label>

            <FormControl className={styles["registration-dropdown"]}>
              <Select
                labelId="role"
                id="role"
                className={styles["registration-dropdown-select"]}
                onChange={(e) =>
                  setCreatedUser({ ...createdUser, role: e.target.value })
                }
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderStyle: "none",
                    borderRadius: 10,
                  },
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                }}
              >
                <MenuItem
                  selected={true}
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Montserrat",
                  }}
                  value="user"
                >
                  {t("registration_role_user")}
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Montserrat",
                  }}
                  value="seller"
                >
                  {t("registration_role_seller")}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <Button type="full-width-primary" onClick={handleCreateProfile}>
          {t("create")}
        </Button>
      </div>
    </AuthTemplate>
  );
}
