import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "../../processes/http/http";
import { Box } from "@mui/material";
import Header_adminPage from "../../components/header_adminPage";
import { message, notification } from "antd";
import styles from "./assets/profile.module.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { sendProfile_data } from "./API";
import { Icons } from "../../assets/icons/icons";
import EditInput from "../../components/edit-input/edit-input";
import AppLayout from "../../components/appLayout/AppLayout";
import PageHeader from "../../components/page-header/PageHeader";
import FullPageTabs from "../../components/full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import PaymentMethods from "../../components/payment-methods/PaymentMethods";
import Modal from "../../components/modal/Modal";
import Logout, { DeleteAccount } from "../../components/logout/Logout";
import ProfileImage from "../../components/profile-image/ProfileImage";
import ChangePassword from "../../components/change-password/ChangePassword";

const Profile = () => {
  const [CurrentUser, setCurrentUser] = useState();
  const [initialValues, setInitialValues] = useState();
  const [initialState, setInitialState] = useState({});
  const [imgProfile, setImgProfile] = useState();
  const [loadingImg, setLoadingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const JWT = jwtDecode(localStorage.getItem("token"));
  const [notifications, contextHolder] = notification.useNotification();

  const [authOption, setAuthOption] = useState("phone");
  const { t } = useTranslation();

  const handleAuthOption = (isChecked, optionValue) => {
    if (isChecked) {
      setAuthOption(optionValue);
    }
  };

  const getUser = async () => {
    const res = await $host.get("user/" + JWT.userId);
    setCurrentUser(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSend = () => {
    sendProfile_data(initialValues)
      .then((r) => {
        if (r?.status === 200) {
          message.success("Update");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangePassword = async () => {
    if (initialState.old_password && initialState.new_password) {
      if (
        initialState.old_password.length >= 8 &&
        initialState.new_password.length >= 8
      ) {
        try {
          console.log(initialState);
          const res = await $authHost.post(
            `change_old_password/${JWT.userId}`,
            { initialState }
          );
          if (res.status === 200) {
            message.success(t("password_changed_msg"));
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        } catch (e) {
          console.log(e);
          message.error(t("password_incorrect"));
        }
      } else {
        message.error(t("password_min_length_msg"));
      }
    } else {
      message.error(t("all_inputs_required"));
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loadingImg ? (
        <LoadingOutlined style={{ color: "black " }} />
      ) : (
        <PlusOutlined style={{ color: "black" }} />
      )}
      <div
        style={{
          marginTop: 8,
          color: "black",
        }}
      >
        Upload
      </div>
    </button>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(CurrentUser);

  return (
    <AppLayout>
      <PageHeader
        pageTitle={t("profile_title")}
        pageSubtitle={t("profile_subtitle")}
      />
      <Modal>
        <FullPageTabs
          tabs={[
            {
              label: t("profile_first_tab"),
              content: (
                <Box className={styles["profile-tab"]}>
                  {contextHolder}

                  <ProfileImage currentUser={CurrentUser} />

                  <div className={styles["profile-form"]}>
                    <div className={styles["profile-input-row"]}>
                      <div className={styles["profile-input-box"]}>
                        <label htmlFor="firstName">
                          {t("profile_form_name")}
                        </label>
                        <input
                          className={styles["profile-input"]}
                          value={CurrentUser?.firstName}
                          onChange={(e) =>
                            setInitialValues({
                              ...initialValues,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className={styles["profile-input-box"]}>
                        <label htmlFor="lastName">
                          {t("profile_form_surname")}
                        </label>
                        <input
                          className={styles["profile-input"]}
                          value={CurrentUser?.lastName}
                          onChange={(e) =>
                            setInitialValues({
                              ...initialValues,
                              lastName: e.target.value,
                            })
                          }
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
                          value={CurrentUser?.phone_number}
                          onChange={(e) =>
                            setInitialValues({
                              ...initialValues,
                              phone_number: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={styles["profile-input-box"]}>
                        <label htmlFor="email">{t("profile_form_email")}</label>
                        <input
                          className={styles["profile-input"]}
                          value={CurrentUser?.email}
                          onChange={(e) =>
                            setInitialValues({
                              ...initialValues,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {changePassword && <ChangePassword />}

                    <div className={styles["profile-checkboxes"]}>
                      <label htmlFor="phone_number">{t("profile_auth")}</label>
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
                    <Button type="full-width-primary" onClick={handleSend}>
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
            },
          ]}
        />

        <Modal.Window name="logout">
          <Logout />
        </Modal.Window>
        <Modal.Window name="deleteacc">
          <DeleteAccount />
        </Modal.Window>
      </Modal>

      <PaymentMethods />
    </AppLayout>
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
