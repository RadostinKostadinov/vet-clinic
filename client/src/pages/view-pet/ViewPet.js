// Libraries
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// App modules
import { getExaminationsByPetId } from "../../services/fetchVetClinicAPI/examinationsAPI";
import BarPetInfo from "./BarPetInfo";
import ViewPetTableRow from "./ViewPetTableRow";

import "./ViewPet.css";
export default function ViewPet() {
  const location = useLocation();

  const [petExaminations, setPetExaminations] = useState([]);

  useEffect(() => {
    document.title = "View Pet";

    const getExaminations = async () => {
      let examinations = await getExaminationsByPetId(location.state.petId);
      if (Array.isArray(examinations) === false) {
        examinations = [];
      }
      setPetExaminations(examinations);
    };
    getExaminations();
  }, [location.state.petId]);

  if (location.state === null) {
    window.location = "/";
  }

  return (
    <div className="viewpet-wrapper">
      <BarPetInfo petInfo={location.state} />
      <div className="viewpet-examinations glasseffect-body">
        {petExaminations.length === 0 ? (
          <p>ДО МОМЕНТА НЯМА ПРЕГЛЕДИ</p>
        ) : (
          petExaminations.map((examination, i) => {
            return (
              <ViewPetTableRow
                examination={examination}
                petInfo={location.state}
                key={i}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
