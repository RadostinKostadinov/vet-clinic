// Libraries
import { useContext } from "react";

// App modules
import { CalendarContext } from "../../../../context/features/CalendarContext";

import "./MonthDay.css";
export default function Day({ day, rowIdx, cell }) {
  const { monthIndex, setWeekDay, setIsWeekView } = useContext(CalendarContext);

  const cellNumber = Number(rowIdx) * 7 + Number(cell);

  const handleCellClick = () => {
    const year = day.year();
    const month = monthIndex;
    const chosenDay = Number(day.format("D"));
    setWeekDay(new Date(year, monthIndex, chosenDay));
    setIsWeekView(true);
  };

  const isFromThisMonth = (() => {
    if (
      (day.format("D") > 7 && rowIdx === 0) ||
      (day.format("D") < 14 && (rowIdx === 5 || rowIdx === 4))
    ) {
      return false;
    } else {
      return true;
    }
  })();

  return (
    <div
      className={`day-wrapper glasseffect-innerel-center ${
        isFromThisMonth ? "active" : "inactive"
      } ${cellNumber === 35 ? "day-36-bottomleft" : ""} ${
        cellNumber === 41 ? "day-42-bottomright" : ""
      }`}
      onClick={isFromThisMonth ? handleCellClick : () => {}}
    >
      <header>
        <p>{day.format("DD")}</p>
      </header>
    </div>
  );
}
