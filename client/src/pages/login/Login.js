import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./Login.css";
import {
  clientLogin,
  employeeLogin,
} from "../../services/fetchVetClinicAPI/clientsAPI";
import { GlobalContext } from "../../context/GlobalContext";

export default function Login() {
  const [formMessage, setFormMessage] = useState("");
  let { setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      username: "sKodjabashev",
      password: "testpass1",
      "user-type": "employee",
    },
    // Validate Form
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Максимална дължина 15 символа.")
        .min(4, "Минимална дължина 4 символа.")
        .required("Задължително поле."),
      password: Yup.string()
        .max(20, "Максимална дължина 20 символа.")
        .min(8, "Минимална дължина 8 символа.")
        .required("Задължително поле."),
      "user-type": Yup.string()
        .max(20, "Максимална дължина 20 символа.")
        .required("Задължително поле."),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    // Submit Form
    onSubmit: () => {
      const userInput = {};
      Object.assign(userInput, formik.values);

      const sendRequest = async () => {
        try {
          let response = "";
          if (userInput["user-type"] === "client") {
            response = await clientLogin(
              userInput.username,
              userInput.password
            );
          } else {
            response = await employeeLogin(
              userInput.username,
              userInput.password
            );
          }

          if (response.status === 200) {
            setUser(response.data);
            navigate("/");
          } else {
            setFormMessage("Невалидни данни");
          }
        } catch (err) {
          setFormMessage("Невалидни данни");
        }
      };
      sendRequest();
    },
  });

  return (
    <div className="login-wrapper">
      <h1>Ветеринарна клиника</h1>
      <form
        autoComplete="off"
        className="glasseffect-body"
        onSubmit={formik.handleSubmit}
      >
        <label className="">
          {formik.errors.username ? formik.errors.username : "Потребител"}
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onFocus={(e) => setFormMessage("")}
          />
        </label>
        <label>
          {formik.errors.password ? formik.errors.password : "Парола"}
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onFocus={(e) => setFormMessage("")}
          />
        </label>
        <label>
          {formik.errors["user-type"]
            ? formik.errors["user-type"]
            : "Вписване като"}
          <div className="login-radio-button-wrapper">
            <input
              type="radio"
              name="user-type"
              value="client"
              id="role-client"
              onChange={() => formik.setFieldValue("user-type", "client")}
              checked={formik.values["user-type"] === "client"}
            />
            <label htmlFor="role-client">Клиент</label>
          </div>
          <div className="login-radio-button-wrapper">
            <input
              type="radio"
              name="user-type"
              value="employee"
              id="role-employee"
              onChange={() => formik.setFieldValue("user-type", "employee")}
              checked={formik.values["user-type"] === "employee"}
            />
            <label htmlFor="role-employee">Служител</label>
          </div>
        </label>
        <label className="login-form-submit-label">
          <input type="submit" value="Вход"></input>
        </label>

        {formMessage && <p className="login-form-message">{formMessage}</p>}
      </form>
    </div>
  );
}
