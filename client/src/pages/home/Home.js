// Libraries
import { useContext, useEffect } from "react";

// App modules
import { GlobalContext } from "../../context/GlobalContext";
import HomeEmployee from "./home-employee/HomeEmployee";
import HomeClient from "./home-client/HomeClient";
import CalendarContextProvider from "../../context/features/CalendarContext";

import "./Home.css";
export default function Home() {
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    document.title = "Vet Clinic";
  }, []);

  if (user.role === undefined) {
    window.location = "/login";
  }

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
    </div>
  );
}
