// Libraries
import { useState, useContext, useEffect } from "react";

// App modules
import { CalendarContext } from "../../../../context/features/CalendarContext";
import { getWeekInfo } from "../../../../utils/getWeekInfo";
import AddExaminationPopup from "./AddExaminationPopup";
import ShowExaminationInfo from "./ShowExaminationInfo";
import WeekBottomLine from "./WeekBottomLine";
import WeekDay from "./WeekDay";
import WeekHours from "./WeekHours";
import WeekTopLine from "./WeekTopLine";

import "./WeekBody.css";
export default function WeekBody() {
  const [weekInfo, setWeekInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupHour, setPopupHour] = useState("");

  const [isExaminationOpened, setIsExaminationOpened] = useState(false);
  const [openedExamination, setOpenedExamination] = useState({});

  const { weekDay, isPopupVisible, popupDay } = useContext(CalendarContext);

  useEffect(() => {
    setIsLoading(true);
    const newWeek = async () => {
      const newWeekInfo = await getWeekInfo(weekDay);
      setWeekInfo(newWeekInfo);
    };
    newWeek();
    setIsLoading(false);
  }, [weekDay]);

  useEffect(() => {
    if (!isPopupVisible && !isExaminationOpened) {
      setIsLoading(true);
      const newWeek = async () => {
        const newWeekInfo = await getWeekInfo(weekDay);
        setWeekInfo(newWeekInfo);
      };
      newWeek();
      setIsLoading(false);
    }
  }, [isPopupVisible, isExaminationOpened]);

  return (
    <>
      <div className="week-body-wrapper glasseffect-body">
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <WeekTopLine />
            <div className="week-content">
              <WeekHours />
              {weekInfo.map((day, i) => {
                return (
                  <WeekDay
                    setOpenedExamination={setOpenedExamination}
                    setIsExaminationOpened={setIsExaminationOpened}
                    setPopupHour={setPopupHour}
                    day={day}
                    key={i}
                  />
                );
              })}
            </div>
            <WeekBottomLine weekInfo={weekInfo} />
          </>
        )}
      </div>
      {isPopupVisible && <AddExaminationPopup popupHour={popupHour} />}
      {isExaminationOpened && (
        <ShowExaminationInfo
          exam={openedExamination}
          setIsExaminationOpened={setIsExaminationOpened}
        />
      )}
    </>
  );
}
