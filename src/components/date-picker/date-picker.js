import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./date-picker.module.css";

const DatePicker = (props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isClearing, setIsClearing] = useState(false);

  const year = new Date().getFullYear(); // Current year
  const month = Number(props.month);

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = [...Array(daysInMonth).keys()].map((i) => i + 1);

  const handleMouseDown = (day) => {
    setIsMouseDown(true);
    // setSelectedDates([day]);
    setSelectedDates((prevDates) => {
      if (prevDates.includes(day)) {
        // If the day is already selected, remove it
        setIsClearing(true);
        return prevDates.filter((date) => date !== day);
      } else {
        setIsClearing(false);
        // If the day is not selected, add it
        return [...prevDates, day];
      }
    });
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = (day) => {
    if (isMouseDown) {
      setSelectedDates((prevDates) => {
        if (isClearing) {
          // If isClearing is true, remove the day
          return prevDates.filter((date) => date !== day);
        } else {
          // If isClearing is false, add the day
          // But first check if the day is already in the array to avoid duplicates
          if (!prevDates.includes(day)) {
            return [...prevDates, day];
          } else {
            return prevDates;
          }
        }
      });
    }
  };

  return (
    <div className={styles["dates-grid"]} onMouseUp={handleMouseUp}>
      {Array.from({ length: 7 }, (_, i) =>
        new Date(2000, 0, i + 3).toLocaleString("ru", { weekday: "short" })
      ).map((day) => (
        <div className={styles["weekdays"]}>{day}</div>
      ))}
      {Array.from({ length: (firstDay + 6) % 7 }).map((_, index) => (
        <div key={index}></div>
      ))}
      {dates.map((day, index) => (
        <div
          key={index}
          onMouseDown={() => handleMouseDown(day)}
          onMouseEnter={() => handleMouseEnter(day)}
          style={{
            backgroundColor: selectedDates.includes(day)
              ? "lightgrey"
              : "white",
          }}
          className={styles["numbers"]}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default DatePicker;
