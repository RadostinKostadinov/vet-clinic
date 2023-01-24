export default class Examination {
  #examinationID;
  #petID;
  #employeeID;
  #examinationDate;
  #occasion;
  #conclusion;
  #duration;

  constructor(examinationID, petID, employeeID, examinationDate, occasion, conclusion, duration) {
    this.#examinationID = examinationID;
    this.petID = petID;
    this.employeeID = employeeID;
    this.examinationDate = examinationDate;
    this.occasion = occasion;
    this.conclusion = conclusion;
    this.duration = duration;
  }

  get examinationID() {
    return this.#examinationID;
  }

  get petID() {
    return this.#petID;
  }

  get employeeID() {
    return this.#employeeID;
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

  set petID(petID) {
    petID = parseInt(petID);
    if (petID === 'NaN') {
      throw new Error('PetID must be a valid number.');
    }
    this.#petID = petID;
  }

  set employeeID(employeeID) {
    employeeID = parseInt(employeeID);
    if (employeeID === 'NaN') {
      throw new Error('EmployeeID must be a valid number.');
    }
    this.#employeeID = employeeID;
  }

  set examinationDate(date) {
    if (date === undefined || date === null || date === '') {
      throw new Error('Examination date can\'t be empty.');
    }

    if (date instanceof Date === false && !isNaN(date)) {
      throw new Error('Examination date must be of type \'Date\'.');
    }
    this.#examinationDate = date;
  }

  set occasion(occasion) {
    if (occasion.length > 200) {
      throw new Error('Occasion exceeds the maximum length of 200 characters.');
    }
    this.#occasion = occasion;
  }

  set conclusion(conclusion) {
    if (conclusion.length > 2000) {
      throw new Error('Conclusion exceeds the maximum length of 2000 characters.');
    }
    this.#conclusion = conclusion;
  }

  set duration(minutes) {
    minutes = parseInt(minutes);
    if (minutes === 'NaN') {
      throw new Error('Length must be a valid number (minutes, integer).');
    }
    this.#duration = minutes;
  }
}
