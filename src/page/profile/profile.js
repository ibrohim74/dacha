import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "../../processes/http/http";
import { Box, Button, styled } from "@mui/material";
import Header_adminPage from "../../components/header_adminPage";
import { Input, Upload, message } from "antd";
import styles from './assets/profile.module.css'
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { sendProfile_data } from "./API";

const Profile = () => {
  const [CurrentUser, setCurrentUser] = useState();
  const [initialValues, setInitialValues] = useState();
  const [imgProfile, setImgProfile] = useState();
  const [loadingImg, setLoadingImg] = useState(false);
  const JWT = jwtDecode(localStorage.getItem("token"));
  const handleChange = async (file) => {
    setLoadingImg(true);
    try {
      const res = await $authHost.post(
        `/upload/user/${JWT.userId}`,
        { file: file.file.originFileObj },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res)
      if (res?.status === 200){
        setLoadingImg(false);
        window.location.reload()
      }else {
        message.error('rasim xato')
      }
    } catch (e) {
      setLoadingImg(false);
      console.log(e);
    }
  };

  const getPhoto = async () => {
    setLoadingImg(true);
    try {
      const res = await $authHost.get(`/media/users/${JWT.userId}/`, {
        responseType: "arraybuffer",
      });
      // Convert the binary data to a base64 string
      const base64 = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      // Create a data URL
      const dataUrl = `data:${res.headers[
        "content-type"
      ].toLowerCase()};base64,${base64}`;
      setImgProfile(dataUrl);
      setLoadingImg(false);
    } catch (e) {
      setLoadingImg(false);
      console.log(e);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await $host.get("user/" + JWT.userId);
      setCurrentUser(res.data);
    };
    getUser();
    getPhoto();
  }, []);
  const handleSend = () => {
    sendProfile_data(initialValues).then((r) => {
      if (r === 200) {
        message.success("Update");
        setTimeout(() => {
          window.location.href = window.location.href;
        }, 1500);
      } else {
        message.error(
          r.map((err) => {
            return <p style={{ width: "400px" }}>{err.msg}</p>;
          })
        );
      }
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
        <LoadingOutlined style={{ color: "white" }} />
      ) : (
        <PlusOutlined style={{ color: "white" }} />
      )}
      <div
        style={{
          marginTop: 8,
          color: "white",
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <div>
      <Box m="20px" className={styles["profileBox"]}>
        <Header_adminPage title="PROFILE" subtitle="Update profile" />

        <div className={styles["box-2-input"]}>
          <div className={styles["input"]}>
            <Upload
              name="avatar"
              listType="picture-card"
              className={styles["avatar-uploader"]}
              showUploadList={false}
              onChange={handleChange}
            >
              {imgProfile ? (
                <img
                  src={imgProfile}
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

          <div className={styles["input input-2-row"]}>
            <label htmlFor="firstName">
              First Name: {CurrentUser?.firstName}
            </label>
            <Input
              placeholder="First Name"
              size={"large"}
              onChange={(e) =>
                setInitialValues({
                  ...initialValues,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="input input-2-row">
            <label htmlFor="lastName">Last Name: {CurrentUser?.lastName}</label>
            <Input
              placeholder="Last Name"
              size={"large"}
              onChange={(e) =>
                setInitialValues({ ...initialValues, lastName: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles["input"]}>
          <label htmlFor="email">Email: {CurrentUser?.email}</label>
          <Input
            placeholder="Email"
            size={"large"}
            onChange={(e) =>
              setInitialValues({ ...initialValues, email: e.target.value })
            }
          />
        </div>
        <div className={styles["input"]}>
          <label htmlFor="Username">Username: {CurrentUser?.username}</label>
          <Input
            placeholder="Username"
            size={"large"}
            onChange={(e) =>
              setInitialValues({ ...initialValues, username: e.target.value })
            }
          />
        </div>
        <div className={styles["input"]}>
          <label htmlFor="phone_number">
            Phone number: {CurrentUser?.phoneNumber}
          </label>
          <Input
            placeholder="phone number"
            size={"large"}
            onChange={(e) =>
              setInitialValues({
                ...initialValues,
                phone_number: e.target.value,
              })
            }
          />
        </div>

        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleSend}
            size={"large"}
          >
            Update
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
