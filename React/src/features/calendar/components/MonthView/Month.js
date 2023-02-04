// Libraries
import React, { useState, useContext, useEffect } from "react";

// App modules
import MonthDay from "./MonthDay";
import MonthTopBar from "./MonthTopBar";
import { getMonthInfo } from "../../../../utils/getMonthInfo";
import { CalendarContext } from "../../../../context/features/CalendarContext";

import "./Month.css";
export default function Month() {
  const [monthMatrix, setMonthMatrix] = useState(getMonthInfo());
  const { monthIndex, isWeekView } = useContext(CalendarContext);

  useEffect(() => {
    setMonthMatrix(getMonthInfo(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <MonthTopBar />
      <div className="month-wrapper glasseffect-body">
        <div className="month-head glasseffect-innerel-top">
          <div>
            <p>Понеделник</p>
          </div>
          <div>
            <p>Вторник</p>
          </div>
          <div>
            <p>Сряда</p>
          </div>
          <div>
            <p>Четвъртък</p>
          </div>
          <div>
            <p>Петък</p>
          </div>
          <div>
            <p>Събота</p>
          </div>
          <div>
            <p>Неделя</p>
          </div>
        </div>
        <div className="month-grid">
          {monthMatrix.map((row, i) => {
            return (
              <React.Fragment key={i}>
                {row.map((day, k) => {
                  return <MonthDay day={day} key={k} rowIdx={i} cell={k}/>;
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
