import examinationsTable from '../services/database/examinationsTable.js';
import { examinationValidations } from '../validations/index.js';
import { Examination } from '../models/index.js';
import { generateUpdateQuery } from '../helpers/dynamicExaminationsQuery.js';
import generateResponseObject from '../helpers/generateResponseObject.js';

export default {
  databaseQueries: {
    getAllExaminations,
    getExaminationById,
    getPetExaminations,
    createExamination,
    updateExamination,
    deleteExamination,
    getExaminationsByDate,
    getExaminationsInfoByDate
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getAllExaminations(req, res) {
  try {
    const examinationsList = await examinationsTable.getAllExaminations();

    res.status(200).json(examinationsList);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getAllExaminations: ${error.message}`);

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getExaminationById(req, res) {
  try {
    examinationValidations.examinationId(req.params.Id);
    const examination = await examinationsTable.getExaminationById(parseInt(req.params.Id));

    res.status(200).send(examination.toJSON());
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getExaminationById: ${error.message}`);

    if (error.code === 'id-mustbe-number') {
      return res.status(404).send(error.message);
    }

    if (error.code === 'examination-not-found') {
      return res.status(404).send(error.message);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getExaminationsByDate(req, res) {
  try {
    examinationValidations.examinationDate(req.query.from);
    examinationValidations.examinationDate(req.query.to);
    const examinations = await examinationsTable.getExaminationsByDate(req.query.from, req.query.to);

    res.status(200).json(examinations);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getExaminationsByDate: ${error.message}`);

    if (error.code === 'examinations-not-found') {
      return res.status(200).json([]);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getExaminationsInfoByDate(req, res) {
  try {
    examinationValidations.examinationDate(req.query.from);
    examinationValidations.examinationDate(req.query.to);
    const examinations = await examinationsTable.getExaminationsInfoByDate(req.query.from, req.query.to);

    res.status(200).json(examinations);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getExaminationsInfoByDate: ${error.message}`);

    if (error.code === 'examinations-not-found') {
      return res.status(200).json([]);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getPetExaminations(req, res) {
  try {
    examinationValidations.petId(req.params.Id);
    const examinations = await examinationsTable.getExaminationsByPetId(parseInt(req.params.Id));

    res.status(200).json(examinations);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getPetExaminations: ${error.message}`);

    if (error.code === 'id-mustbe-number') {
      return res.status(404).send('Parameter "Id" must be a valid integer.');
    }

    if (error.code === 'examination-not-found') {
      return res.status(404).send(error.message);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function createExamination(req, res) {
  try {
    examinationValidations.validateExamination(req.body);

    // ToDo: Check if this time slot is already booked

    const examination = new Examination(0, req.body.petId, req.body.employeeId, new Date(req.body.examinationDate), req.body.occasion, req.body.conclusion, req.body.duration);
    const createdExamination = await examinationsTable.createExamination(examination);

    res.status(200).json(createdExamination);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] createExamination: ${error.message}`);

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateExamination(req, res) {
  try {
    examinationValidations.validateExamination(req.body);
    const queryString = generateUpdateQuery(req.body);
    const updatedExamination = await examinationsTable.updateExamination(queryString);

    res.status(200).json(updatedExamination);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] updateExamination: ${error.message}`);

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function deleteExamination(req, res) {
  try {
    examinationValidations.examinationId(req.params.Id);
    const dbResponse = await examinationsTable.deleteExamination(parseInt(req.params.Id));

    if (dbResponse.rowsAffected[0] === 1) {
      const response = generateResponseObject('success', `Examination with ID ${req.params.Id} is deleted.`, []);
      return res.status(200).json(response);
    }

    if (dbResponse.rowsAffected[0] === 0) {
      const response = generateResponseObject('fail', `Examination with ID ${req.params.Id} not found.`, []);
      return res.status(404).json(response);
    }
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] deleteExamination: ${error.message}`);

    if (error.code === 'id-mustbe-number') {
      const response = generateResponseObject('fail', error.message, []);
      return res.status(400).json(response);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}
