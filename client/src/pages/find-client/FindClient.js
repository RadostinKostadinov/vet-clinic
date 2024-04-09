// Libraries
import { useState, useEffect } from "react";

// App modules
import AddClientPopup from "./AddClientPopup";
import {
  getClientsByTerm,
  getAllClients,
} from "../../services/fetchVetClinicAPI/clientsAPI";
import FindClientTableRow from "./FindClientTableRow";
import FindClientTopBar from "./FindClientTopBar";

import "./FindClient.css";
export default function FindClient() {
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [clientsFound, setClientsFound] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAllFetched, setIsAllFetched] = useState(false);

  useEffect(() => {
    document.title = "Find Client";
    loadAllClients();
  }, []);

  useEffect(() => {
    loadAllClients();
  }, [isPopupVisible]);

  const loadAllClients = async () => {
    let { data: clients } = await getAllClients();
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
