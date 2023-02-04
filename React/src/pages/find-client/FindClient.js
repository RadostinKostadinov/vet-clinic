// Libraries
import { useState, useEffect } from "react";

// App modules
import AddClientPopup from "./AddClientPopup";
import { getClientsByTerm } from "../../services/clientsAPI";
import FindClientTableRow from "./FindClientTableRow";
import FindClientTopBar from "./FindClientTopBar";

import "./FindClient.css";
export default function FindClient() {
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [clientsFound, setClientsFound] = useState([]);
  const [isClientFound, setIsClientFound] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAllFetched, setIsAllFetched] = useState(false);

  useEffect(() => {
    document.title = "Find Client";
  }, []);

  useEffect(() => {
    if (clientSearchTerm.length === 3 && !isAllFetched) {
      getClients();
    }
  }, [clientSearchTerm]);

  useEffect(() => {
    if (!isPopupVisible && !isAllFetched) {
      getClients();
    }
  }, [isPopupVisible]);

  const getClients = async () => {
    let clients = await getClientsByTerm(clientSearchTerm);
    if (Array.isArray(clients) === false) {
      clients = [];
      setIsClientFound(false);
    } else {
      setIsClientFound(true);
    }
    setClientsFound(clients);
  };

  return (
    <div className="findclient-wrapper">
      <FindClientTopBar
        clientSearchTerm={clientSearchTerm}
        setClientSearchTerm={setClientSearchTerm}
        setIsPopupVisible={setIsPopupVisible}
        setClientsFound={setClientsFound}
        setIsAllFetched={setIsAllFetched}
      />
      <div className="findclient-content glasseffect-body">
        {clientsFound
          .filter((client) => {
            const clientUsername = client.username.toLocaleLowerCase();
            const clientFirstname = client.firstName.toLocaleLowerCase();
            const clientLastname = client.lastName.toLocaleLowerCase();
            const clientPhone = client.phone;
            const clientId = client.clientId.toString();
            return (
              clientId.includes(clientSearchTerm.toLocaleLowerCase()) ||
              clientUsername.includes(clientSearchTerm.toLocaleLowerCase()) ||
              clientPhone.includes(clientSearchTerm.toLocaleLowerCase()) ||
              clientFirstname.includes(clientSearchTerm.toLocaleLowerCase()) ||
              clientLastname.includes(clientSearchTerm.toLocaleLowerCase())
            );
          })
          .map((client, i) => {
            return <FindClientTableRow clientInfo={client} key={i} />;
          })}
      </div>
      {isPopupVisible && (
        <AddClientPopup setIsPopupVisible={setIsPopupVisible} />
      )}
    </div>
  );
}
