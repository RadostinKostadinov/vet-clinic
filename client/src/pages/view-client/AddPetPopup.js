// Libraires
import { useFormik } from "formik";
import * as Yup from "yup";

// App modules
import { createPet } from "../../services/fetchVetClinicAPI/petsAPI";

import "./AddPetPopup.css";
export default function AddPetPopup({ setIsPopupVisible, clientInfo }) {
  // Formik Logics
  const formik = useFormik({
    initialValues: {
      type: "",
      breed: "",
      name: "",
      birthdate: "",
      sex: "",
      info: "",
    },

    // Validate Form
    validationSchema: Yup.object({
      type: Yup.string()
        .max(20, "Максимална дължина 20 символа.")
        .min(2, "Минимална дължина 2 символа.")
        .required("Задължително поле."),
      breed: Yup.string()
        .max(20, "Максимална дължина 20 символа.")
        .min(2, "Минимална дължина 2 символа.")
        .required("Задължително поле."),
      name: Yup.string()
        .max(20, "Максимална дължина 20 символа.")
        .min(2, "Минимална дължина 2 символа.")
        .required("Задължително поле."),
      birthdate: Yup.string()
        .max(10, "Максимална дължина 10 символа.")
        .min(9, "Минимална дължина 9 символа.")
        .matches(
          /^(?<year>\d{4})-(?<month>(?:(?=0)(?:0[1-9])|(1[0-2])))-(?<day>(?:(?:(?<=....(?:01-|03-|05-|07-|08-|10-|12-))(?:(?:0[1-9])|(?:[1-2][0-9])|(?:3[0-1])))|(?:(?<=....(04-|06-|09-|11-))((0[1-9])|([1-2][0-9])|(30))))|(?:(?:(?<=02-)(?:((?<=(...)(0-|2-|4-|6-|8-)(..-))((0[1-9])|(1[0-9])|(2[0-9])))|(?:(?<=(?:...)(?:1-|3-|5-|7-|9-)(?:..-))(?:(0[1-9])|(?:1[0-9])|(?:2[0-8])))))))$/,
          "Формат: 2022-02-22"
        )
        .required("Задължително поле."),
      sex: Yup.string()
        .max(1, "Максимална дължина 1 символ. (М/Ж)")
        .required("Задължително поле."),
      info: Yup.string().max(200, "Максимална дължина 200 символа."),
    }),

    validateOnChange: false,
    validateOnBlur: false,

    // Submit Form
    onSubmit: (values) => {
      const newPet = Object.assign({}, values);
      newPet.ownerId = clientInfo.clientId;

      const addPet = async () => {
        const response = await createPet(newPet);
        if (response.includes("petId") === false) {
          alert("Проблем със сървъра, моля свържете се с администратор.");
        } else if (response.includes("petId")) {
          alert("Успешно добавихте нов любимец.");
          setIsPopupVisible(false);
        }
      };
      addPet();
    },
  });

  return (
    <div className="popup-overlay">
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="addpet-form glasseffect-body"
      >
        <div className="addpet-form-fields">
          <div className="addpet-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.type ? "invalid" : ""
              }`}
              htmlFor="type"
            >
              {formik.errors.type ? formik.errors.type : "Вид"}
            </label>
            <input
              className="addpet-form-input"
              type="text"
              name="type"
              placeholder="Въведете вид"
              value={formik.values.type}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addpet-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.breed ? "invalid" : ""
              }`}
              htmlFor="breed"
            >
              {formik.errors.breed ? formik.errors.breed : "Порода"}
            </label>
            <input
              className="addpet-form-input"
              type="text"
              name="breed"
              placeholder="Въведете порода"
              value={formik.values.breed}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addpet-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.name ? "invalid" : ""
              }`}
              htmlFor="name"
            >
              {formik.errors.name ? formik.errors.name : "Име"}
            </label>
            <input
              className="addpet-form-input"
              type="text"
              name="name"
              placeholder="Въведете име"
              value={formik.values.name}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addpet-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.birthdate ? "invalid" : ""
              }`}
              htmlFor="birthdate"
            >
              {formik.errors.birthdate
                ? formik.errors.birthdate
                : "Дата на раждане"}
            </label>
            <input
              className="addpet-form-input"
              type="text"
              name="birthdate"
              placeholder="Пример: 2022-02-14"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addpet-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.sex ? "invalid" : ""
              }`}
              htmlFor="sex"
            >
              {formik.errors.sex ? formik.errors.sex : "Пол"}
            </label>
            <input
              className="addpet-form-input"
              type="text"
              name="sex"
              placeholder="М/Ж"
              value={formik.values.sex}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="addpet-form-field">
            <label
              className={`examination-form-label ${
                formik.errors.info ? "invalid" : ""
              }`}
              htmlFor="info"
            >
              {formik.errors.info ? formik.errors.info : "Допълнително"}
            </label>
            <input
              className="addpet-form-input"
              type="text"
              name="info"
              placeholder="Особености на любимеца"
              value={formik.values.info}
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
            className="addpet-cancel"
          >
            Отказ
          </button>
          <button type="submit" className="addpet-add">
            Добави
          </button>
        </div>
      </form>
    </div>
  );
}
