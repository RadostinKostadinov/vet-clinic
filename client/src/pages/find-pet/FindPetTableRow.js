// Libraries
import { Link } from "react-router-dom";

import "./FindPetTableRow.css";
export default function FindPetTableRow({ petInfo }) {
  return (
    <div className="findpet-table-row">
      <div>
        <p>{`Вид: ${petInfo.type}`}</p>
      </div>
      <div>
        <p>{`Порода: ${petInfo.breed}`}</p>
      </div>
      <div>
        <p>{`Име: ${petInfo.name}`}</p>
      </div>
      <div>
        <p>{`Клиент: ${petInfo.clientUsername}`}</p>
      </div>
      <div>
        <Link to="/view-pet" state={petInfo}>
          Виж повече
        </Link>
      </div>
    </div>
  );
}
