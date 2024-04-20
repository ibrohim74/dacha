import { useContext } from "react";
import { CatalogueContext } from "../context/CatalogueContext";

function useSearch() {
  const { searchParams } = useContext(CatalogueContext);

  function isValidBooking(cottage) {
    const { start_date, end_date } = searchParams;

    if (!start_date || !end_date || !cottage.working_days) {
      return true;
    }

    const cottageWorkingDays = Object.keys(cottage.working_days).filter(
      (day) => cottage.working_days[day]
    );

    const userStartDate = new Date(start_date);
    const userEndDate = new Date(end_date);
    const daysInRange =
      (userEndDate - userStartDate) / (1000 * 60 * 60 * 24) + 1;

    const cottageWorkingDaysInRange = cottageWorkingDays.filter((day) => {
      const date = new Date(userStartDate);
      date.setDate(userStartDate.getDate() + parseInt(day, 10));
      return cottageWorkingDays.includes(String(date.getDay()));
    });

    return (
      cottageWorkingDaysInRange.length === daysInRange &&
      daysInRange >= cottage.minimum_book_days
    );
  }

  return {
    isValidBooking,
  };
}

export default useSearch;
