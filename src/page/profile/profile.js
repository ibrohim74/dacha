import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "../../processes/http/http";
import { Box, Button, styled } from "@mui/material";
import Header_adminPage from "../../components/header_adminPage";
import { Input, Upload, message } from "antd";
import styles from "./assets/profile.module.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { sendProfile_data } from "./API";
import { Icons } from "../../assets/icons/icons";
import EditInput from "../../components/edit-input/edit-input";
import ChangePass from "../../components/change_pass";

const Profile = () => {
  const [CurrentUser, setCurrentUser] = useState();
  const [initialValues, setInitialValues] = useState();
  const [imgProfile, setImgProfile] = useState();
  const [loadingImg, setLoadingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [changePass, setChangePass] = useState(false);
  const JWT = jwtDecode(localStorage.getItem("token"));

    const handleChange = async (file) => {
        setLoadingImg(true);

        try {
            message.info('загружается', 10)
            const res = await $authHost.post(
                `api/upload/user/${JWT.userId}`,
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
                message.success('загружен', 5);
                // Intervalni boshqaruvchi identifikatorni saqlash
                const timer = setInterval(() => {
                    window.location.reload(true);
                }, 3000);
            } else {
                setLoadingImg(false);
                message.error("rasim xato");
            }
        } catch (e) {
            setLoadingImg(false);
            console.log(e);
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
    sendProfile_data(initialValues).then((r) => {
      if (r?.status === 200) {
        message.success("Update");
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      }
    }).catch(e=>{
      console.log(e)});
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
  console.log(CurrentUser)
  return (
    <Box className={`${styles["profileBox"]} ${styles["container-md"]}`}>
      {/* <Header_adminPage title="PROFILE" subtitle="Update profile" /> */}
      <Box className={styles["title-large"]} mb="30px">
        PROFILE
      </Box>

      <div className={styles["box-2-input"]}>
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
                src={`https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net${CurrentUser.image_path}`}
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

        <div className={`${styles["input"]} ${styles["input-2-row"]}`}>
          <label htmlFor="firstName">First Name:</label>
          <EditInput
            className={styles["text-input"]}
            value={CurrentUser?.firstName}
            onChange={(e) =>
              setInitialValues({
                ...initialValues,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className={`${styles["input"]} ${styles["input-2-row"]}`}>
          <label htmlFor="lastName">Last Name:</label>
          <EditInput
            className={styles["text-input"]}
            value={CurrentUser?.lastName}
            onChange={(e) =>
              setInitialValues({ ...initialValues, lastName: e.target.value })
            }
          />
        </div>
      </div>

      <div className={styles["input"]}>
        <label htmlFor="Username">Username:</label>
        <EditInput
          className={styles["text-input"]}
          value={CurrentUser?.username}
          onChange={(e) =>
            setInitialValues({ ...initialValues, username: e.target.value })
          }
        />
      </div>
      <div className={styles["input"]}>
        <label htmlFor="phone_number">Phone number:</label>
        <EditInput
          className={styles["text-input"]}
          value={CurrentUser?.phoneNumber}
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
            variant="contained"
            onClick={()=> {
              setChangePass(!changePass)
            }}
            size={"large"}
            style={{ backgroundColor: "#505050" , marginRight:"15px"}}
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
      <Box display="flex" justifyContent="end" mt="20px">

      </Box>

      {changePass && <ChangePass/>}
    </Box>
  );
};

export default Profile;
