// Libraries
import { useContext } from "react";
import dayjs from "dayjs";

// App modules
import { CalendarContext } from "../../../../context/features/CalendarContext";
import WeekExamination from "./WeekExamination";

import "./WeekDay.css";
export default function WeekDay({
  day,
  setPopupHour,
  setOpenedExamination,
  setIsExaminationOpened,
}) {
  const { setIsPopupVisible, setPopupDay, setPopupDayExaminations } =
    useContext(CalendarContext);

  const handleAddExamination = (e) => {
    setPopupDay(new Date(day.date));
    setPopupDayExaminations(day.examinations);
    setIsPopupVisible(true);
  };

  const isPast = (() => {
    return dayjs(day.date).isBefore(new Date(), "day");
  })();

  return (
    <div
      className={`week-day-col ${isPast ? "pastday" : ""}`}
      onClick={() => {
        if (isPast) return;
        handleAddExamination();
      }}
    >
      {day.examinations.map((examination, i) => {
        return (
          <WeekExamination
            setOpenedExamination={setOpenedExamination}
            setIsExaminationOpened={setIsExaminationOpened}
            examination={examination}
            key={i}
          />
        );
      })}
      {new Array(24).fill(null).map((hour, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              setPopupHour(`${i.toString().padStart(2, 0)}:00`);
            }}
            className="week-day-col-hours-divider"
            style={{
              top: i * 120 + "px",
            }}
          ></div>
        );
      })}
    </div>
  );
}
