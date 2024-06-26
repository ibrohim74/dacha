import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ANNOUNCEMENT,
  CABINET,
  LOGIN_ROUTE,
  POLICY,
  PROFILE,
} from "../../../processes/utils/consts";
import { message, Select } from "antd";
import { checkEmailAPI } from "../../../store/auth/authActions";
import AuthTemplate from "../AuthTemplate/AuthTemplate";
import Tabs from "../../../components/tabs/Tabs";
import styles from "./Registration.module.css";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUserField } from "../../../store/auth/authSlice";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const [userAgreementAccepted, setUserAgreementAccepted] = useState(false);
  const [selectedVerificationType, setSelectedVerificationType] = useState("");
  const verificationType = useSelector((state) => state.auth.verificationType);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyType = () => {
    if (!userAgreementAccepted) {
      // error messages here or notification!
      return;
    }
    console.log(selectedVerificationType);
    //check email by regex and phone number
    dispatch(checkEmailAPI(selectedVerificationType));
    dispatch(setUserField({ field: "email", value: selectedVerificationType }));

    navigate("/registration-confirm");
  };

  return (
    <AuthTemplate>
      <div className={styles["registration-wrapper"]}>
        <h4>{t("")}</h4>
        <Tabs
          firstTab={t("auth_registration_first_tab")}
          secondTab={t("auth_registration_second_tab")}
          content={{
            firstTab: (
              <div className={styles["registration-tab-content"]}>
                <div className={styles["input-row"]}>
                  <label htmlFor="phone">
                    {t("auth_registration_first_input")}
                  </label>
                  <input
                    type="text"
                    id="phone"
                    autoComplete={"new-email"}
                    value={selectedVerificationType}
                    onChange={(e) =>
                      setSelectedVerificationType(e.target.value)
                    }
                    placeholder={t("auth_registration_first_input_placeholder")}
                  />
                </div>
              </div>
            ),
            secondTab: (
              <div className={styles["registration-tab-content"]}>
                <div className={styles["input-row"]}>
                  <label htmlFor="email">
                    {t("auth_registration_second_input")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete={"new-email"}
                    value={selectedVerificationType}
                    onChange={(e) =>
                      setSelectedVerificationType(e.target.value)
                    }
                    placeholder={t(
                      "auth_registration_second_input_placeholder"
                    )}
                  />
                </div>
              </div>
            ),
          }}
        />

        <div className={styles["user-agreement"]}>
          <label htmlFor="user-agreement">
            {t("auth_user_agreement")}{" "}
            <Link to={POLICY}>{t("auth_user_agreement_link")}</Link>
          </label>
          <input
            type="checkbox"
            id="user-agreement"
            value={userAgreementAccepted}
            onChange={(e) => setUserAgreementAccepted(e.target.value)}
          />
        </div>

        <Button
          disabled={!userAgreementAccepted}
          type="full-width-primary"
          onClick={handleVerifyType}
        >
          {t("continue")}
        </Button>
      </div>
    </AuthTemplate>
  );
};

export default Registration;

{
  /* <div className={style.regContainer}>
      <div className={style.regBox}>
        <div className={style.regLogo}>
          <Icons.Logo />
          <div>Travid</div>
        </div>
        <span className={style.subTitleReg}>Создать учётный запись</span>

        {step1 && (
          <div autoComplete={"off"} className={style.regContent}>
            <div className={style.regInput}>
              <label htmlFor="userType">Кем вы являетесь</label>
              <Select
                id={"userType"}
                value={initialState?.role}
                defaultValue={initialState?.role}
                style={{
                  width: "100%",
                }}
                onChange={handleTypeUser}
                options={[
                  {
                    value: "user",
                    label: "покупатель",
                  },
                  {
                    value: "seller",
                    label: "Продовец",
                  },
                ]}
              />
            </div>
            <div className={style.regInput}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                autoComplete={"off"}
                value={initialState?.email}
                onChange={(e) =>
                  setInitialState({ ...initialState, email: e.target.value })
                }
              />
            </div>

            <div className={style.regInput}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                autoComplete={"off"}
                value={initialState?.password}
                onChange={(e) =>
                  setInitialState({ ...initialState, password: e.target.value })
                }
              />
              {initialState.password && pass}
            </div>

            <div className={style.regInput}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                autoComplete={"off"}
                value={confirmPass?.passConfirm}
                onChange={(e) =>
                  setConfirmPass({
                    ...confirmPass,
                    passConfirm: e.target.value,
                  })
                }
              />
            </div>

            <div className={style.regCheckBox}>
              <label htmlFor="checkBox">
                I give my consent to Travid and persons acting on its behalf to
                process my personal data in accordance{" "}
                <Link to={POLICY} style={{ color: "black" }}>
                  with the Policy
                </Link>
              </label>
              <input
                type="checkbox"
                id="checkBox"
                autoComplete={"off"}
                checked={confirmPass?.checkBox}
                onChange={(e) =>
                  setConfirmPass({ ...confirmPass, checkBox: e.target.checked })
                }
              />
            </div>
            {loading ? (
              <div className={style.regButton} disabled={true}>
                <LoadingOutlined />
              </div>
            ) : (
              <div className={style.regButton} onClick={handleSend}>
                <button>Далее</button>
              </div>
            )}
          </div>
        )}
        {step2 && (
          <div autoComplete={"off"} className={style.regContent}>
            <div className={style.regInput}>
              <label htmlFor="checkCode">Потвердите почту</label>
              <input
                type={"number"}
                onChange={(e) =>
                  setCheckCode({ ...checkCode, code: e.target.value })
                }
              />
            </div>
            {loading ? (
              <div className={style.regButton} disabled={true}>
                <LoadingOutlined />
              </div>
            ) : (
              <div className={style.regButton} onClick={handleSendStep2}>
                <button>Далее</button>
              </div>
            )}
          </div>
        )}
        {step3 && (
          <div autoComplete={"off"} className={style.regContent}>
            <div className={style.regInput}>
              <label htmlFor="email">Юзернейм</label>
              <input
                type="text"
                id="username"
                autoComplete={"off"}
                value={initialState?.username}
                onChange={(e) =>
                  setInitialState({ ...initialState, username: e.target.value })
                }
              />
            </div>

            <div className={style.regInput}>
              <label htmlFor="firstName">Имя</label>
              <input
                type="text"
                id="firstName"
                autoComplete={"off"}
                value={initialState?.firstName}
                onChange={(e) =>
                  setInitialState({
                    ...initialState,
                    firstName: e.target.value,
                  })
                }
              />
            </div>

            <div className={style.regInput}>
              <label htmlFor="lastName">Фамиля</label>
              <input
                type="text"
                id="lastName"
                autoComplete={"off"}
                value={initialState?.lastName}
                onChange={(e) =>
                  setInitialState({
                    ...initialState,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
            {loading ? (
              <div className={style.regButton} disabled={true}>
                <LoadingOutlined />
              </div>
            ) : (
              <div className={style.regButton} onClick={handleSendStep3}>
                <button>Создать</button>
              </div>
            )}
          </div>
        )}
      </div>
      <Link
        to={LOGIN_ROUTE}
        style={{
          marginTop: "2%",
          color: "#6B6B6B",
          cursor: "pointer",
        }}
      >
        Уже есть аккаунт?
      </Link>
    </div> */
}

