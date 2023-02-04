// Libraries
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const values = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    isEmployee,
    setIsEmployee
  };

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
