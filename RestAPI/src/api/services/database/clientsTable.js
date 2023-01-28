import sql from 'mssql';
import bcrypt from 'bcrypt';
import { Client } from '../../models/index.js';

/**
 * @returns {Promise<Client[]>}
 */
function getClients() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM VetClinic.OurClients;')
      .then((res) => {
        const clients = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const clientObj = new Client(res.recordset[i].ClientID, res.recordset[i].Username, 'hashedpassword', res.recordset[i].Firstname, res.recordset[i].Lastname, res.recordset[i].Phone, res.recordset[i].Address);
          clientObj.hashedPassword = res.recordset[i].Password;
          clients.push(clientObj);
        }
        resolve(clients);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<Client>}
 */
function getClientById(id) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.OurClients WHERE ClientID=${id};`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error(`No client with ID "${id}"`);
          error.code = 'client-not-found';
          throw error;
        }
        const clientObj = new Client(res.recordset[0].ClientID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname, res.recordset[0].Phone, res.recordset[0].Address);
        clientObj.hashedPassword = res.recordset[0].Password;
        resolve(clientObj);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<Client>}
 */
function getClientByUsername(username) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.OurClients WHERE Username=N'${username}';`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error(`No client with username "${username}"`);
          error.code = 'user-not-found';
          throw error;
        }
        const clientObj = new Client(res.recordset[0].ClientID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname, res.recordset[0].Phone, res.recordset[0].Address);
        clientObj.hashedPassword = res.recordset[0].Password;
        resolve(clientObj);
      }).catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Client} client
 * @return {Promise<Client>}
 */
async function createClient(client) {
  if (!(client instanceof Client)) {
    throw new Error('Argument 1 in function createClient must be an instance of class "Client".');
  }

  client.hashedPassword = await bcrypt.hash(client.password, 10);

  return new Promise((resolve, reject) => {
    sql.query(`INSERT INTO VetClinic.OurClients 
      OUTPUT INSERTED.ClientId, INSERTED.Username, INSERTED.Password, INSERTED.Firstname, INSERTED.Lastname, INSERTED.Phone, INSERTED.Address
      VALUES (N'${client.userName}', N'${client.password}', N'${client.firstName}', N'${client.lastName}', '${client.phone}', N'${client.address}')`)
      .then((res) => {
        const clientObj = new Client(res.recordset[0].ClientId, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname, res.recordset[0].Phone, res.recordset[0].Address);
        clientObj.hashedPassword = res.recordset[0].Password;
        resolve(clientObj);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<Client>}
 */
function updateClient(queryString) {
  return new Promise((resolve, reject) => {
    sql.query(queryString)
      .then((res) => {
        const clientObj = new Client(res.recordset[0].ClientID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname, res.recordset[0].Phone, res.recordset[0].Address);
        clientObj.hashedPassword = res.recordset[0].Password;
        resolve(clientObj);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<sql.IResult>}
 */
function deleteClient(id) {
  return new Promise((resolve, reject) => {
    sql.query(`DELETE FROM VetClinic.OurClients WHERE ClientID=${parseInt(id)};`)
      .then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
  });
}

export default { getClients, getClientById, getClientByUsername, createClient, updateClient, deleteClient };
