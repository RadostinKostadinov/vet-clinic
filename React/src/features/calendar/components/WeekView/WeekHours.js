// Libraries
import { useRef, useEffect } from "react";

import "./WeekHours.css";
export default function WeekHours() {
  const ClinicOpeningHour = useRef(null);

  useEffect(() => {
    ClinicOpeningHour.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const hours = new Array(24).fill([]);
  return (
    <>
      <div className="week-hours-horizontal"></div>
      <div className="week-hours">
        {hours.map((h, i) => {
          if (i === 0) return;
          if (i === 9) {
            return (
              <div
                ref={ClinicOpeningHour}
                key={i}
                className="week-hour"
                style={{ top: i * 100 + 10 + "px" }}
              >
                {i.toString().padStart(2, "0")}:00
              </div>
            );
          }
          return (
            <div
              key={i}
              className="week-hour"
              style={{ top: i * 100 + 10 + "px" }}
            >
              {i.toString().padStart(2, "0")}:00
            </div>
          );
        })}
      </div>
    </>
  );
}
