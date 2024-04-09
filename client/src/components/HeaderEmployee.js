// Libraries
import { Link } from "react-router-dom";

// App modules
import clinicLogo from "../assets/images/logo_dimensions.png";

import "./HeaderEmployee.css";
import { userLogout } from "../services/fetchVetClinicAPI/clientsAPI";
export default function HeaderEmployee({ firstName, lastName }) {
  return (
    <div className="header-employee ">
      <div className="side-element">
        <p className="glasseffect-body">
          {firstName} {lastName}
        </p>
      </div>
      <div className="center-elements">
        <div className="glasseffect-body header-button">
          <Link to="/">Календар</Link>
        </div>
        <div className="glasseffect-body header-button">
          <Link to="/my-examinations">Моите часове</Link>
        </div>
        <img src={clinicLogo} alt="vet-clinic-logo"></img>
        <div className="glasseffect-body header-button">
          <Link to="/find-client">Клиенти</Link>
        </div>
        <div className="glasseffect-body header-button">
          <Link to="/find-pet">Любимци</Link>
        </div>
      </div>
      <div className="side-element">
        <button
          className="glasseffect-body header-button"
          onClick={async (e) => {
            e.preventDefault();
            await userLogout();
            window.location = "/login";
          }}
        >
          Изход
        </button>
      </div>
    </div>
  );
}
