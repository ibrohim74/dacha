import React, { useEffect, useState } from "react";
import { Icons } from "../../assets/icons/icons";
import styles from "./SearchInput.module.css";

export default function SearchInput({ elementsRef }) {
  const [query, setQuery] = useState("");

  const scrollToElement = (element) => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSearch = (event) => {
    const searchTerm = query.toLowerCase();

    if (elementsRef.current && searchTerm.length >= 3) {
      const elements = elementsRef.current.querySelectorAll("*");
      let firstMatchFound = false;

      elements.forEach((element) => {
        element.classList.remove("highlight");

        const textContent = element.innerHTML.toLowerCase();

        const regex = new RegExp(`\\b${searchTerm}\\b`, "gi");

        if (regex.test(textContent) || textContent === searchTerm) {
          if (
            !element.hasChildNodes() ||
            (element.hasChildNodes() && element.children.length === 0)
          ) {
            console.log(element);
            element.classList.add("highlight");

            if (!firstMatchFound) {
              // Scroll to the first match only
              scrollToElement(element);
              firstMatchFound = true;
            }
            // scrollToElement(element);
          }
        }
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  useEffect(() => {
    const inputElement = document.getElementById("search");
    if (inputElement) {
      inputElement.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [handleKeyPress]);

  return (
    <div className={styles["search-box"]}>
      <Icons.HeaderSearch />
      <input
        type="text"
        className={styles["search-input"]}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
}

("1. поиск срабатывает после нажатия на enter, что, возможно, не совсем очевидно для юзера. если искомое значение находится ниже видимости первого экрана, то старница скроллится вниз к результату. если поиск будет срабатывать по нажатию на клавиши, то этот эффект скроллинга может стать немного раздражающим. 2. в дальнейшем при адаптации к мобилке, где нет энтера, работа поиска может стать проблемной и неудобной. поэтому предлагаю добавить рядом кнопку (хотя бы для мобилки), по нажатию на которой будет срабатыватб поиск ");
