// Libraries
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// App modules
import { getPetsByClientId } from "../../services/petsAPI";
import BarClientInfo from "./BarClientInfo";
import ViewClientTableRow from "./ViewClientTableRow";

import "./ViewClient.css";
import AddPetPopup from "./AddPetPopup";

export default function ViewClient() {
  const location = useLocation();
  const navigate = useNavigate();

  const [clientPets, setClientPets] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    document.title = "View Client";

    if (location.state === null) {
      navigate("/");
    }

    getPets();
  }, []);

  useEffect(() => {
    if (!isPopupVisible) {
      getPets();
    }
  }, [isPopupVisible]);

  const getPets = async () => {
    let pets = await getPetsByClientId(location.state.clientId);
    if (Array.isArray(pets) === false) {
      pets = [];
    }
    setClientPets(pets);
  };

  return (
    <div className="viewclient-wrapper">
      <BarClientInfo
        clientInfo={location.state}
        setIsPopupVisible={setIsPopupVisible}
      />
      <div className="viewclient-pets glasseffect-body">
        {clientPets.length === 0 ? (
          <p>НЯМА ДОМАШНИ ЛЮБИМЦИ</p>
        ) : (
          clientPets.map((pet, i) => {
            return (
              <ViewClientTableRow
                pet={pet}
                clientInfo={location.state}
                key={i}
              />
            );
          })
        )}
      </div>
      {isPopupVisible && (
        <AddPetPopup
          setIsPopupVisible={setIsPopupVisible}
          clientInfo={location.state}
        />
      )}
    </div>
  );
}
