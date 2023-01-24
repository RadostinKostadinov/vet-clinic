import sql from 'mssql';
import bcrypt from 'bcrypt';
import Employee from './dbSchemas/Employee.js';

/**
 * @returns {Promise<Employee[]>}
 */
function getEmployees() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * from VetClinic.Employees').then((res) => {
      const employees = [];
      for (let i = 0; i < res.recordset.length; i++) {
        const employeeObj = new Employee(res.recordset[i].EmployeeID, res.recordset[i].Username, 'hashedpassword', res.recordset[i].Firstname, res.recordset[i].Lastname);
        employeeObj.hashedPassword = res.recordset[i].Password;
        employees.push(employeeObj);
      }
      resolve(employees);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * @return {Promise<Employee>}
 */
function getEmployeeById(id) {
  return new Promise((resolve, reject) => {
    id = parseInt(id);
    if (Number.isNaN(id)) {
      reject(new Error('ID must be a valid number.'));
    }

    sql.query(`SELECT * from VetClinic.Employees WHERE EmployeeID=${id}`).then((res) => {
      const employee = new Employee(res.recordset[0].EmployeeID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname);
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
function createEmployee(employee) {
  if (!(employee instanceof Employee)) {
    throw new Error('Argument 1 in function createEmployee must be an instance of class "Employee".');
  }

  employee.hashedPassword = bcrypt.hashSync(employee.password, 10).then((hashedPw) => {
    return hashedPw;
  });

  return new Promise((resolve, reject) => {
    sql.query(`INSERT INTO VetClinic.Employees 
      OUTPUT INSERTED.username, INSERTED.firstName, INSERTED.lastName, INSERTED.password, INSERTED.employeeID
      VALUES ('${employee.userName}', '${employee.password}', '${employee.firstName}', '${employee.lastName}')`).then((res) => {
      const employee = new Employee(res.recordset[0].EmployeeID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname);
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
function updateEmployee(employee) {
  if (!(employee instanceof Employee)) {
    throw new Error('Argument 1 in function updateEmployee must be an instance of class "Employee".');
  }

  if (employee.password.length < 20) {
    employee.hashedPassword = bcrypt.hashSync(employee.password, 10);
  }

  return new Promise((resolve, reject) => {
    sql.query(`UPDATE VetClinic.Employees 
      SET Username='${employee.userName}', Password='${employee.password}', Firstname='${employee.firstName}', Lastname='${employee.lastName}' 
      OUTPUT INSERTED.Username, INSERTED.Firstname, INSERTED.Lastname, INSERTED.Password, INSERTED.EmployeeID
      WHERE EmployeeID=${employee.employeeID};`).then((res) => {
      console.log(res);
      const employee = new Employee(res.recordset[0].EmployeeID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname);
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
function deleteEmployeeById(employee) {
  if (!(employee instanceof Employee)) {
    throw new Error('Argument 1 in function deleteEmployeeById must be an instance of class "Employee".');
  }

  return new Promise((resolve, reject) => {
    sql.query(`DELETE FROM VetClinic.Employees WHERE EmployeeID=${employee.employeeID};`).then((res) => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  });
}

export default { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployeeById };
