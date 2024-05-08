import { Employee } from '../models/index.js';
import employeesTable from '../services/database/employeesTable.js';
import { employeeValidations } from '../validations/index.js';
import { generateUpdateQuery } from '../helpers/dynamicEmployeesQuery.js';
import generateResponseObject from '../helpers/generateResponseObject.js';

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

    if (employeesList.length > 0) {
      const response = generateResponseObject(
        'success',
        `Number of employees : ${employeesList.length}`,
        employeesList
      );
      return res.status(200).json(response);
    }

    if (employeesList.length === 0) {
      const response = generateResponseObject(
        'fail',
        'No employees found.',
        []
      );
      return res.status(404).json(response);
    }
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] getAllEmployees: ${error.message}`
    );

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
    const employee = await employeesTable.getEmployeeById(
      parseInt(req.params.Id)
    );

    const response = generateResponseObject('success', 'Employee found.', [
      employee
    ]);

    res.status(200).json(response);
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] getEmployeeById: ${error.message}`
    );

    if (error.code === 'id-mustbe-number') {
      const response = generateResponseObject('fail', error.message, []);
      return res.status(400).json(response);
    }

    if (error.code === 'employee-not-found') {
      const response = generateResponseObject('fail', error.message, []);
      return res.status(404).json(response);
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
    const employee = await employeesTable.getEmployeeByUsername(
      req.params.Username
    );

    const response = generateResponseObject('success', 'Employee found.', [
      employee
    ]);

    res.status(200).json(response);
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] getClientByUsername: ${error.message}`
    );

    if (
      error.code === 'username-too-short' ||
      error.code === 'username-too-long' ||
      error.code === 'username-empty'
    ) {
      const response = generateResponseObject('fail', error.message, []);
      return res.status(400).json(response);
    }

    if (error.code === 'user-not-found') {
      const response = generateResponseObject('fail', error.message, []);
      return res.status(404).json(response);
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
    const newEmployee = new Employee(
      0,
      req.body.userName,
      req.body.password,
      req.body.firstName,
      req.body.lastName
    );
    const employee = await employeesTable.createEmployee(newEmployee);

    const response = generateResponseObject('success', 'Employee created.', [
      employee
    ]);
    res.status(200).json(response);
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] createEmployee: ${error.message}`
    );

    // SQL SERVER ERROR 2601 (Unique Key Violation)
    if (error.number === 2627) {
      const response = generateResponseObject(
        'fail',
        'Username is already in use.',
        []
      );
      return res.status(409).send(response);
    }

    // ToDo: Catch errors from req.body validation

    res.status(500).send('Unable to fetch data from database.');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateEmployee(req, res) {
  try {
    // ! Validate is ID passed.
    employeeValidations.validateEmployee(req.body);
    const queryString = await generateUpdateQuery(req.body);
    const employee = await employeesTable.updateEmployee(queryString);

    const response = generateResponseObject('success', 'Employee updated.', [
      employee
    ]);

    res.status(200).json(response);
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] updateEmployee: ${error.message}`
    );

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
    const dbResponse = await employeesTable.deleteEmployeeById(
      parseInt(req.params.Id)
    );

    if (dbResponse.rowsAffected[0] === 1) {
      const response = generateResponseObject(
        'success',
        `Employee with ID ${req.params.Id} is deleted.`,
        []
      );
      return res.status(200).json(response);
    }

    if (dbResponse.rowsAffected[0] === 0) {
      const response = generateResponseObject(
        'fail',
        `Employee with ID ${req.params.Id} not found.`,
        []
      );
      return res.status(404).json(response);
    }
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}] deleteEmployee: ${error.message}`
    );

    if (error.code === 'id-mustbe-number') {
      const response = generateResponseObject('fail', error.message, []);
      return res.status(400).json(response);
    }

    res.status(500).send('Unable to fetch data from database.');
  }
}
