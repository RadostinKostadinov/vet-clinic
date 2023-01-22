class Examination {
  constructor(examinationID, petID, employeeID, date, occasion, conclusion, length) {
    this.examinationID = examinationID;
    this.petID = petID;
    this.employeeID = employeeID;
    this.date = date;
    this.occasion = occasion;
    this.conclusion = conclusion;
    this.length = length;
  }

  get petID() {
    return this.type;
  }

  get employeeID() {
    return this.breed;
  }

  get date() {
    return this.name;
  }

  get occasion() {
    return this.birthdate;
  }

  get conclusion() {
    return this.sex;
  }

  get length() {
    return this.info;
  }

  set petID(petID) {
    petID = parseInt(petID);
    if (petID === 'NaN') {
      throw new Error('PetID must be a valid number.');
    }
    this.petID = petID;
  }

  set employeeID(employeeID) {
    employeeID = parseInt(employeeID);
    if (employeeID === 'NaN') {
      throw new Error('EmployeeID must be a valid number.');
    }
    this.employeeID = employeeID;
  }

  set date(date) {
    if (date === undefined || date === null || date === '') {
      throw new Error('Examination date can\'t be empty.');
    }

    if (date instanceof Date === false && !isNaN(date)) {
      throw new Error('Examination date must be of type \'Date\'.');
    }
    this.date = date;
  }

  set occasion(occasion) {
    if (occasion.length > 200) {
      throw new Error('Occasion exceeds the maximum length of 200 characters.');
    }
    this.occasion = occasion;
  }

  set conclusion(conclusion) {
    if (conclusion.length > 2000) {
      throw new Error('Conclusion exceeds the maximum length of 2000 characters.');
    }
    this.conclusion = conclusion;
  }

  set length(minutes) {
    minutes = parseInt(minutes);
    if (minutes === 'NaN') {
      throw new Error('Length must be a valid number (minutes, integer).');
    }
    this.length = minutes;
  }
}

export { Examination };
