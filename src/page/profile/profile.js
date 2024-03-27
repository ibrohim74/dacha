import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "../../processes/http/http";
import { Box, styled } from "@mui/material";
import Header_adminPage from "../../components/header_adminPage";
import { Input, Upload, message, notification } from "antd";
import styles from "./assets/profile.module.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { sendProfile_data } from "./API";
import { Icons } from "../../assets/icons/icons";
import EditInput from "../../components/edit-input/edit-input";
import ChangePass from "../../components/change_pass";
import AppLayout from "../../components/appLayout/AppLayout";
import PageHeader from "../../components/page-header/PageHeader";
import FullPageTabs from "../../components/full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import PaymentMethods from "../../components/payment-methods/PaymentMethods";
import Modal from "../../components/modal/Modal";
import Logout, { DeleteAccount } from "../../components/logout/Logout";

const Profile = () => {
  const [CurrentUser, setCurrentUser] = useState();
  const [initialValues, setInitialValues] = useState();
  const [imgProfile, setImgProfile] = useState();
  const [loadingImg, setLoadingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [changePass, setChangePass] = useState(false);
  const JWT = jwtDecode(localStorage.getItem("token"));
  const MAX_FILE_SIZE_IN_MB = 3;
  const [notifications, contextHolder] = notification.useNotification();

  const [authOption, setAuthOption] = useState("phone");
  const { t } = useTranslation();

  const handleAuthOption = (isChecked, optionValue) => {
    if (isChecked) {
      setAuthOption(optionValue);
    }
  };

  const getFileSizeInMB = (file) => {
    return file.size / (1024 * 1024);
  };

  const handleChange = async (file) => {
    setLoadingImg(true);
    const fileSizeInMB = getFileSizeInMB(file.file);
    if (fileSizeInMB <= MAX_FILE_SIZE_IN_MB) {
      try {
        notifications.info({
          key: fileSizeInMB,
          message: `загружается`,
          duration: 10,
        });

        const res = await $authHost.post(
          `upload/user/${JWT.userId}`,
          { file: file.file.originFileObj },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res?.status === 200) {
          setLoadingImg(false);
          notifications.success({
            key: fileSizeInMB,
            message: `загружен`,
            description: "Страница обновится через 5 секунд.",
            duration: 5,
          });
          setInterval(() => {
            window.location.reload(true);
          }, 3000);
        } else {
          setLoadingImg(false);
          notifications.error({
            key: fileSizeInMB,
            message: `ошибка сервера`,
            description: `попробуйте еще раз позже`,
          });
        }
      } catch (e) {
        setLoadingImg(false);
        console.log(e);
      }
    } else {
      setLoadingImg(false)
            notifications.error({
                key:fileSizeInMB,
                message: `ошибка`,
                description: `размер файла не должен превышать 3 мб \n Размер вашего файла ${fileSizeInMB.toFixed(2)} МБ.`,
      });
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
        pageTitle="Profile"
        pageSubtitle="Все ваши данные и настройки"
      />
      <Modal>
        <FullPageTabs
          tabs={[
            {
              label: t("profile_first_tab"),
              content: (
                <Box className={styles["profile-tab"]}>
                  {contextHolder}

                  {/* upload photo */}
                  <div className={styles["input"]}>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className={styles["avatar-uploader"]}
                      showUploadList={false}
                      onChange={handleChange}
                    >
                      {CurrentUser?.image_path ? (
                        <img
                          src={`https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api${CurrentUser.image_path}`}
                          alt="avatar"
                          style={{
                            width: "90%",
                            height: "90%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>

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

                    <div className={styles["profile-input-row"]}>
                      <div className={styles["profile-input-box"]}>
                        <label htmlFor="phone_number">
                          {t("profile_password")}
                        </label>
                        <input
                          className={styles["profile-input"]}
                          value=""
                          onChange={() => {}}
                        />
                      </div>
                    </div>

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

                  <Button type="primary">{t("save")}</Button>

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

                  {/* <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setChangePass(!changePass);
                    }}
                    size={"large"}
                    style={{ backgroundColor: "#505050", marginRight: "15px" }}
                  >
                    Change Password
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSend}
                    size={"large"}
                    style={{ backgroundColor: "#505050" }}
                  >
                    Update
                  </Button>
                </Box>

                {changePass && <ChangePass />} */}
                </Box>
              ),
            },
            {
              label: "Settings",
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
