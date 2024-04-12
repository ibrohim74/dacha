import React, { useState } from "react";
import AuthTemplate from "../AuthTemplate/AuthTemplate";
import styles from "./Registration.module.css";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setToken } from "../authSlice";
import { checkRegistrationCodeAPI } from "../API";
import { message } from "antd";
import { useNavigate } from "react-router";
import { REGISTRATION_SETUP } from "../../../processes/utils/consts";

export default function RegistrationConfirm() {
  //enter code and hit step2 function
  const [confirmationCode, setConfirmationCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email } = useSelector((state) => state.auth.user);
  // console.log(email);

  const handleCheckVerification = () => {
    dispatch(setIsLoading(true));

    if (confirmationCode) {
      checkRegistrationCodeAPI(confirmationCode, email).then((res) => {
        if (res?.status === 200) {
          console.log(res);
          console.log(res.data);
          console.log(res.data.access_token);
          dispatch(setToken(res.data?.access_token));
          localStorage.setItem("token", res.data?.access_token);
          navigate(REGISTRATION_SETUP);
        } else {
          console.log(res);
          console.log(res.data);
          message.error("smth is wrong in reg confirm");
        }
      });
    } else {
      message.error("email pochtangizga kelgan xabarni yozing");
    }
  };

  return (
    <AuthTemplate>
      <div className={styles["registration-wrapper"]}>
        <h4>Регистрация</h4>
        <p>На почту {email} было выслано Сообщение с кодом</p>

        <div className={styles["input-row"]}>
          <label htmlFor="code">Подтверждающий код</label>
          <input
            type="text"
            id="code"
            onChange={(e) => {
              setConfirmationCode(e.target.value);
            }}
            placeholder="Введите код"
          />
        </div>
        <div className={styles["registration-btn"]}>
          <Button type="full-width-primary" onClick={handleCheckVerification}>
            Create
          </Button>
        </div>
      </div>
    </AuthTemplate>
  );
}
