// Libraries
import { useContext, useEffect } from "react";

// App modules
import { GlobalContext } from "../../context/GlobalContext";
import HomeEmployee from "./home-employee/HomeEmployee";
import HomeClient from "./home-client/HomeClient";
import CalendarContextProvider from "../../context/features/CalendarContext";

import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Vet Clinic";
  }, []);

  useEffect(() => {
    if (user.role === undefined) {
      navigate('/login');
    }
  }, [user, navigate]);

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
