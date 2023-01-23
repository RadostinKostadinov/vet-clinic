export default class Employee {
  #employeeID;
  #firstName;
  #lastName;
  #userName;
  #password;

  constructor(employeeID, username, password, firstname, lastname) {
    this.#employeeID = employeeID;
    this.userName = username;
    this.password = password;
    this.firstName = firstname;
    this.lastName = lastname;
  }

  get employeeID() {
    return this.#employeeID;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get userName() {
    return this.#userName;
  }

  get password() {
    return this.#password;
  }

  set firstName(firstname) {
    if (firstname === undefined || firstname === null || firstname === '') {
      throw new Error('First name can\'t be empty.');
    }

    if (firstname.length < 2) {
      throw new Error('First name must be at least 2 characters long.');
    }

    if (firstname.length > 15) {
      throw new Error('First name exceeds the maximum length of 15 characters.');
    }
    this.#firstName = firstname;
  }

  set lastName(lastname) {
    if (lastname === undefined || lastname === null || lastname === '') {
      throw new Error('Last name can\'t be empty.');
    }

    if (lastname.length < 2) {
      throw new Error('Last name must be at least 2 characters long.');
    }

    if (lastname.length > 15) {
      throw new Error('Last name exceeds the maximum length of 15 characters.');
    }
    this.#lastName = lastname;
  }

  set userName(username) {
    if (username === undefined || username === null || username === '') {
      throw new Error('Username can\'t be empty.');
    }

    if (username.length < 4) {
      throw new Error('Username must be at least 4 characters long.');
    }

    if (username.length > 15) {
      throw new Error('Username exceeds the maximum length of 15 characters.');
    }
    this.#userName = username;
  }

  set password(password) {
    if (password === undefined || password === null || password === '') {
      throw new Error('Password can\'t be empty.');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    if (password.length > 20) {
      throw new Error('Password exceeds the maximum length of 20 characters.');
    }
    this.#password = password;
  }

  set hashedPassword(password) {
    this.#password = password;
  }
}
