import { examinationValidations, petValidations } from '../validations/index.js';

export default class Examination {
  #examinationId;
  #petId;
  #employeeId;
  #examinationDate;
  #occasion;
  #conclusion;
  #duration;

  constructor(examinationId, petId, employeeId, examinationDate, occasion, conclusion, duration) {
    this.#examinationId = examinationId;
    this.petId = petId;
    this.employeeId = employeeId;
    this.examinationDate = examinationDate;
    this.occasion = occasion;
    this.conclusion = conclusion;
    this.duration = duration;
  }

  toJSON = () => {
    const publicExamination = {};
    publicExamination.examinationId = this.#examinationId;
    publicExamination.petId = this.#petId;
    publicExamination.employeeId = this.#employeeId;
    publicExamination.examinationDate = this.#examinationDate;
    publicExamination.occasion = this.#occasion;
    publicExamination.conclusion = this.#conclusion;
    publicExamination.duration = this.#duration;

    return JSON.stringify(publicExamination);
  };

  get examinationId() {
    return this.#examinationId;
  }

  get petId() {
    return this.#petId;
  }

  get employeeId() {
    return this.#employeeId;
  }

  get examinationDate() {
    return this.#examinationDate;
  }

  get occasion() {
    return this.#occasion;
  }

  get conclusion() {
    return this.#conclusion;
  }

  get duration() {
    return this.#duration;
  }

  set examinationId(id) {
    if (this.#examinationId === undefined) {
      examinationValidations.examinationId(id);
      this.#examinationId = parseInt(id);
    } else {
      throw new Error('ExaminationId cannot be changed!');
    }
  }

  set petId(petId) {
    examinationValidations.petId(petId);
    this.#petId = parseInt(petId);
  }

  set employeeId(employeeId) {
    examinationValidations.employeeId(employeeId);
    this.#employeeId = parseInt(employeeId);
  }

  set examinationDate(date) {
    examinationValidations.examinationDate(date);
    this.#examinationDate = date;
  }

  set occasion(occasion) {
    examinationValidations.occasion(occasion);
    this.#occasion = occasion;
  }

  set conclusion(conclusion) {
    examinationValidations.conclusion(conclusion);
    this.#conclusion = conclusion;
  }

  set duration(minutes) {
    examinationValidations.duration(minutes);
    this.#duration = parseInt(minutes);
  }
}
