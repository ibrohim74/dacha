import React, { useState } from "react";
import styles from "./Tabs.module.css";

export default function Tabs({ firstTab, secondTab, content, currentTab }) {
  const [activeTab, setActiveTab] = useState(
    currentTab ? currentTab : firstTab
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const activeContent =
    activeTab === firstTab ? content.firstTab : content.secondTab;

  return (
    <>
      <ul className={`${styles["tabs"]} }`}>
        <li
          className={
            activeTab === firstTab
              ? styles["tab-active"]
              : styles["tab-inactive"]
          }
          onClick={() => handleTabClick(firstTab)}
        >
          {firstTab}
        </li>
        <li
          className={
            activeTab === secondTab
              ? styles["tab-active"]
              : styles["tab-inactive"]
          }
          onClick={() => handleTabClick(secondTab)}
        >
          {secondTab}
        </li>
      </ul>

      {activeContent && (
        <div className={styles["tab-content"]}>{activeContent}</div>
      )}
    </>
  );
}
