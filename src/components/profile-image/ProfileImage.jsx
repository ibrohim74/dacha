import React, { useState } from "react";
import styles from "./ProfileImage.module.css";
import { jwtDecode } from "jwt-decode";
import { $authHost } from "../../processes/http/http";
import { Upload, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUserField } from "../../store/auth/authSlice";
import { useTranslation } from "react-i18next";
import { Add, Edit } from "@mui/icons-material";
import { GOOGLE_STORAGE_URL } from "../../processes/utils/consts";

const MAX_FILE_SIZE_IN_MB = 3;

export default function ProfileImage({ image_path }) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  const JWT = jwtDecode(token);

  const [notifications] = notification.useNotification();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { t } = useTranslation();

  // const { image_path } = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  // console.log(image_path);
  // console.log(JWT.userId);
  // console.log(JWT);

  const getFileSizeInMB = (file) => {
    return file.size / (1024 * 1024);
  };

  const handleChange = async (file) => {
    dispatch(setIsLoading(true));

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
          console.log(res.data.path);
          dispatch(setIsLoading(false));
          dispatch(setUserField({ field: "image_path", value: res.data.path }));
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
          dispatch(setIsLoading(false));
          notifications.error({
            key: fileSizeInMB,
            message: `ошибка сервера`,
            description: `попробуйте еще раз позже`,
          });
        }
      } catch (e) {
        dispatch(setIsLoading(false));
        console.log(e);
      }
    } else {
      dispatch(setIsLoading(false));
      notifications.error({
        key: fileSizeInMB,
        message: `ошибка`,
        description: `размер файла не должен превышать 3 мб \n Размер вашего файла ${fileSizeInMB.toFixed(
          2
        )} МБ.`,
      });
    }
  };

  return (
    <div className={styles["profile-image-uploader-wrapper"]}>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        onChange={handleChange}
      >
        {image_path ? (
          <>
            <img
              src={`${GOOGLE_STORAGE_URL}${user.image_path}`}
              alt="avatar"
              className={styles["profile-image"]}
            />
          </>
        ) : (
          <>
            <img
              src={require("../../assets/profile_placeholder.jpg")}
              alt="image-placeholder"
              className={styles["profile-image-uploader"]}
            />
          </>
        )}
      </Upload>
      <div className={styles["profile-add-image"]}>
        {image_path ? <Edit /> : <Add />}
      </div>
    </div>
  );
}
