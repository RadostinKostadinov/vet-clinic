import bcrypt from 'bcrypt';
import { employeeValidations } from '../validations/index.js';

/**
 * @param {Request.body} reqBody
 * @param {Number} targetId
 * @returns {String} SQL query string
 */
export async function generateUpdateQuery(reqBody) {
  employeeValidations.validateEmployee(reqBody);
  const updateString = await extractUpdateString(reqBody);
  const table = 'VetClinic.OurEmployees';

  return `UPDATE ${table} SET ${updateString} OUTPUT INSERTED.Username, INSERTED.Firstname, INSERTED.Lastname, INSERTED.Password, INSERTED.EmployeeId WHERE EmployeeId=${reqBody.employeeId};`;
}

async function extractUpdateString(reqBody) {
  const queryParts = [];
  if (typeof reqBody.password !== 'undefined') {
    const hashed = await bcrypt.hash(reqBody.password, 10);
    queryParts.push(`Password='${hashed}'`);
  }

  return new Promise((resolve, reject) => {
    if (typeof reqBody.firstName !== 'undefined') {
      queryParts.push(
        `Firstname='${reqBody.firstName.toString().replaceAll("'", "''")}'`
      );
    }
    if (typeof reqBody.lastName !== 'undefined') {
      queryParts.push(`Lastname='${reqBody.lastName.replaceAll("'", "''")}'`);
    }

    const updateString = queryParts.join(', ');
    resolve(updateString);
  });
}
