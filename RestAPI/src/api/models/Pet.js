import { petValidations } from '../validations/index.js';

export default class Pet {
  #petId;
  #type;
  #breed;
  #name;
  #birthdate;
  #sex;
  #info;
  #ownerId;

  constructor(petId, type, breed, name, birthdate, sex, info, ownerId) {
    this.petId = petId;
    this.type = type;
    this.breed = breed;
    this.name = name;
    this.birthdate = birthdate;
    this.sex = sex;
    this.info = info;
    this.ownerId = ownerId;
  }

  toJSON = () => {
    const publicClient = {};
    publicClient.petId = this.#petId;
    publicClient.type = this.#type;
    publicClient.breed = this.#breed;
    publicClient.name = this.#name;
    publicClient.birthdate = this.#birthdate;
    publicClient.sex = this.#sex;
    publicClient.info = this.#info;
    publicClient.ownerId = this.#ownerId;

    return JSON.stringify(publicClient);
  };

  get petId() {
    return this.#petId;
  }

  get type() {
    return this.#type;
  }

  get breed() {
    return this.#breed;
  }

  get name() {
    return this.#name;
  }

  get birthdate() {
    return this.#birthdate;
  }

  get sex() {
    return this.#sex;
  }

  get info() {
    return this.#info;
  }

  get ownerId() {
    return this.#ownerId;
  }

  set petId(id) {
    if (this.#petId === undefined) {
      petValidations.petId(id);
      this.#petId = parseInt(id);
    } else {
      throw new Error('PetId cannot be changed!');
    }
  }

  set type(type) {
    petValidations.type(type);
    this.#type = type;
  }

  set breed(breed) {
    petValidations.breed(breed);
    this.#breed = breed;
  }

  set name(name) {
    petValidations.name(name);
    this.#name = name;
  }

  set birthdate(birthdate) {
    petValidations.birthdate(birthdate);
    this.#birthdate = birthdate;
  }

  set sex(sex) {
    petValidations.sex(sex);
    this.#sex = sex;
  }

  set info(info) {
    petValidations.info(info);
    this.#info = info;
  }

  set ownerId(ownerId) {
    petValidations.ownerId(ownerId);
    this.#ownerId = ownerId;
  }
}
