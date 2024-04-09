// Libraries
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// App modules
import BarPetInfo from "../view-pet/BarPetInfo";
import { getEmployeeById } from "../../services/fetchVetClinicAPI/employeesAPI";
import { updateExamination } from "../../services/fetchVetClinicAPI/examinationsAPI";

import "./Examination.css";
export default function Examination() {
  let location = useLocation();

  let [employee, setEmployee] = useState({});
  let [examinationConclusion, setExaminationConclusion] = useState(
    location.state.examination.conclusion
  );

  useEffect(() => {
    document.title = "Examination";

    const getEmployee = async () => {
      let employee = await getEmployeeById(
        location.state.examination.employeeId
      );
      setEmployee(JSON.parse(employee));
    };
    getEmployee();
  }, []);

  const handleUpdateExamination = async () => {
    try {
      const result = await updateExamination({
        examinationId: location.state.examination.examinationId,
        conclusion: examinationConclusion,
      });
      alert("Успешно запазено.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="viewexamination-wrapper">
      <BarPetInfo petInfo={location.state.petInfo} />
      <div className="examination-content glasseffect-body">
        <div className="examination-info">
          <div className="examination-title">
            <span>
              {new Date(location.state.examination.examinationDate)
                .toISOString()
                .substring(0, 16)
                .split("T")
                .join(" - ")}
            </span>
            {/* <span>
              {dayjs(
                new Date(location.state.examination.examinationDate)
              ).format("MM-DD-YYYY - HH:mm")}
            </span> */}
            <h5>Причина</h5>
            <span>
              Служител: {employee?.firstName + " " + employee?.lastName}
            </span>
          </div>
          <div className="examination-occasion">
            <p>{location.state.examination.occasion}</p>
          </div>
        </div>
        <div className="examination-conclusion">
          <h5>Решение</h5>
          <textarea
            value={examinationConclusion}
            onChange={(e) => {
              setExaminationConclusion(e.target.value);
            }}
          ></textarea>
        </div>
        <button
          type="button"
          onClick={handleUpdateExamination}
          className="save-examination-btn"
        >
          Запази
        </button>
      </div>
    </div>
  );
}
