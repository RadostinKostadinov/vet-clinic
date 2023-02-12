import { clientValidations, petValidations } from '../validations/index.js';
import petsTable from '../services/database/petsTable.js';
import { Pet } from '../models/index.js';
import { generateUpdateQuery } from '../helpers/dynamicPetsQuery.js';
import clientsTable from '../services/database/clientsTable.js';
import generateResponseObject from '../helpers/generateResponseObject.js';

export default {
  databaseQueries: {
    getAllPets,
    getPetById,
    getPetsByOwnerId,
    getPetsByClientUsername,
    getPetsByTerm,
    createPet,
    updatePet,
    deletePet
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getAllPets(req, res) {
  try {
    const petsList = await petsTable.getAllPets();

    res.status(200).json(petsList);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getAllPets: ${error.message}`);

    res.status(500).json(error);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getPetById(req, res) {
  try {
    petValidations.petId(req.params.Id);
    const pet = await petsTable.getPetById(parseInt(req.params.Id));

    res.status(200).send(pet.toJSON());
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getPetById: ${error.message}`);

    if (error.code === 'id-mustbe-number') {
      return res.status(404).send('Param "Id" must be a valid integer.');
    }

    if (error.code === 'pet-not-found') {
      return res.status(404).send(error.message);
    }

    res.status(500).json(error);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getPetsByOwnerId(req, res) {
  try {
    petValidations.ownerId(req.params.ownerId);
    const pets = await petsTable.getPetsByOwner(parseInt(req.params.ownerId));

    res.status(200).json(pets);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getPetsByOwnerId: ${error.message}`);

    if (error.code === 'doesnt-own-pets') {
      return res.status(404).json(error.message);
    }

    res.status(500).json(error.message);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getPetsByClientUsername(req, res) {
  try {
    clientValidations.userName(req.params.username);
    const pets = await petsTable.getPetsByClientUsername(req.params.username);

    res.status(200).json(pets);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getPetsByClientUsername: ${error.message}`);

    if (error.code === 'doesnt-own-pets') {
      return res.status(404).send(error.message);
    }

    res.status(500).send(error.message);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getPetsByTerm(req, res) {
  try {
    // ToDo: Validate search term
    const pets = await petsTable.getPetsByTerm(req.params.searchTerm);

    res.status(200).json(pets);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getPetsBySearchTerm: ${error.message}`);

    if (error.code === 'pet-not-found') {
      return res.status(404).json(`No pets with term "${req.params.searchTerm}".`);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function createPet(req, res) {
  try {
    petValidations.validatePet(req.body);

    // Checks if the clients exists
    // ToDo: Create SQL Trigger for this job
    await clientsTable.getClientById(req.body.ownerId);

    const newPet = new Pet(0, req.body.type, req.body.breed, req.body.name, new Date(req.body.birthdate), req.body.sex, req.body.info, req.body.ownerId);
    const pet = await petsTable.createPet(newPet);

    res.status(200).json(pet);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] createPet: ${error.message}`);

    res.status(500).send(error.message);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updatePet(req, res) {
  try {
    petValidations.validatePet(req.body);
    const queryString = generateUpdateQuery(req.body);
    const updatedPet = await petsTable.updatePet(queryString);

    res.status(200).json(updatedPet);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] updatePet: ${error.message}`);

    res.status(500).send(error.message);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function deletePet(req, res) {
  try {
    petValidations.petId(req.params.Id);
    const dbResponse = await petsTable.deletePet(parseInt(req.params.Id));

    if (dbResponse.rowsAffected[0] === 1) {
      const response = generateResponseObject('success', `Pet with ID ${req.params.Id} is deleted.`, []);
      return res.status(200).json(response);
    }

    if (dbResponse.rowsAffected[0] === 0) {
      const response = generateResponseObject('fail', `Pet with ID ${req.params.Id} not found.`, []);
      return res.status(404).json(response);
    }
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] deletePet: ${error.message}`);

    if (error.code === 'id-mustbe-number') {
      const response = generateResponseObject('fail', error.message, []);
      return res.status(400).json(response);
    }

    res.status(500).send(error.message);
  }
}
