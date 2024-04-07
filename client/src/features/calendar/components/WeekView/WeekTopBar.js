// Libraries
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

// App modules
import { CalendarContext } from "../../../../context/features/CalendarContext";


import "./WeekTopBar.css";
dayjs.extend(weekOfYear);

export default function MonthTopBar() {
  const { setIsWeekView, setMonthIndex, weekDay, setWeekDay } =
    useContext(CalendarContext);
  const [isNextWeek, setIsNextWeek] = useState(false);
  const [isCurrentWeek, setIsCurrentWeek] = useState(false);

  useEffect(() => {
    const chosenWeek = dayjs(weekDay).week();
    const currentWeek = dayjs(new Date()).week();
    const nextWeek = currentWeek + 1;

    if (chosenWeek === currentWeek) {
      setIsCurrentWeek(true);
      setIsNextWeek(false);
    } else if (nextWeek === chosenWeek) {
      setIsCurrentWeek(false);
      setIsNextWeek(true);
    } else {
      setIsCurrentWeek(false);
      setIsNextWeek(false);
    }
  }, [weekDay]);

  const handleCurrentWeekButton = (e) => {
    setWeekDay(new Date());
  };

  const handleNextWeekButton = (e) => {
    const today = new Date();
    const nextWeekDay = new Date(new Date().setDate(today.getDate() + 7));
    setWeekDay(nextWeekDay);
  };

  const handleMonthButton = (e) => {
    setIsWeekView(false);
    setMonthIndex(dayjs().month());
  };

  return (
    <div className="week-bar-wrapper">
      <div>
        <button
          className={`glasseffect-body bigbuttons ${
            isCurrentWeek ? "active" : ""
          }`}
          onClick={handleCurrentWeekButton}
        >
          Тази седмица
        </button>
      </div>
      <div>
        <button
          className={`glasseffect-body bigbuttons ${
            isNextWeek ? "active" : ""
          }`}
          onClick={handleNextWeekButton}
        >
          Следваща седмица
        </button>
        <button
          className="glasseffect-body bigbuttons"
          onClick={handleMonthButton}
        >
          Месец
        </button>
      </div>
    </div>
  );
}
