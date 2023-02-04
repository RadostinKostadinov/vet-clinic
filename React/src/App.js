import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import { GlobalContext } from "./context/GlobalContext";

import Header from "./layouts/Header";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Examination from "./pages/examination/Examination";
import MyExaminations from "./pages/my-examinations/MyExaminations";
import FindClient from "./pages/find-client/FindClient";
import FindPet from "./pages/find-pet/FindPet";
import ViewClient from "./pages/view-client/ViewClient";
import ViewPet from "./pages/view-pet/ViewPet";

function App() {
  const { setUser } = useContext(GlobalContext);

  useEffect(() => {
    setUser({ role: "employee" });
  }, []);

  return (
    <>
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/examination" element={<Examination />} />
          <Route path="/my-examinations" element={<MyExaminations />} />
          <Route path="/find-client" element={<FindClient />} />
          <Route path="/find-pet" element={<FindPet />} />
          <Route path="/view-client" element={<ViewClient />} />
          <Route path="/view-pet" element={<ViewPet />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
