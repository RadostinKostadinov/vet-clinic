import { Employee } from '../models/index.js';
import employeesTable from '../services/database/employeesTable.js';
import { employeeValidations } from '../validations/index.js';
import { generateUpdateQuery } from '../helpers/dynamicEmployeesQuery.js';

export default {
  databaseQueries: {
    getAllEmployees,
    getEmployeeById,
    getEmployeeByUsername,
    createEmployee,
    updateEmployee,
    deleteEmployee
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getAllEmployees(req, res) {
  try {
    const employeesList = await employeesTable.getAllEmployees();

    res.status(200).json(employeesList);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getAllEmployees: ${error.message}`);

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getEmployeeById(req, res) {
  try {
    employeeValidations.employeeId(req.params.Id);
    const employee = await employeesTable.getEmployeeById(parseInt(req.params.Id));

    res.status(200).json(employee);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getEmployeeById: ${error.message}`);
    if (error.code === 'id-mustbe-number') {
      return res.status(404).send('Param "Id" must be a valid integer.');
    }

    if (error.code === 'employee-not-found') {
      return res.status(404).send(`No employee with ID "${req.params.Id}".`);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getEmployeeByUsername(req, res) {
  try {
    employeeValidations.userName(req.params.Username);
    const client = await employeesTable.getEmployeeByUsername(req.params.Username);

    res.status(200).json(client);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] getClientByUsername: ${error.message}`);
    if (error.code === 'username-too-short' || error.code === 'username-too-long' || error.code === 'username-empty') {
      return res.status(404).send('Username length must be between 4 and 15 characters.');
    }

    if (error.code === 'user-not-found') {
      return res.status(404).send(`No employee with username "${req.params.Username}".`);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function createEmployee(req, res) {
  try {
    employeeValidations.validateEmployee(req.body);
    const newEmployee = new Employee(0, req.body.userName, req.body.password, req.body.firstName, req.body.lastName);
    const employee = await employeesTable.createEmployee(newEmployee);

    res.status(200).json(employee);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] createEmployee: ${error.message}`);
    // SQL SERVER ERROR 2601 (Unique Key Violation)
    if (error.number === 2627) {
      return res.status(400).send('Username is already in use.');
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateEmployee(req, res) {
  try {
    employeeValidations.validateEmployee(req.body);
    const queryString = await generateUpdateQuery(req.body);
    const employee = await employeesTable.updateEmployee(queryString);

    res.status(200).json(employee);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] updateEmployee: ${error.message}`);

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function deleteEmployee(req, res) {
  try {
    employeeValidations.employeeId(req.params.Id);
    const dbResponse = await employeesTable.deleteEmployeeById(parseInt(req.params.Id));

    res.status(200).json(dbResponse);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] deleteEmployee: ${error.message}`);

    res.status(500).send('Unable to fetch data from database.');
  }
}
