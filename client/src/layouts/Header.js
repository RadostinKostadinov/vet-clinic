// Libraries
import { useContext } from "react";

// App modules
import { GlobalContext } from "../context/GlobalContext";
import HeaderEmployee from "../components/HeaderEmployee";
import HeaderClient from "../components/HeaderClient";

import "./Header.css";
export default function Header() {
  const { user } = useContext(GlobalContext);

  return (
    <>
      <div className="header-wrapper">
        {user.role === "employee" ? (
          <HeaderEmployee firstName={user.firstName} lastName={user.lastName} />
        ) : (
          ""
        )}
        {user.role === "client" ? (
          <HeaderClient firstName={user.firstName} lastName={user.lastName} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
