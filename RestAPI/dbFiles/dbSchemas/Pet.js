class Pet {
  constructor(petID, type, breed, name, birthdate, sex, info, ownerID) {
    this.petID = petID;
    this.type = type;
    this.breed = breed;
    this.name = name;
    this.birthdate = birthdate;
    this.sex = sex;
    this.info = info;
    this.ownerID = ownerID;
  }

  get type() {
    return this.type;
  }

  get breed() {
    return this.breed;
  }

  get name() {
    return this.name;
  }

  get birthdate() {
    return this.birthdate;
  }

  get sex() {
    return this.sex;
  }

  get info() {
    return this.info;
  }

  get ownerID() {
    return this.ownerID;
  }

  set type(type) {
    if (type === undefined || type === null || type === '') {
      throw new Error('Type name can\'t be empty.');
    }

    if (type.length < 2) {
      throw new Error('Type must be at least 2 characters long.');
    }

    if (type.length > 20) {
      throw new Error('Type exceeds the maximum length of 20 characters.');
    }
    this.type = type;
  }

  set breed(breed) {
    if (breed === undefined || breed === null || breed === '') {
      throw new Error('Breed name can\'t be empty.');
    }

    if (breed.length < 2) {
      throw new Error('Breed must be at least 2 characters long.');
    }

    if (breed.length > 20) {
      throw new Error('Breed exceeds the maximum length of 20 characters.');
    }
    this.breed = breed;
  }

  set name(name) {
    if (name === undefined || name === null || name === '') {
      throw new Error('Name can\'t be empty.');
    }

    if (name.length < 2) {
      throw new Error('Name must be at least 2 characters long.');
    }

    if (name.length > 20) {
      throw new Error('Name exceeds the maximum length of 20 characters.');
    }
    this.name = name;
  }

  set birthdate(birthdate) {
    if (birthdate === undefined || birthdate === null || birthdate === '') {
      throw new Error('Birthdate can\'t be empty.');
    }

    if (birthdate instanceof Date === false && !isNaN(birthdate)) {
      throw new Error('Birthdate must be of type \'Date\'.');
    }
    this.birthdate = birthdate;
  }

  set sex(sex) {
    if (sex === undefined || sex === null || sex === '') {
      throw new Error('Sex can\'t be empty.');
    }

    if (sex.length !== 1) {
      throw new Error('Sex must be exact 1 character (M/F).');
    }

    this.sex = sex;
  }

  set info(info) {
    if (info.length > 2000) {
      throw new Error('Info exceeds the maximum length of 2000 characters.');
    }
    this.info = info;
  }

  set ownerID(ownerID) {
    ownerID = parseInt(ownerID);
    if (ownerID === 'NaN') {
      throw new Error('OwnerID must be a valid number.');
    }
    this.ownerID = ownerID;
  }
}

export { Pet };
