import { petValidations, employeeValidations } from './index.js';

export {
  examinationId,
  petId,
  employeeId,
  examinationDate,
  occasion,
  conclusion,
  duration,
  validateExamination
};

function examinationId(id) {
  const examinationId = parseInt(id);
  if (Number.isNaN(examinationId)) {
    const error = new Error('ExaminationId must be a valid number.');
    error.code = 'id-mustbe-number';
    throw error;
  }
}

function petId(petId) {
  petValidations.petId(petId);
}

function employeeId(employeeId) {
  employeeValidations.employeeId(employeeId);
}

function examinationDate(date) {
  const newDate = new Date(date);

  if (isNaN(newDate.getTime())) {
    throw new Error('Examination date must be a valid date.');
  }

  if (date === undefined || date === null || date === '') {
    throw new Error('Examination date can\'t be empty.');
  }

  if (date instanceof Date === false && !isNaN(date)) {
    throw new Error('Examination date must be of type \'Date\'.');
  }
}

function occasion(occasion) {
  if (occasion.length > 200) {
    throw new Error('Occasion exceeds the maximum length of 200 characters.');
  }
}

function conclusion(conclusion) {
  if (conclusion.length > 2000) {
    throw new Error('Conclusion exceeds the maximum length of 2000 characters.');
  }
}

function duration(minutes) {
  minutes = parseInt(minutes);
  if (Number.isNaN(minutes)) {
    throw new Error('Length must be a valid number (minutes, integer).');
  }
}

/**
 * @param {Object} examination
 */
function validateExamination(examination) {
  if (typeof examination.examinationId !== 'undefined') {
    examinationId(examination.examinationId);
  }
  if (typeof examination.petId !== 'undefined') {
    petId(examination.petId);
  }
  if (typeof examination.employeeId !== 'undefined') {
    employeeId(examination.employeeId);
  }
  if (typeof examination.examinationDate !== 'undefined') {
    examinationDate(examination.examinationDate);
  }
  if (typeof examination.occasion !== 'undefined') {
    occasion(examination.occasion);
  }
  if (typeof examination.conclusion !== 'undefined') {
    conclusion(examination.conclusion);
  }
  if (typeof examination.duration !== 'undefined') {
    duration(examination.duration);
  }
}
