import { Dropdown, Space } from "antd";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/LangContext";
import { languages } from "../../lang/langs";

export default function LangDropdown({ onlyIcon = true }) {
  const { handleLanguageChange, selectedLanguage } = useLanguage();

  return (
    <Dropdown
      menu={{
        items: languages,
        onClick: handleLanguageChange,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {onlyIcon ? (
            <>{selectedLanguage.icon}</>
          ) : (
            <>
              {selectedLanguage.icon} {selectedLanguage.label} <DownOutlined />
            </>
          )}
        </Space>
      </a>
    </Dropdown>
  );
}
