import React, { useRef } from "react";
import Header from "../header/Header";
import styles from "./AppLayout.module.css";
import Footer from "../footer/footer";
import ServerProblems from "../server-problems/ServerProblems";

export default function AppLayout({ children, elementsRef }) {
  return (
    <div ref={elementsRef}>
      <div className={styles["container"]}>
        <Header elementsRef={elementsRef} />
        {children}
      </div>
      <Footer />
      {/* <ServerProblems /> */}
    </div>
  );
}
