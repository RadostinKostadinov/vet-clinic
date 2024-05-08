import { employeeValidations } from '../validations/index.js';

export default class Employee {
  #employeeId;
  #userName;
  #password;
  #firstName;
  #lastName;

  constructor(employeeId, username, password, firstname, lastname) {
    this.employeeId = employeeId;
    this.userName = username;
    this.password = password;
    this.firstName = firstname;
    this.lastName = lastname;
  }

  toJSON = () => {
    const publicEmployee = {};
    publicEmployee.employeeId = this.#employeeId;
    publicEmployee.username = this.#userName;
    publicEmployee.firstName = this.#firstName;
    publicEmployee.lastName = this.#lastName;

    return publicEmployee;
  };

  get employeeId() {
    return this.#employeeId;
  }

  get userName() {
    return this.#userName;
  }

  get password() {
    return this.#password;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  set employeeId(id) {
    if (this.#employeeId === undefined) {
      employeeValidations.employeeId(id);
      this.#employeeId = parseInt(id);
    } else {
      throw new Error('EmployeeId cannot be changed!');
    }
  }

  set userName(username) {
    employeeValidations.userName(username);
    this.#userName = username;
  }

  set password(password) {
    employeeValidations.password(password);
    this.#password = password;
  }

  set firstName(firstname) {
    employeeValidations.firstName(firstname);
    this.#firstName = firstname;
  }

  set lastName(lastname) {
    employeeValidations.lastName(lastname);
    this.#lastName = lastname;
  }

  set hashedPassword(hash) {
    employeeValidations.hashedPassword(hash);
    this.#password = hash;
  }
}
