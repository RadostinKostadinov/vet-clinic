import sql from 'mssql';
import bcrypt from 'bcrypt';
import { Employee } from '../../models/index.js';

/**
 * @returns {Promise<Employee[]>}
 */
function getAllEmployees() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * from VetClinic.OurEmployees;')
      .then((res) => {
        const employees = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const employee = new Employee(res.recordset[i].EmployeeId, res.recordset[i].Username, 'hashedpassword', res.recordset[i].Firstname, res.recordset[i].Lastname);
          employee.hashedPassword = res.recordset[i].Password;
          employees.push(employee);
        }
        resolve(employees);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<Employee>}
 */
function getEmployeeById(id) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.OurEmployees WHERE EmployeeID=${id};`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error(`No employee with ID ${id}`);
          error.code = 'employee-not-found';
          throw error;
        }
        const employee = new Employee(res.recordset[0].EmployeeId, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname);
        employee.hashedPassword = res.recordset[0].Password;
        resolve(employee);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<Client>}
 */
function getEmployeeByUsername(username) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.OurEmployees WHERE Username=N'${username}';`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error(`No employee with username ${username}`);
          error.code = 'user-not-found';
          reject(error);
        }
        const employee = new Employee(res.recordset[0].EmployeeId, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname);
        employee.hashedPassword = res.recordset[0].Password;
        resolve(employee);
      }).catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<Employee>}
 */
async function createEmployee(employee) {
  if (!(employee instanceof Employee)) {
    throw new Error('Argument 1 in function createEmployee must be an instance of class "Employee".');
  }

  employee.hashedPassword = await bcrypt.hash(employee.password, 10);

  return new Promise((resolve, reject) => {
    sql.query(`INSERT INTO VetClinic.OurEmployees 
      OUTPUT INSERTED.userName, INSERTED.firstName, INSERTED.lastName, INSERTED.password, INSERTED.employeeId
      VALUES ('${employee.userName}', '${employee.password}', '${employee.firstName}', '${employee.lastName}')`)
      .then((res) => {
        const employee = new Employee(res.recordset[0].employeeId, res.recordset[0].userName, 'hashedpassword', res.recordset[0].firstName, res.recordset[0].lastName);
        employee.hashedPassword = res.recordset[0].password;
        resolve(employee);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<Employee>}
 */
function updateEmployee(queryString) {
  return new Promise((resolve, reject) => {
    sql.query(queryString)
      .then((res) => {
        const employee = new Employee(res.recordset[0].EmployeeId, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname);
        employee.hashedPassword = res.recordset[0].Password;
        resolve(employee);
      }).catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<sql.IResult>}
 */
function deleteEmployeeById(id) {
  return new Promise((resolve, reject) => {
    sql.query(`DELETE FROM VetClinic.OurEmployees WHERE EmployeeID=${parseInt(id)};`)
      .then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
  });
}

export default { getAllEmployees, getEmployeeById, getEmployeeByUsername, createEmployee, updateEmployee, deleteEmployeeById };
