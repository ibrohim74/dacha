import { Dropdown, Space } from "antd";
import { Icons } from "../../assets/icons/icons";
import React, { useState } from "react";
import i18n from "../../lang/i18n";

const items = [
  {
    label: "English",
    icon: <Icons.English />,
    key: "0",
    code: "en",
  },
  {
    label: "O'zbek",
    icon: <Icons.Ozbek />,
    key: "1",
    code: "uz",
  },
  {
    label: "Russian",
    icon: <Icons.Russian />,
    key: "2",
    code: "ru",
  },
];

export default function LangDropdown() {
  const [selectedLanguage, setSelectedLanguage] = useState(items[0].icon);

  const handleLanguageChange = (value) => {
    // console.log(value);
    setSelectedLanguage(items[value.key].icon);
    const lang_code = items[value.key].code;
    i18n.changeLanguage(lang_code);
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleLanguageChange,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>{selectedLanguage}</Space>
      </a>
    </Dropdown>
  );
}
