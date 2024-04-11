import React from "react";
import styles from "./AuthTemplate.module.css";
import Logo from "../../../components/logo/Logo";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LangDropdown from "../../../components/lang-dropdown/LangDropdown";
import { useNavigate } from "react-router";

export default function AuthTemplate({ children }) {
  const navigate = useNavigate();
  return (
    <div className={styles["auth-wrapper"]}>
      <div className={styles["auth-container"]}>
        <div className={styles["auth-header"]}>
          <div
            className={styles["auth-header-back"]}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <KeyboardBackspaceIcon />
          </div>
          <div className={styles["auth-header-logo"]}>
            <Logo />
          </div>
        </div>
        {children}
      </div>
      <div className={styles["auth-lang"]}>
        <LangDropdown onlyIcon={false} />
      </div>
    </div>
  );
}
