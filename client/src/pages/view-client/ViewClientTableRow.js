// Libraries
import React from "react";
import { Link } from "react-router-dom";

import "./ViewClientTableRow.css";
export default function ViewPetTableRow({ pet, clientInfo }) {
  return (
    <div className="viewclient-table-row">
      <div>
        <p>{`Вид: ${pet.type}`}</p>
      </div>
      <div>
        <p>{`Порода: ${pet.breed}`}</p>
      </div>
      <div>
        <p>{`Име: ${pet.name}`}</p>
      </div>
      <div>
        <Link
          to="/view-pet"
          state={Object.assign(
            { clientName: clientInfo.firstName + " " + clientInfo.lastName },
            pet,
            clientInfo
          )}
        >
          Виж повече
        </Link>
      </div>
    </div>
  );
}
