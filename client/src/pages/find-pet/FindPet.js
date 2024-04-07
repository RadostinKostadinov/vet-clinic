// Libraries
import { useState, useEffect } from "react";

// App modules
import { getPetsByTerm, getAllPets } from "../../services/petsAPI";
import FindPetTopBar from "./FindPetTopBar";
import FindPetTableRow from "./FindPetTableRow";

import "./FindPet.css";
export default function FindPet() {
  const [petSearchTerm, setPetSearchTerm] = useState("");
  const [petsFound, setPetsFound] = useState([]);

  useEffect(() => {
    document.title = "Find Pet";
    const loadAllPets = async () => {
      let pets = await getAllPets();
      setPetsFound(pets);
    };
    loadAllPets();
  }, []);

  return (
    <div className="findpet-wrapper">
      <FindPetTopBar
        petSearchTerm={petSearchTerm}
        setPetSearchTerm={setPetSearchTerm}
      />
      <div className="findpet-content glasseffect-body">
        {petsFound
          .filter((pet) => {
            const petName = pet.name.toString().toLocaleLowerCase();
            return petSearchTerm
              ? petName.includes(petSearchTerm.toLocaleLowerCase())
              : true;
          })
          .map((pet, i) => {
            return <FindPetTableRow petInfo={pet} key={i} />;
          })}
      </div>
    </div>
  );
}
