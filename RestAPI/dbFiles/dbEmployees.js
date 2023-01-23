import sql from 'mssql';
import bcrypt from 'bcrypt';
import Employee from './dbSchemas/Employee.js';

async function getEmployees() {
  return new Promise((resolve, reject) => {
    try {
      sql.query('SELECT * from VetClinic.Employees').then((res) => {
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * @return {Promise.<Employee>}
 */
function getEmployeeById(id) {
  return new Promise((resolve, reject) => {
    try {
      id = parseInt(id);
      if (Number.isNaN(id)) {
        reject(new Error('ID must be a valid number.'));
      }

      sql.query(`SELECT * from VetClinic.Employees WHERE EmployeeID=${id}`).then((res) => {
        const employee = new Employee(res.recordset[0].EmployeeID, res.recordset[0].Username, 'hashedpassword', res.recordset[0].Firstname, res.recordset[0].Lastname);
        employee.hashedPassword = res.recordset[0].Password;
        resolve(employee);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function createEmployee(employee) {
  if (!(employee instanceof Employee)) {
    throw new Error('Argument 1 in function createEmployee must be an instance of class "Employee".');
  }

  employee.hashedPassword = await bcrypt.hash(employee.password, 10).then((hashedPw) => {
    return hashedPw;
  });

  return sql.query(`INSERT INTO VetClinic.Employees 
  OUTPUT INSERTED.username, INSERTED.firstName, INSERTED.lastName
  VALUES ('${employee.userName}', '${employee.password}', '${employee.firstName}', '${employee.lastName}')`);
}

async function updateEmployee(employee) {
  if (!(employee instanceof Employee)) {
    throw new Error('Argument 1 in function createEmployee must be an instance of class "Employee".');
  }

  if (employee.password.length < 20) {
    employee.hashedPassword = bcrypt.hashSync(employee.password, 10);
  }

  return new Promise((resolve, reject) => {
    try {
      sql.query(`UPDATE VetClinic.Employees SET Username='${employee.userName}', Password='${employee.password}', Firstname='${employee.firstName}', Lastname='${employee.lastName}' WHERE EmployeeID=${employee.employeeID};`).then((res) => {
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function deleteEmployeeById(employee) {
  if (!(employee instanceof Employee)) {
    throw new Error('Argument 1 in function createEmployee must be an instance of class "Employee".');
  }

  return new Promise((resolve, reject) => {
    try {
      sql.query(`DELETE FROM VetClinic.Employees WHERE EmployeeID=${employee.employeeID};`).then((res) => {
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployeeById };
