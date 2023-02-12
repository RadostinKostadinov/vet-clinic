import { Client } from '../models/index.js';
import clientsTable from '../services/database/clientsTable.js';
import { clientValidations } from '../validations/index.js';
import { generateUpdateQuery } from '../helpers/dynamicClientsQuery.js';
import generateResponseObject from '../helpers/generateResponseObject.js';

export default {
  databaseQueries: {
    getAllClients,
    getClientById,
    getClientByUsername,
    getClientsByTerm,
    createClient,
    updateClient,
    deleteClient
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getAllClients(req, res) {
  try {
    const clientsList = await clientsTable.getClients();

    res.status(200).json(clientsList);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getAllClients: ${error.message}`);

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getClientById(req, res) {
  try {
    clientValidations.clientId(req.params.id);
    const client = await clientsTable.getClientById(req.params.id);

    res.status(200).send(client.toJSON());
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getClientById: ${error.message}`);

    if (error.code === 'id-mustbe-number') {
      return res.status(404).send('Param "Id" must be a valid integer.');
    }

    if (error.code === 'client-not-found') {
      return res.status(404).send(`No client with ID "${req.params.id}".`);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getClientByUsername(req, res) {
  try {
    clientValidations.userName(req.params.username);
    const client = await clientsTable.getClientByUsername(req.params.username);

    res.status(200).json(client);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getClientByUsername: ${error.message}`);
    if (error.code === 'username-too-short' || error.code === 'username-too-long' || error.code === 'username-empty') {
      return res.status(404).send('Username length must be between 4 and 15 characters.');
    }

    if (error.code === 'user-not-found') {
      return res.status(404).send(`No client with username "${req.params.username}".`);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getClientsByTerm(req, res) {
  try {
    // ToDo: Validate search term
    clientValidations.firstName(req.params.searchTerm);
    const client = await clientsTable.getClientsByTerm(req.params.searchTerm);

    res.status(200).json(client);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getClientsBySearchTerm: ${error.message}`);

    if (error.code === 'user-not-found') {
      return res.status(404).json(`No clients with term "${req.params.searchTerm}".`);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function createClient(req, res) {
  try {
    const newClient = new Client(0, req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.phone, req.body.address);
    const client = await clientsTable.createClient(newClient);

    res.status(200).json(client);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] createClient: ${error.message}`);
    // SQL SERVER ERROR 2627 (Unique Key Violation)
    if (error.number === 2627) {
      return res.status(400).json('Username is already in use.');
    }

    res.status(500).send(error.message);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateClient(req, res) {
  try {
    clientValidations.validateClient(req.body);
    const queryString = await generateUpdateQuery(req.body);
    const client = await clientsTable.updateClient(queryString);

    res.status(200).json(client);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] updateClient: ${error.message}`);

    res.status(500).send(error.message);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function deleteClient(req, res) {
  try {
    clientValidations.clientId(req.params.Id);
    const dbResponse = await clientsTable.deleteClient(parseInt(req.params.Id));

    if (dbResponse.rowsAffected[0] === 1) {
      const response = generateResponseObject('success', `Client with ID ${req.params.Id} is deleted.`, []);
      return res.status(200).json(response);
    }

    if (dbResponse.rowsAffected[0] === 0) {
      const response = generateResponseObject('fail', `Client with ID ${req.params.Id} not found.`, []);
      return res.status(404).json(response);
    }
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] deleteEmployee: ${error.message}`);

    if (error.code === 'id-mustbe-number') {
      const response = generateResponseObject('fail', error.message, []);
      return res.status(400).json(response);
    }

    res.status(500).send(error.message);
  }
}
