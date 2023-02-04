// Libraries
import { Link } from "react-router-dom";

// App modules
import clinicLogo from "../assets/images/logo_dimensions.png";

import "./HeaderEmployee.css";
export default function HeaderEmployee() {
  return (
    <div className="header-employee ">
      <div className="side-element">
        <p className="glasseffect-body">User.firstname User.Lastname</p>
      </div>
      <div className="center-elements">
        <div className="glasseffect-body header-button">
          <Link to="/">Календар</Link>
        </div>
        <div className="glasseffect-body header-button">
          <Link to="/my-examinations">Моите часове</Link>
        </div>
        <img src={clinicLogo}></img>
        <div className="glasseffect-body header-button">
          <Link to="/find-client">Клиенти</Link>
        </div>
        <div className="glasseffect-body header-button">
          <Link to="/find-pet">Любимци</Link>
        </div>
      </div>
      <div className="side-element">
        <button className="glasseffect-body header-button">Изход</button>
      </div>
    </div>
  );
}
