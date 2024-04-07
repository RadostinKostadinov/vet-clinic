// Libraries
import { useContext } from "react";

// App modules
import { CalendarContext } from "../../../../context/features/CalendarContext";

import "./ChangeMonthBtn.css";
export default function ChangeMonthBtn({ month }) {
  const { monthIndex, setMonthIndex } = useContext(CalendarContext);

  return (
    <button
      className={`glasseffect-body smallbutton ${
        month === monthIndex + 1 ? "active" : ""
      }`}
      onClick={() => setMonthIndex(month - 1)}
    >
      {month.toString().padStart(2, "0")}
    </button>
  );
}
