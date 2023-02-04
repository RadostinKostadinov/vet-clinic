// Libraries
import { useContext } from "react";

// App modules
import ChangeMonthBtn from "./ChangeMonthBtn";
import { CalendarContext } from "../../../../context/features/CalendarContext";

import "./MonthTopBar.css";
export default function MonthTopBar() {
  const { setIsWeekView, setWeekDay } = useContext(CalendarContext);

  const handleWeekButton = async (e) => {
    setWeekDay(new Date());
    setIsWeekView(true);
  };

  return (
    <div className="month-bar-wrapper">
      <div>
        <button
          className="glasseffect-body bigbuttons"
          onClick={handleWeekButton}
        >
          Тази седмица
        </button>
      </div>
      <div className="months-wrapper">
        {[...Array(12)].map((x, i) => (
          <ChangeMonthBtn month={i + 1} key={i} />
        ))}
      </div>
      <div>
        <button className="glasseffect-body bigbuttons active">Месец</button>
      </div>
    </div>
  );
}
