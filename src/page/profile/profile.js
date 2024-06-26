import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Box } from "@mui/material";
import { message, notification } from "antd";
import styles from "./profile.module.css";
import { logout } from "../../store/profile/profileActions";
import { Icons } from "../../assets/icons/icons";
import PageHeader from "../../components/page-header/PageHeader";
import FullPageTabs from "../../components/full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import PaymentMethods from "../../components/payment-methods/PaymentMethods";
import Modal from "../../components/modal/Modal";
import Logout, { DeleteAccount } from "../../components/logout/Logout";
import ProfileImage from "../../components/profile-image/ProfileImage";
import ChangePassword from "../../components/change-password/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { setNewUser, setUserField } from "../../store/auth/authSlice";
import { changePassword } from "../../store/auth/authActions";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../servises/usersAPI";
import Loader from "../../components/loader/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [changePassword, setChangePassword] = useState(false);
  const [updatedProfileFields, setUpdatedProfileFields] = useState({});
  const [notifications, contextHolder] = notification.useNotification();
  const [initialState, setInitialState] = useState({});
  const [authOption, setAuthOption] = useState("phone");

  const JWT = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;

  console.log(localStorage.getItem("token"));

  const {
    data: userData,
    isLoading: isLoadingUser,
    isSuccess,
  } = useGetUserQuery(JWT.userId);

  const { id, username, firstName, lastName, email, phone_number, image_path } =
    useSelector((state) => state.auth.user);

  const handleFieldEditing = (e, fieldname) => {
    dispatch(setUserField({ field: fieldname, value: e.target.value }));
    setUpdatedProfileFields({ [fieldname]: e.target.value });
  };

  console.log(updatedProfileFields);

  const updatedUser = {
    username: username,
    firstName: updatedProfileFields.firstName
      ? updatedProfileFields.firstName
      : firstName,
    lastName: updatedProfileFields.lastName
      ? updatedProfileFields.lastName
      : lastName,
    phone_number: updatedProfileFields.phone_number
      ? updatedProfileFields.phone_number
      : phone_number,
  };

  // console.log(updatedUser);

  const handleAuthOption = (isChecked, optionValue) => {
    if (isChecked) {
      setAuthOption(optionValue);
    }
  };

  const [updateUserData, { isLoading, isSuccess: successfullyUpdated, error }] =
    useUpdateUserMutation();

  const handleUpdate = () => {
    console.log("profile", id);
    console.log("profile", localStorage.getItem("token"));
    updateUserData({ user_id: id, ...updatedProfileFields });
  };

  const handleChangePassword = async () => {
    await changePassword(
      initialState.old_password,
      initialState.new_password,
      JWT.userId
    );
  };

  return (
    <>
      <PageHeader
        pageTitle={t("profile_title")}
        pageSubtitle={t("profile_subtitle")}
      />
      {isLoadingUser ? (
        <Loader />
      ) : (
        <Modal>
          <FullPageTabs
            tabs={[
              {
                label: t("profile_first_tab"),
                content: (
                  <Box className={styles["profile-tab"]}>
                    {contextHolder}

                    <ProfileImage image_path={image_path} />

                    <div className={styles["profile-form"]}>
                      <div className={styles["profile-input-row"]}>
                        <div className={styles["profile-input-box"]}>
                          <label htmlFor="firstName">
                            {t("profile_form_name")}
                          </label>
                          <input
                            className={styles["profile-input"]}
                            value={firstName}
                            onChange={(e) => {
                              handleFieldEditing(e, "firstName");
                            }}
                          />
                        </div>

                        <div className={styles["profile-input-box"]}>
                          <label htmlFor="lastName">
                            {t("profile_form_surname")}
                          </label>
                          <input
                            className={styles["profile-input"]}
                            value={lastName}
                            onChange={(e) => {
                              handleFieldEditing(e, "lastName");
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles["profile-input-row"]}>
                        <div className={styles["profile-input-box"]}>
                          <label htmlFor="phone_number">
                            {t("profile_form_phone")}
                          </label>
                          <input
                            className={styles["profile-input"]}
                            value={phone_number}
                            onChange={(e) => {
                              handleFieldEditing(e, "phone_number");
                            }}
                          />
                        </div>
                        <div className={styles["profile-input-box"]}>
                          <label htmlFor="email">
                            {t("profile_form_email")}
                          </label>
                          <input
                            className={styles["profile-input"]}
                            value={email}
                            onChange={(e) => {
                              handleFieldEditing(e, "email");
                            }}
                          />
                        </div>
                      </div>

                      {changePassword && (
                        <ChangePassword
                          passwords={initialState}
                          onSetPasswords={setInitialState}
                        />
                      )}

                      <div className={styles["profile-checkboxes"]}>
                        <label htmlFor="phone_number">
                          {t("profile_auth")}
                        </label>
                        <div className={styles["profile-checkbox-row"]}>
                          <Checkbox
                            isChecked={authOption === "phone"}
                            onChange={(isChecked) =>
                              handleAuthOption(isChecked, "phone")
                            }
                            label={t("profile_form_phone")}
                          />
                          <Checkbox
                            isChecked={authOption === "email"}
                            onChange={(isChecked) =>
                              handleAuthOption(isChecked, "email")
                            }
                            label={t("profile_form_email")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles["profile-change-btns"]}>
                      <Button type="full-width-primary" onClick={handleUpdate}>
                        {t("save")}
                      </Button>
                      <Button
                        type="full-width-primary"
                        onClick={
                          changePassword
                            ? handleChangePassword
                            : () => {
                                setChangePassword(!changePassword);
                              }
                        }
                      >
                        {changePassword
                          ? "Применить изменения"
                          : t("change_password_btn")}
                      </Button>
                    </div>

                    <div className={styles["profile-btns"]}>
                      <Modal.Open opens="logout">
                        <Button type="full-width-gray">
                          <Icons.Logout />
                          {t("profile_logout")}
                        </Button>
                      </Modal.Open>

                      <Modal.Open opens="deleteacc">
                        <Button type="full-width-gray">
                          <Icons.Remove />
                          {t("profile_delete_account")}
                        </Button>
                      </Modal.Open>
                    </div>
                  </Box>
                ),
              },
              {
                label: t("profile_second_tab"),
                content: (
                  <Box className={styles["profile-tab"]}>
                    <PaymentMethods />
                  </Box>
                ),
              },
            ]}
          />

          <Modal.Window name="logout">
            <Logout onLogOut={logout} />
          </Modal.Window>
          <Modal.Window name="deleteacc">
            <DeleteAccount />
          </Modal.Window>
        </Modal>
      )}
    </>
  );
};

export default Profile;

const Checkbox = ({ isChecked, onChange, label }) => (
  <div
    className={`${styles["profile-checkbox-input"]} ${
      isChecked ? styles["profile-checkbox-input-checked"] : ""
    }`}
  >
    <span
      className={isChecked ? styles["checkmark-checked"] : styles["checkmark"]}
      onClick={onChange}
    ></span>
    <p>{label}</p>
  </div>
);
