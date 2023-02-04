// Libraries
import dayjs from "dayjs";
import { createContext, useState } from "react";

export const CalendarContext = createContext({});

export default function CalendarContextProvider({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [isWeekView, setIsWeekView] = useState(false);
  const [weekDay, setWeekDay] = useState(new Date());
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupDay, setPopupDay] = useState(new Date());
  const [popupDayExaminations, setPopupDayExaminations] = useState([]);

  const values = {
    monthIndex,
    setMonthIndex,
    isWeekView,
    setIsWeekView,
    weekDay,
    setWeekDay,
    isPopupVisible,
    setIsPopupVisible,
    popupDay,
    setPopupDay,
    popupDayExaminations,
    setPopupDayExaminations,
  };

  return (
    <CalendarContext.Provider value={values}>
      {children}
    </CalendarContext.Provider>
  );
}
