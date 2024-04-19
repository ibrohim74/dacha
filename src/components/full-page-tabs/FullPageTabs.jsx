import React, { useState } from "react";
import styles from "./FullPageTabs.module.css";
import { Icons } from "../../assets/icons/icons";

export default function FullPageTabs({ tabs, currentTab }) {
  const [activeTab, setActiveTab] = useState(
    currentTab ? tabs[0].currentTab : tabs[0].label
  );

  const handleTabClick = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  const getActiveContent = () => {
    const foundTab = tabs.find((tab) => tab.label === activeTab);
    return foundTab ? foundTab.content : null;
  };

  return (
    <>
      <ul className={`${styles["tabs"]}`}>
        {tabs.map((tab) => (
          <li
            key={tab.label}
            className={
              activeTab === tab.label
                ? styles["tab-active"]
                : styles["tab-inactive"]
            }
            onClick={() => handleTabClick(tab.label)}
          >
            <Icons.Notes />
            {tab.label}
          </li>
        ))}
      </ul>

      {getActiveContent() && (
        <div className={styles["tab-content"]}>{getActiveContent()}</div>
      )}
    </>
  );
}

export const EmptyTab = ({ placeholderText }) => {
  return (
    <div className={styles["no-data"]}>
      <Icons.EmptyPagePlaceholder />
      <p>{placeholderText}</p>
    </div>
  );
};
