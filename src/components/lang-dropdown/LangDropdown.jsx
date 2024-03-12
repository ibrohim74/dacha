import { Dropdown, Space } from "antd";
import { Icons } from "../../assets/icons/icons";
import { useState } from "react";

const items = [
  {
    label: "English",
    icon: <Icons.English />,
    key: "0",
  },
  {
    label: "O'zbek",
    icon: <Icons.Ozbek />,
    key: "1",
  },
  {
    label: "Russian",
    icon: <Icons.Russian />,
    key: "2",
  },
];

export default function LangDropdown() {
  const [selectedLanguage, setSelectedLanguage] = useState(items[0].icon);

  console.log(selectedLanguage);
  const handleLanguageChange = (value) => {
    setSelectedLanguage(items[value.key].icon);
    console.log(value);
    console.log(selectedLanguage);
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
