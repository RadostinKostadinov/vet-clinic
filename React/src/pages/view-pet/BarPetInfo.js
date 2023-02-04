// Libraries
import { useState } from "react";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

import "./BarPetInfo.css";
export default function BarPetInfo({ petInfo }) {
  const [petNotes, setPetNotes] = useState(petInfo?.info);

  const location = useLocation();

  const yOld = (() => {
    const yOldFloat = Math.abs(
      dayjs(new Date(petInfo.birthdate))
        .diff(new Date(), "year", true)
        .toFixed(2)
    );

    let [years, months] = yOldFloat.toString().split(".");

    months = parseInt(12 / (100 / Number(months)));

    if (years === "0") {
      return `${months} месеца`;
    } else {
      return `${years} години и ${months} месеца`;
    }
  })();

  return (
    <div className="viewpet-petinfo">
      <div className="viewpet-primary-info glasseffect-body">
        <div className="viewpet-petinfo-cell">
          <p>Вид: {petInfo.type}</p>
        </div>
        <div className="viewpet-petinfo-cell">
          <p>Порода: {petInfo.breed}</p>
        </div>
        <div className="viewpet-petinfo-cell">
          <p>Име: {petInfo.name}</p>
        </div>
        <div className="viewpet-petinfo-cell">
          <p>Пол: {petInfo.sex}</p>
        </div>
        <div className="viewpet-petinfo-cell">
          <p>Възраст: {yOld}</p>
        </div>
      </div>
      <div className="viewpet-owner-info glasseffect-body">
        <div className="viewpet-petinfo-cell" style={{ flex: 2 }}>
          <p>Клиент: {petInfo.clientName}</p>
        </div>
        <div className="viewpet-petinfo-cell">
          <p>Телефон: {petInfo.phone}</p>
        </div>
        <div
          className="viewpet-petinfo-cell"
          style={{ flex: 3, justifyContent: "flex-end" }}
        >
          <p>Адрес: {petInfo.address}</p>
        </div>
      </div>

      {/* 
    ToDo:
    Employee: paragraph - able to see
    User: textarea - able to see and update pet's info
    */}
      {location.pathname.includes("aaaa") ? (
        <textarea
          className="glasseffect-body petinfo-textarea"
          value={petNotes}
          onChange={(e) => {
            setPetNotes(e.target.value);
          }}
        ></textarea>
      ) : (
        <div className="viewpet-secondary-info  glasseffect-body">
          <div>
            <p>Бележки: {petInfo.info}</p>
          </div>
        </div>
      )}
    </div>
  );
}
