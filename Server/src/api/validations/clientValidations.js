export {
  validateClient,
  clientId,
  userName,
  password,
  firstName,
  lastName,
  phone,
  address,
  hashedPassword
};

/**
 * @param {Number} id
 */
function clientId(id) {
  const clientId = parseInt(id);
  if (Number.isNaN(clientId)) {
    const error = new Error('ClientID must be a valid number.');
    error.code = 'id-mustbe-number';
    throw error;
  }
}

/**
 * @param {String} username
 */
function userName(username) {
  if (username === undefined || username === null || username === '') {
    const error = new Error('Username can\'t be empty.');
    error.code = 'username-empty';
    throw error;
  }

  if (username.length < 4) {
    const error = new Error('Username must be at least 4 characters long.');
    error.code = 'username-too-short';
    throw error;
  }

  if (username.length > 15) {
    const error = new Error('Username exceeds the maximum length of 15 characters.');
    error.code = 'username-too-long';
    throw error;
  }
}

/**
 * @param {String} password
 */
function password(password) {
  if (password === undefined || password === null || password === '') {
    throw new Error('Password can\'t be empty.');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  if (password.length > 20) {
    throw new Error('Password exceeds the maximum length of 20 characters.');
  }
}

/**
 * @param {String} firstname
 */
function firstName(firstname) {
  if (firstname === undefined || firstname === null || firstname === '') {
    throw new Error('First name can\'t be empty.');
  }

  if (firstname.length < 2) {
    throw new Error('First name must be at least 2 characters long.');
  }

  if (firstname.length > 15) {
    throw new Error('First name exceeds the maximum length of 15 characters.');
  }
}

/**
 * @param {String} lastname
 */
function lastName(lastname) {
  if (lastname === undefined || lastname === null || lastname === '') {
    throw new Error('Last name can\'t be empty.');
  }

  if (lastname.length < 2) {
    throw new Error('Last name must be at least 2 characters long.');
  }

  if (lastname.length > 15) {
    throw new Error('Last name exceeds the maximum length of 15 characters.');
  }
}

/**
 * @param {String || Number} phone
 */
function phone(phone) {
  if (phone === undefined || phone === null || phone === '') {
    throw new Error('Phone can\'t be empty.');
  }

  if (phone.length < 8 || phone.length > 10) {
    throw new Error('Phone number must be between 8 and 10 characters long.');
  }
}

/**
 * @param {String} address
 */
function address(address) {
  if (address === undefined || address === null || address === '') {
    throw new Error('Address can\'t be empty.');
  }

  if (address.length > 100) {
    throw new Error('Address exceeds the maximum length of 100 characters.');
  }
}

/**
 * @param {String} hash
 * This validation isn't 100% sure.
 */
function hashedPassword(hash) {
  if (hash.length !== 60) {
    throw new Error('Parameter "hash" must be a valid hash value.');
  }
}

/**
 * @param {Object} client
 */
function validateClient(client) {
  if (typeof client.clientId !== 'undefined') {
    clientId(client.clientId);
  }
  if (typeof client.userName !== 'undefined') {
    userName(client.userName);
  }
  if (typeof client.password !== 'undefined') {
    password(client.password);
  }
  if (typeof client.firstName !== 'undefined') {
    firstName(client.firstName);
  }
  if (typeof client.lastName !== 'undefined') {
    lastName(client.lastName);
  }
  if (typeof client.phone !== 'undefined') {
    phone(client.phone);
  }
  if (typeof client.address !== 'undefined') {
    address(client.address);
  }
}