// const [initialState, setInitialState] = useState({
//   email: "",
//   password: "",
//   username: "",
//   lastName: "",
//   firstName: "",
//   role: "user",
// });
// const [confirmPass, setConfirmPass] = useState({
//   passConfirm: "",
//   checkBox: false,
// });
// const [checkCode, setCheckCode] = useState();
// const [step1, setStep1] = useState(true);
// const [step2, setStep2] = useState(false);
// const [step3, setStep3] = useState(false);
// const [token, setToken] = useState();
// const [loading, setLoading] = useState(false);
// const navigate = useNavigate();

// const isStrongPassword = (pass) => {
//   var protect = 0;

//   if (pass.length < 8) {
//     return "Слабый";
//   }

//   //a,s,d,f
//   var small = "([a-z]+)";
//   if (pass.match(small)) {
//     protect++;
//   }

//   //A,B,C,D
//   var big = "([A-Z]+)";
//   if (pass.match(big)) {
//     protect++;
//   }
//   //1,2,3,4,5 ... 0
//   var numb = "([0-9]+)";
//   if (pass.match(numb)) {
//     protect++;
//   }
//   //!@#$
//   var vv = /\W/;
//   if (pass.match(vv)) {
//     protect++;
//   }

//   if (protect === 2) {
//     return "Средний";
//   }
//   if (protect === 3) {
//     return "Хороший";
//   }
//   if (protect === 4) {
//     return "Высокий";
//   }
// };

// const pass = isStrongPassword(initialState?.password);

// const handleSend = () => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const pass = isStrongPassword(initialState.password);
//   console.log(pass);
//   setLoading(true);
//   if (initialState?.email && emailRegex.test(initialState.email)) {
//     if (pass === "Средний" || pass === "Хороший" || pass === "Высокий") {
//       if (initialState.password === confirmPass.passConfirm) {
//         if (confirmPass.checkBox) {
//           setStep1(false);
//           setStep3(false);
//           CheckEmailAPI(initialState?.email).then((r) => {
//             if (r === 200) {
//               setLoading(false);
//               setStep2(true);
//               setStep3(false);
//               setStep1(false);
//             } else {
//               setStep2(false);
//               setStep3(false);
//               setStep1(true);
//               setLoading(false);
//               message.error("bu email registratsiyadan otgan");
//             }
//           });
//         } else {
//           message.error("policy");
//           setLoading(false);
//         }
//       } else {
//         message.error("confirm pass");
//         setLoading(false);
//       }
//     } else {
//       message.error("parol slabiy");
//       setLoading(false);
//     }
//   } else {
//     setLoading(false);
//     message.error("Please enter a valid email");
//   }
// };

// const handleSendStep2 = () => {
//   setLoading(true);
//   if (initialState?.email) {
//     if (checkCode?.code) {
//       CheckRegistrationCodeAPI(checkCode.code, initialState.email).then(
//         (r) => {
//           if (r?.status === 200) {
//             setToken(r.data?.access_token);
//             localStorage.setItem("token", r.data?.access_token);
//             setStep3(true);
//             setStep1(false);
//             setStep2(false);
//             setLoading(false);
//           } else {
//             message.error("xabar jonatishda xatolik");
//             setLoading(false);
//             setStep3(false);
//             setStep1(false);
//             setStep2(true);
//           }
//         }
//       );
//     } else {
//       setLoading(false);
//       message.error("email pochtangizga kelgan xabarni yozing");
//     }
//   }
// };

// const handleSendStep3 = async () => {
//   setLoading(true);
//   if (
//     initialState.username &&
//     initialState.firstName &&
//     initialState.lastName
//   ) {
//     const res = await axios.post(
//       "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api/register",
//       initialState,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       }
//     );

//     if (res?.status === 200) {
//       setLoading(false);
//       window.location.assign(LOGIN_ROUTE);
//     } else {
//       console.log(res);
//       setLoading(false);
//       setStep3(true);
//       setStep1(false);
//       setStep2(false);
//     }
//   } else {
//     setLoading(false);
//     message.error("Please fill in all fields");
//   }
// };

// const handleTypeUser = (val) => {
//   setInitialState({ ...initialState, role: val });
// };
