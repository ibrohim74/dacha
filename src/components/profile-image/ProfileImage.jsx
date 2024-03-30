import React, { useState } from "react";
import styles from "./ProfileImage.module.css";
import { jwtDecode } from "jwt-decode";
import { $authHost } from "../../processes/http/http";
import { Upload, message, notification } from "antd";

export default function ProfileImage({ currentUser }) {
  const JWT = jwtDecode(localStorage.getItem("token"));
  const MAX_FILE_SIZE_IN_MB = 3;
  const [loadingImg, setLoadingImg] = useState(false);
  const [notifications, contextHolder] = notification.useNotification();

  const getFileSizeInMB = (file) => {
    // console.log(file);
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
        {currentUser?.image_path ? (
          <>
            <img
              src={`https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api${currentUser.image_path}`}
              alt="avatar"
              style={{
                width: "90%",
                height: "90%",
                objectFit: "cover",
              }}
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
      <label htmlFor="avatar">Добавить фото</label>
    </div>
  );
}
