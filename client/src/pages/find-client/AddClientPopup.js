// Libraries
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

// App modules
import { createClient } from "../../services/fetchVetClinicAPI/clientsAPI";

import "./AddClientPopup.css";
export default function AddClientPopup({ setIsPopupVisible }) {
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  // Formik Logics
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      address: "",
      password: "",
      repass: "",
    },

    // Validate Form
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Максимална дължина 15 символа.")
        .min(2, "Минимална дължина 2 символа.")
        .required("Задължително поле."),
      lastName: Yup.string()
        .max(15, "Максимална дължина 15 символа.")
        .min(2, "Минимална дължина 2 символа.")
        .required("Задължително поле."),
      username: Yup.string()
        .max(15, "Максимална дължина 15 символа.")
        .min(4, "Минимална дължина 4 символа.")
        .required("Задължително поле."),
      phone: Yup.string()
        .max(10, "Максимална дължина 10 символа.")
        .min(8, "Минимална дължина 8 символа.")
        .matches(/[0-9]{8,10}/, "Използвайте само цифри(0-9).")
        .required("Задължително поле."),
      address: Yup.string()
        .max(100, "Максимална дължина 100 символа.")
        .min(2, "Минимална дължина 2 символа.")
        .required("Задължително поле."),
      password: Yup.string()
        .max(20, "Максимална дължина 20 символа.")
        .min(8, "Минимална дължина 8 символа.")
        .required("Задължително поле."),
      repass: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Паролите не съвпадат"
      ),
    }),

    validateOnChange: false,
    validateOnBlur: false,

    // Submit Form
    onSubmit: (values) => {
      const addClient = async () => {
        setIsUsernameTaken(false);

        const response = await createClient(values);
        if (response.status === "success") {
          alert("Успешно добавихте нов клиент.");
          setIsPopupVisible(false);
        } else if (response.message === "Username is already in use.") {
          setIsUsernameTaken(true);
        } else {
          alert("Проблем със сървъра, моля свържете се с администратор.");
        }
      };
      addClient();
    },
  });

  return (
    <div className="popup-overlay">
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="addclient-form glasseffect-body"
      >
        <div className="addclient-form-fields">
          <div className="addclient-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.firstName ? "invalid" : ""
              }`}
              htmlFor="firstName"
            >
              {formik.errors.firstName ? formik.errors.firstName : "Име"}
            </label>
            <input
              className="addclient-form-input"
              type="text"
              name="firstName"
              placeholder="Въведете име"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addclient-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.lastName ? "invalid" : ""
              }`}
              htmlFor="lastName"
            >
              {formik.errors.lastName ? formik.errors.lastName : "Фамилия"}
            </label>
            <input
              className="addclient-form-input"
              type="text"
              name="lastName"
              placeholder="Въведете фамилия"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addclient-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.phone ? "invalid" : ""
              }`}
              htmlFor="phone"
            >
              {formik.errors.phone ? formik.errors.phone : "Телефон"}
            </label>
            <input
              className="addclient-form-input"
              type="text"
              name="phone"
              placeholder="Въведете телефон"
              value={formik.values.phone}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addclient-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.address ? "invalid" : ""
              }`}
              htmlFor="address"
            >
              {formik.errors.address ? formik.errors.address : "Адрес"}
            </label>
            <input
              className="addclient-form-input"
              type="text"
              name="address"
              placeholder="Въведете адрес"
              value={formik.values.address}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addclient-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.username || isUsernameTaken ? "invalid" : ""
              }`}
              htmlFor="username"
            >
              {isUsernameTaken
                ? "Потребителското име е заето."
                : formik.errors.username
                ? formik.errors.username
                : "Потребителско име"}
            </label>
            <input
              className="addclient-form-input"
              type="text"
              name="username"
              placeholder="Въведете потреб. име"
              value={formik.values.username}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addclient-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.password ? "invalid" : ""
              }`}
              htmlFor="password"
            >
              {formik.errors.password ? formik.errors.password : "Парола"}
            </label>
            <input
              className="addclient-form-input"
              type="text"
              name="password"
              placeholder="Въведете парола"
              value={formik.values.password}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addclient-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.repass ? "invalid" : ""
              }`}
              htmlFor="repass"
            >
              {formik.errors.repass ? formik.errors.repass : "Парола"}
            </label>
            <input
              className="addclient-form-input"
              type="text"
              name="repass"
              placeholder="Повторете парола"
              value={formik.values.repass}
              onChange={formik.handleChange}
            ></input>
          </div>
        </div>
        <div className="form-controls">
          <button
            type="button"
            onClick={() => {
              setIsPopupVisible(false);
            }}
            className="addclient-cancel"
          >
            Отказ
          </button>
          <button type="submit" className="addclient-add">
            Добави
          </button>
        </div>
      </form>
    </div>
  );
}
