// Libraries
import { useState, useEffect } from "react";

// App modules
import { getPetsByTerm } from "../../services/petsAPI";
import FindPetTopBar from "./FindPetTopBar";
import FindPetTableRow from "./FindPetTableRow";

import "./FindPet.css";
export default function FindPet() {
  const [petSearchTerm, setPetSearchTerm] = useState("");
  const [petsFound, setPetsFound] = useState([]);
  const [isPetsFound, setIsPetsFound] = useState(true);

  useEffect(() => {
    document.title = "Find Pet"
  }, [])

  useEffect(() => {
    if (petSearchTerm.length === 3) {
      const getPets = async () => {
        let pets = await getPetsByTerm(petSearchTerm);
        if (Array.isArray(pets) === false) {
          pets = [];
          setIsPetsFound(false);
        } else {
          setIsPetsFound(true);
        }
        setPetsFound(pets);
      };
      getPets();
    }
  }, [petSearchTerm]);

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
            return petSearchTerm && petName.includes(petSearchTerm.toLocaleLowerCase());
          })
          .map((pet, i) => {
            return <FindPetTableRow petInfo={pet} key={i} />;
          })}
      </div>
    </div>
  );
}
