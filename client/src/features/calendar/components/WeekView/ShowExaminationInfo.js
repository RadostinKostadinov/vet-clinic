// Libraries
import { useState } from "react";
import dayjs from "dayjs";

// App modules
import { getClientById } from "../../../../services/fetchVetClinicAPI/clientsAPI";
import {
  deleteExamination,
  getExaminationById,
} from "../../../../services/fetchVetClinicAPI/examinationsAPI";
import { getPetById } from "../../../../services/fetchVetClinicAPI/petsAPI";

import "./ShowExaminationInfo.css";
import { useNavigate } from "react-router-dom";

export default function ShowExaminationInfo({ exam, setIsExaminationOpened }) {
  let examination, pet, clientInfo;

  const navigate = useNavigate();
  const [isFetchingData, setIsFetchingData] = useState(false);

  const handleClose = (e) => {
    setIsExaminationOpened(false);
  };

  const handleOpen = (e) => {
    const getInfo = async () => {
      setIsFetchingData(true);
      examination = await getExaminationById(exam.examinationId);
      pet = await getPetById(examination.petId);
      clientInfo = await getClientById(pet.ownerId);
      const petInfo = Object.assign(
        {
          clientName:
            clientInfo.data[0].firstName + " " + clientInfo.data[0].lastName,
        },
        pet,
        clientInfo.data[0]
      );
      navigate("/examination", {
        state: {
          petInfo,
          examination,
        },
      });
    };
    getInfo();
  };

  const handleDelete = (e) => {
    const delExamination = async () => {
      const deleted = await deleteExamination(exam.examinationId);
      alert("Успешно изтрито.");
      setIsExaminationOpened(false);
    };
    delExamination();
  };
  return (
    <div className="popup-overlay">
      <div className="add-examination-form glasseffect-body">
        <div className="examination-form-fields">
          <div className="examination-form-field">
            <label className="examination-form-label">Име на клиент</label>
            <input
              value={exam.clientName}
              disabled
              className="examination-form-input"
            ></input>
          </div>
          <div className="examination-form-field">
            <label className="examination-form-label">Любимец</label>
            <input
              value={exam.petName}
              disabled
              className="examination-form-input"
            ></input>
          </div>
          <div className="examination-form-field twofields">
            <div>
              <label className="examination-form-label">Дата</label>
              <input
                value={dayjs(new Date(exam.examinationDate)).format(
                  "DD-MM-YYYY"
                )}
                disabled
                className="examination-form-input"
              ></input>
            </div>
            <div>
              <label className="examination-form-label">Час</label>
              <input
                value={exam.examinationDate.substr(11, 5)}
                disabled
                className="examination-form-input"
              ></input>
            </div>
          </div>
          <div className="examination-form-field">
            <label className="examination-form-label">Продължителност</label>
            <input
              value={
                parseInt(exam.duration / 60)
                  .toString()
                  .padStart(2, "0") +
                ":" +
                (exam.duration % 60).toString().padStart(2, "0")
              }
              disabled
              className="examination-form-input"
            ></input>
          </div>
          <div className="examination-form-field">
            <label className="examination-form-label">Служител</label>
            <input
              value={exam.employeeUsername}
              disabled
              className="examination-form-input"
            ></input>
          </div>
          <div className="examination-form-field">
            <label className="examination-form-label">Причина</label>
            <textarea
              style={{ resize: "none", height: "80px" }}
              value={exam.occasion}
              disabled
              className="examination-form-input"
            ></textarea>
          </div>
          <div className="examination-form-field">
            <button onClick={handleDelete} className="examination-delete">
              Изтрий
            </button>
          </div>
        </div>
        <div className="form-controls">
          <button onClick={handleClose} className="examination-cancel">
            Затвори
          </button>
          <button
            onClick={handleOpen}
            type="button"
            className="examination-add"
            // disabled={isFetchingData ? true : false}
          >
            {isFetchingData ? "Отваряне..." : "Преглед"}
          </button>
        </div>
      </div>
    </div>
  );
}
