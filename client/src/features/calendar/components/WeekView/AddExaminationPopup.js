// Libraries
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";

// App modules
import { addExamination } from "../../../../services/examinationsAPI";
import { CalendarContext } from "../../../../context/features/CalendarContext";
import { getAllEmployees } from "../../../../services/employeesAPI";
import { getClientsByTerm } from "../../../../services/clientsAPI";
import { getPetsByClientId } from "../../../../services/petsAPI";

import "./AddExaminationPopup.css";
export default function AddExaminationPopup({ popupHour }) {
  const { popupDay, setIsPopupVisible, popupDayExaminations } =
    useContext(CalendarContext);

  const [employees, setEmployees] = useState([]);
  const [clientsFound, setClientsFound] = useState([]);
  const [petsFound, setPetsFound] = useState([]);
  const [havePets, setHavePets] = useState(true);
  const [focused, setFocused] = useState("");

  // Get all employees when the popup is rendered.
  useEffect(() => {
    const getEmployees = async () => {
      const employeesData = await getAllEmployees();
      setEmployees(employeesData);
    };
    getEmployees();
  }, []);

  // Formik Logics
  const formik = useFormik({
    initialValues: {
      clientName: "",
      petName: "",
      hour: popupHour,
      duration: "00:15",
      employee: "",
      occasion: "",
    },

    // Validate Form
    validationSchema: Yup.object({
      clientName: Yup.string()
        .max(15, "Максимална дължина 15 символа.")
        .min(2, "Минимална дължина 2 символа.")
        .required("Задължително поле."),
      petName: Yup.string()
        .max(20, "Максимална дължина 20 символа.")
        .min(2, "Минимална дължина 2 символа.")
        .required("Задължително поле."),
      hour: Yup.string().required("Задължително поле."),
      duration: Yup.string().required("Задължително поле."),
      employee: Yup.string()
        .max(15, "Максимална дължина 15 символа.")
        .min(2, "Минимална дължина 2 символа.")
        .required("Задължително поле."),
      occasion: Yup.string().max(2000, "Максимална дължина 2000 символа."),
    }),

    validateOnChange: false,
    validateOnBlur: false,

    // Submit Form
    onSubmit: (values) => {
      const examination = {};
      Object.assign(examination, formik.values);

      // Assembles examination's Date
      const examinationDate = popupDay;
      const [hour, minutes, ...[]] = formik.values.hour.split(":");
      examinationDate.setHours(hour, minutes, 0);
      const localTime = new Date(
        examinationDate.getTime() - examinationDate.getTimezoneOffset() * 60000
      );
      examination.examinationDate = localTime;

      // Assembles examination's duration
      const [durHours, durMinutes, ...[]] = formik.values.duration.split(":");
      const duration = parseInt(durHours) * 60 + parseInt(durMinutes);
      examination.duration = duration;

      // Checks if selected time slot is available
      const isFree = checkIsTimeIntervalFree(examinationDate, duration);
      if (isFree == false) {
        alert("Вече има запазен час в избраният времеви интервал.");
        return;
      }

      // Replaces employee's username with employee's id
      const employee = employees.find((e) => {
        return e.username === formik.values.employee;
      });
      examination.employeeId = employee.employeeId;

      // Adds field 'conclusion' to examination object
      examination.conclusion = "";

      // Adds petId to examination object
      const pet = petsFound.find((e) => {
        return e.name === formik.values.petName;
      });
      examination.petId = pet.petId;

      const sendRequest = async () => {
        const addedExamination = await addExamination(examination);
        alert("Успешно запазихте час.");
        setIsPopupVisible(false);
      };
      sendRequest();
    },
  });

  const handleClose = (e) => {
    setIsPopupVisible(false);
  };

  const checkIsTimeIntervalFree = (localTime, duration) => {
    const start = dayjs(localTime).hour() * 60 + dayjs(localTime).minute();
    const end = start + duration;
    let isFree = true;

    popupDayExaminations.forEach((examination) => {
      const eStart =
        parseInt(examination.examinationDate.substr(11, 2)) * 60 +
        parseInt(examination.examinationDate.substr(14, 4));
      const eEnd = eStart + parseInt(examination.duration);

      let current = false;
      if (
        (start <= eStart && end <= eStart) ||
        (start >= eEnd && end >= eEnd)
      ) {
        current = true;
      }
      if (current == false) {
        isFree = false;
      }
    });

    return isFree;
  };

  return (
    <>
      <div className="popup-overlay">
        <form
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="add-examination-form glasseffect-body"
        >
          <div className="examination-form-fields">
            <div className="examination-form-field">
              <label
                className={`examination-form-label ${
                  formik.errors.clientName ? "invalid" : ""
                }`}
                htmlFor="clientName"
              >
                {formik.errors.clientName
                  ? formik.errors.clientName
                  : "Име на клиент"}
              </label>
              <input
                className="examination-form-input"
                type="text"
                name="clientName"
                placeholder="Въведете потреб. име"
                value={formik.values.clientName}
                onChange={async (e) => {
                  formik.handleChange(e);
                  if (e.target.value.length === 3) {
                    let { data: clients } = await getClientsByTerm(
                      e.target.value
                    );
                    if (Array.isArray(clients) === false) clients = [];
                    setClientsFound(clients);
                  }
                }}
                onBlur={(e) => {
                  setTimeout(() => {
                    setFocused("");
                  }, 500);
                }}
                onFocus={(e) => {
                  setFocused("clientName");
                }}
              ></input>
              <div className="client-name-suggestions">
                {focused === "clientName" &&
                  formik.values.clientName.length >= 3 &&
                  clientsFound.filter((client) => {
                    const searchTerm = formik.values.clientName.toLowerCase();
                    const username = client.username.toLowerCase();

                    const fullname =
                      client.firstName.toLowerCase() +
                      " " +
                      client.lastName.toLowerCase();
                    const clientId = client.clientId.toString();

                    return (
                      searchTerm &&
                      (fullname.includes(searchTerm) ||
                        username.includes(searchTerm) ||
                        clientId.includes(searchTerm))
                    );
                  }).length === 0 && <div>{`Няма намерени резултати`}</div>}
                {focused === "clientName" &&
                  formik.values.clientName.length >= 3 &&
                  clientsFound.length > 0 &&
                  clientsFound
                    .filter((client) => {
                      const searchTerm = formik.values.clientName.toLowerCase();
                      const username = client.username.toLowerCase();

                      const fullname =
                        client.firstName.toLowerCase() +
                        " " +
                        client.lastName.toLowerCase();
                      const clientId = client.clientId.toString();

                      return (
                        searchTerm &&
                        (fullname.includes(searchTerm) ||
                          username.includes(searchTerm) ||
                          clientId.includes(searchTerm))
                      );
                    })
                    .map((client, i) => (
                      <div
                        onClick={async () => {
                          formik.values.clientName = client.username;
                          setPetsFound([]);
                          let pets = await getPetsByClientId(client.clientId);
                          if (Array.isArray(pets) === false) {
                            pets = [];
                            setHavePets(false);
                          } else {
                            setHavePets(true);
                          }
                          setPetsFound(pets);
                        }}
                        key={i}
                        className="suggestion-row"
                      >{`[${client.clientId}] ${client.username} /${
                        client.firstName + " " + client.lastName
                      }/`}</div>
                    ))
                    .slice(0, 10)}
              </div>
            </div>
            <div className="examination-form-field">
              <label
                className={`examination-form-label ${
                  formik.errors.petName ? "invalid" : ""
                }`}
                htmlFor="petName"
              >
                {formik.errors.petName
                  ? formik.errors.petName
                  : "Име на любимец"}
              </label>
              <select
                className="examination-form-select"
                type="text"
                name="petName"
                placeholder="Въведете име на любимец"
                value={formik.values.petName}
                onChange={formik.handleChange}
              >
                {petsFound.map((v, i) => {
                  if (v?.name) {
                    return <option key={i}>{v?.name}</option>;
                  }
                  return;
                })}
                <option defaultValue disabled hidden value="">
                  {petsFound.length === 0
                    ? havePets
                      ? "Първо въведете потребител"
                      : "Няма любимци"
                    : "Изберете любимец"}
                </option>
              </select>
            </div>
            <div className="examination-form-field twofields">
              <div>
                <label className="examination-form-label" htmlFor="date">
                  Дата
                </label>
                <input
                  className="examination-form-input"
                  value={dayjs(popupDay).format("DD-MM-YYYY")}
                  type="text"
                  name="date"
                  disabled
                ></input>
              </div>
              <div>
                <label
                  className={`examination-form-label ${
                    formik.errors.hour ? "invalid" : ""
                  }`}
                  htmlFor="hour"
                >
                  {formik.errors.hour ? formik.errors.hour : "Час"}
                </label>
                <select
                  className="examination-form-select"
                  name="hour"
                  value={formik.values.hour}
                  onChange={formik.handleChange}
                >
                  {new Array(96).fill("").map((v, i) => {
                    return (
                      <option key={i}>
                        {parseInt(i / 4)
                          .toString()
                          .padStart(2, "0")}
                        :{((i % 4) * 15).toString().padStart(2, "0")}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="examination-form-field">
              <label
                className={`examination-form-label ${
                  formik.errors.duration ? "invalid" : ""
                }`}
                htmlFor="duration"
              >
                {formik.errors.duration
                  ? formik.errors.duration
                  : "Продължителност"}
              </label>
              <select
                className="examination-form-select"
                name="duration"
                value={formik.values.duration}
                onChange={formik.handleChange}
              >
                {new Array(9).fill("").map((v, i) => {
                  if (i == 0) return;
                  return (
                    <option key={i}>
                      {parseInt(i / 4)
                        .toString()
                        .padStart(2, "0")}
                      :{((i % 4) * 15).toString().padStart(2, "0")}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="examination-form-field">
              <label
                className={`examination-form-label ${
                  formik.errors.employee ? "invalid" : ""
                }`}
                htmlFor="employee"
              >
                {formik.errors.employee ? formik.errors.employee : "Служител"}
              </label>
              <select
                className="examination-form-select"
                name="employee"
                value={formik.values.employee}
                onChange={formik.handleChange}
              >
                {employees.map((v, i) => {
                  if (v?.username) {
                    return <option key={i}>{v?.username}</option>;
                  }
                  return;
                })}
                <option defaultValue disabled hidden value="">
                  Изберете служител
                </option>
              </select>
            </div>
            <div className="examination-form-field">
              <label
                className={`examination-form-label ${
                  formik.errors.occasion ? "invalid" : ""
                }`}
                htmlFor="occasion"
              >
                {formik.errors.occasion ? formik.errors.occasion : "Причина"}
              </label>
              <textarea
                rows="3"
                className="examination-form-textbox"
                name="occasion"
                placeholder="Въведете причина за прегледа (притеснения на клиента/симптомпи на любимеца/повод за посещение)."
                value={formik.values.occasion}
                onChange={formik.handleChange}
              ></textarea>
            </div>
          </div>
          <div className="form-controls">
            <button onClick={handleClose} className="examination-cancel">
              Отказ
            </button>
            <button type="submit" className="examination-add">
              Запази
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
