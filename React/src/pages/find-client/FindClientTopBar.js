// Libraries

// App modules
import { getAllClients } from "../../services/clientsAPI";

import "./FindClientTopBar.css";
export default function FindClientTopBar({
  clientSearchTerm,
  setClientSearchTerm,
  setIsPopupVisible,
  setClientsFound,
  setIsAllFetched,
}) {
  const handleClickAllClients = async () => {
    let allClients = await getAllClients();
    allClients = allClients.map((client) => {
      return JSON.parse(client);
    });
    setIsAllFetched(true);
    setClientSearchTerm("");
    setClientsFound(allClients);
  };

  return (
    <div className="findclient-bar-wrapper">
      <button
        type="button"
        className="create-client-button"
        onClick={() => {
          setIsPopupVisible(true);
        }}
      >
        Нов клиент
      </button>
      <h2 className="findclient-bar-heading">Търси клиент</h2>
      <div className="findclient-bar-input-wrapper">
        <div style={{ display: "flex" }}>
          <input
            placeholder="Въведете име на клиент"
            value={clientSearchTerm}
            onChange={(e) => {
              setClientSearchTerm(e.target.value);
            }}
            className="findclient-bar-input"
          ></input>
        </div>
      </div>
      <button
        type="button"
        className="get-all-clients-button"
        onClick={handleClickAllClients}
      >
        Покажи всички
      </button>
    </div>
  );
}
