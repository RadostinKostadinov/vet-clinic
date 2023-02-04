// Libraries
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import "./ViewPetTableRow.css";
export default function ViewPetTableRow({ examination, petInfo }) {
  return (
    <div className="viewpet-table-row">
      <div>
        <p>{`Дата: ${dayjs(new Date(examination.examinationDate)).format(
          "DD-MM-YYYY"
        )}`}</p>
      </div>
      <div style={{ flex: 4, justifyContent: "center" }}>
        <p>{`Причина: ${examination.occasion}`}</p>
      </div>
      <div>
        <Link to="/examination" state={{ examination, petInfo }}>
          Виж повече
        </Link>
      </div>
    </div>
  );
}
