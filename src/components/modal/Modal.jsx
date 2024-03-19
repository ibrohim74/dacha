import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Button from "../Button/Button";
import styles from "./Modal.module.css";
import { CloseOutlined, XOutlined } from "@ant-design/icons";
import { X } from "@mui/icons-material";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, title }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal"]} ref={ref}>
        <div className={styles["modal-header"]}>
          <h3>{title}</h3>
          <button className={styles["modal-btn"]} onClick={close}>
            <CloseOutlined />
          </button>
        </div>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
