// Libraries
import { useContext, useEffect } from "react";

// App modules
import { GlobalContext } from "../../context/GlobalContext";
import HomeEmployee from "./home-employee/HomeEmployee";
import HomeClient from "./home-client/HomeClient";
import HomeLogin from "./home-login/HomeLogin";
import CalendarContextProvider from "../../context/features/CalendarContext";

import "./Home.css";
export default function Home() {
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    document.title = "Vet Clinic"
  }, [])

  return (
    <div className="home-wrapper">
      {user.role === "employee" ? (
        <CalendarContextProvider>
          <HomeEmployee />
        </CalendarContextProvider>
      ) : (
        ""
      )}
      {user.role === "client" ? <HomeClient /> : ""}
      {user.role ? "" : <HomeLogin />}
    </div>
  );
}
