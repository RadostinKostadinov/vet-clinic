import { clientValidations } from './index.js';

export {
  petId,
  type,
  breed,
  name,
  birthdate,
  sex,
  info,
  ownerId,
  validatePet
};

function petId(id) {
  const petId = parseInt(id);
  if (Number.isNaN(petId)) {
    const error = new Error('PetId must be a valid number.');
    error.code = 'id-mustbe-number';
    throw error;
  }
}

function type(type) {
  if (type === undefined || type === null || type === '') {
    throw new Error('Type name can\'t be empty.');
  }

  if (type.length < 2) {
    throw new Error('Type must be at least 2 characters long.');
  }

  if (type.length > 20) {
    throw new Error('Type exceeds the maximum length of 20 characters.');
  }
}

function breed(breed) {
  if (breed === undefined || breed === null || breed === '') {
    throw new Error('Breed name can\'t be empty.');
  }

  if (breed.length < 2) {
    throw new Error('Breed must be at least 2 characters long.');
  }

  if (breed.length > 20) {
    throw new Error('Breed exceeds the maximum length of 20 characters.');
  }
}

function name(name) {
  if (name === undefined || name === null || name === '') {
    throw new Error('Name can\'t be empty.');
  }

  if (name.length < 2) {
    throw new Error('Name must be at least 2 characters long.');
  }

  if (name.length > 20) {
    throw new Error('Name exceeds the maximum length of 20 characters.');
  }
}

function birthdate(birthdate) {
  const newDate = new Date(birthdate);

  if (isNaN(newDate.getTime())) {
    throw new Error('Birthdate must be a valid date.');
  }

  if (birthdate === undefined || birthdate === null || birthdate === '') {
    throw new Error('Birthdate can\'t be empty.');
  }

  if (birthdate instanceof Date === false && !isNaN(birthdate)) {
    throw new Error('Birthdate must be of type \'Date\'.');
  }
}

function sex(sex) {
  if (sex === undefined || sex === null || sex === '') {
    throw new Error('Sex can\'t be empty.');
  }

  if (sex.length !== 1 || sex === "'") {
    throw new Error('Sex must be exact 1 character (M/F, М/Ж).');
  }
}

function info(info) {
  if (info.length > 2000) {
    throw new Error('Info exceeds the maximum length of 2000 characters.');
  }
}

function ownerId(ownerId) {
  clientValidations.clientId(ownerId);
}

/**
 * @param {Object} pet
 */
function validatePet(pet) {
  if (typeof pet.petId !== 'undefined') {
    petId(pet.petId);
  }
  if (typeof pet.type !== 'undefined') {
    type(pet.type);
  }
  if (typeof pet.breed !== 'undefined') {
    breed(pet.breed);
  }
  if (typeof pet.name !== 'undefined') {
    name(pet.name);
  }
  if (typeof pet.birthdate !== 'undefined') {
    birthdate(pet.birthdate);
  }
  if (typeof pet.sex !== 'undefined') {
    sex(pet.sex);
  }
  if (typeof pet.info !== 'undefined') {
    info(pet.info);
  }
  if (typeof pet.ownerId !== 'undefined') {
    ownerId(pet.ownerId);
  }
}
