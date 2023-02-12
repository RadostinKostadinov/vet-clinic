import { clientValidations } from '../validations/index.js';

export default class Client {
  #clientId;
  #userName;
  #password;
  #firstName;
  #lastName;
  #phone;
  #address;

  constructor(clientId, username, password, firstname, lastname, phone, address) {
    this.clientId = clientId;
    this.userName = username;
    this.password = password;
    this.firstName = firstname;
    this.lastName = lastname;
    this.phone = phone;
    this.address = address;
  }

  toJSON = () => {
    const publicClient = {};
    publicClient.clientId = this.#clientId;
    publicClient.username = this.#userName;
    publicClient.firstName = this.#firstName;
    publicClient.lastName = this.#lastName;
    publicClient.phone = this.#phone;
    publicClient.address = this.#address;

    return publicClient;
  };

  get clientId() {
    return this.#clientId;
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

  get phone() {
    return this.#phone;
  }

  get address() {
    return this.#address;
  }

  set clientId(id) {
    if (this.#clientId === undefined) {
      clientValidations.clientId(id);
      this.#clientId = parseInt(id);
    } else {
      throw new Error('ClientID cannot be changed!');
    }
  }

  set firstName(firstname) {
    clientValidations.firstName(firstname);
    this.#firstName = firstname;
  }

  set lastName(lastname) {
    clientValidations.lastName(lastname);
    this.#lastName = lastname;
  }

  set userName(username) {
    clientValidations.userName(username);
    this.#userName = username;
  }

  set password(password) {
    clientValidations.password(password);
    this.#password = password;
  }

  set phone(phone) {
    clientValidations.phone(phone);
    this.#phone = phone;
  }

  set address(address) {
    clientValidations.address(address);
    this.#address = address;
  }

  set hashedPassword(hash) {
    clientValidations.hashedPassword(hash);
    this.#password = hash;
  }
}
