import "./WeekBottomLine.css";
export default function WeekBottomLine({ weekInfo }) {
  return (
    <div className="week-bottom-line">
      <div className="startspace"></div>
      {weekInfo.map((day, i) => {
        return (
          <div className="week-of-day"  key={i}>
            {day.date.format("DD/MM/YYYY")}
          </div>
        );
      })}
      <div className="endspace"></div>

    </div>
  );
}
