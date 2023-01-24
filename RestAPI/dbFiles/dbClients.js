import sql from 'mssql';
import bcrypt from 'bcrypt';
import Client from './dbSchemas/Client.js';

/**
 * @returns {Promise<Client[]>}
 */
function getClients() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * from VetClinic.Clients').then((res) => {
      const clients = [];
      for (let i = 0; i < res.recordset.length; i++) {
        const ClientObj = new Client(res.recordset[i].ClientID, res.recordset[i].Username, 'hashedpassword', res.recordset[i].Firstname, res.recordset[i].Lastname, res.recordset[i].Phone, res.recordset[i].Address);
        ClientObj.hashedPassword = res.recordset[i].Password;
        clients.push(ClientObj);
      }
      resolve(clients);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * @return {Promise<Client>}
 */
function getClientById(id) {
  return new Promise((resolve, reject) => {
    id = parseInt(id);
    if (Number.isNaN(id)) {
      reject(new Error('ID must be a valid number.'));
    }

    sql.query(`SELECT * from VetClinic.Clients WHERE ClientID=${id}`).then((res) => {
      if (res.rowsAffected[0] === 0) {
        reject(new Error('No client with ID ' + id));
      }
      const ClientObj = new Client(res.recordset[0].ClientID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname, res.recordset[0].Phone, res.recordset[0].Address);
      ClientObj.hashedPassword = res.recordset[0].Password;
      resolve(ClientObj);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * @return {Promise<Client>}
 */
function getClientByUsername(username) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.Clients WHERE Username=N'${username}'`).then((res) => {
      if (res.rowsAffected[0] === 0) {
        reject(new Error('No client with username: ' + username));
      }
      const ClientObj = new Client(res.recordset[0].ClientID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname, res.recordset[0].Phone, res.recordset[0].Address);
      ClientObj.hashedPassword = res.recordset[0].Password;
      resolve(ClientObj);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * @param {Client} client
 * @return {Promise<Client>}
 */
function createClient(client) {
  if (!(client instanceof Client)) {
    throw new Error('Argument 1 in function createClient must be an instance of class "Client".');
  }

  client.hashedPassword = bcrypt.hashSync(client.password, 10);

  return new Promise((resolve, reject) => {
    sql.query(`INSERT INTO VetClinic.Clients 
      OUTPUT INSERTED.ClientID, INSERTED.Username, INSERTED.Password, INSERTED.Firstname, INSERTED.Lastname, INSERTED.Phone, INSERTED.Address
      VALUES (N'${client.userName}', N'${client.password}', N'${client.firstName}', N'${client.lastName}', '${client.phone}', N'${client.address}')`).then((res) => {
      const ClientObj = new Client(res.recordset[0].ClientID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname, res.recordset[0].Phone, res.recordset[0].Address);
      ClientObj.hashedPassword = res.recordset[0].Password;
      resolve(ClientObj);
    }).catch((error) => {
      if (error.number === 2627) {
        console.log('USERNAME IS ALREADY IN USE.');
        reject(new Error('Username is already in use.'));
      }
      reject(error);
    });
  });
}

/**
 * @return {Promise<Client>}
 */
function updateClient(client) {
  if (!(client instanceof Client)) {
    throw new Error('Argument 1 in function updateClient must be an instance of class "Client".');
  }

  if (client.password.length < 20) {
    client.hashedPassword = bcrypt.hashSync(client.password, 10);
  }

  return new Promise((resolve, reject) => {
    sql.query(`UPDATE VetClinic.Clients 
      SET Username=N'${client.userName}', Password=N'${client.password}', Firstname=N'${client.firstName}', Lastname=N'${client.lastName}', Phone='${client.phone}', Address=N'${client.address}'  
      OUTPUT INSERTED.ClientID, INSERTED.Username, INSERTED.Password, INSERTED.Firstname, INSERTED.Lastname, INSERTED.Phone, INSERTED.Address
      WHERE ClientID=${client.clientID};`).then((res) => {
      const ClientObj = new Client(res.recordset[0].ClientID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname, res.recordset[0].Phone, res.recordset[0].Address);
      ClientObj.hashedPassword = res.recordset[0].Password;
      resolve(ClientObj);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * @return {Promise<sql.IResult>}
 */
function deleteClient(client) {
  if (!(client instanceof Client)) {
    throw new Error('Argument 1 in function deleteClientById must be an instance of class "Client".');
  }

  return new Promise((resolve, reject) => {
    sql.query(`DELETE FROM VetClinic.Clients WHERE ClientID=${client.clientID};`).then((res) => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  });
}

export default { getClients, getClientById, getClientByUsername, createClient, updateClient, deleteClient };
