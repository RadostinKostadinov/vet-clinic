import "./WeekExamination.css";
export default function WeekExamination({
  examination,
  setOpenedExamination,
  setIsExaminationOpened
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpenedExamination(examination);
        setIsExaminationOpened(true);
      }}
      className="week-examination"
      style={{
        top:
          (parseInt(examination.examinationDate.substr(11, 2)) * 60 +
            parseInt(examination.examinationDate.substr(14, 4))) *
            2 +
          "px",
        height: Number(examination.duration) * 2 + "px",
      }}
    ></div>
  );
}
