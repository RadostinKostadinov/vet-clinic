// Libraries
import { Link } from "react-router-dom";

import './FindClientTableRow.css'
export default function FindClientTableRow({clientInfo}) {
  return (
    <div className="findclient-table-row">
      <div>
        <p>{`Телефон: ${clientInfo.phone}`}</p>
      </div>
      <div>
        <p>{`Потреб.: ${clientInfo.username}`}</p>
      </div>
      <div>
        <p>{`Име: ${clientInfo.firstName}`}</p>
      </div>
      <div>
        <p>{`Фамилия: ${clientInfo.lastName}`}</p>
      </div>
      <div>
        <Link to="/view-client" state={clientInfo}>
          Виж повече
        </Link>
      </div>
    </div>
  );
}
