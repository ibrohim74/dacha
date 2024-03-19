import { createContext, useContext, useState } from "react";
import i18n from "../lang/i18n";
import { languages } from "../lang/langs";

const LangContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (value) => {
    setSelectedLanguage(languages[value.key]);
    const lang_code = languages[value.key].code;
    i18n.changeLanguage(lang_code);
  };

  return (
    <LangContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        handleLanguageChange,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

function useLanguage() {
  const context = useContext(LangContext);

  if (context === undefined) {
    throw new Error("Language context was used outside of LangProvider");
  }

  return context;
}

export { LanguageProvider, useLanguage };
