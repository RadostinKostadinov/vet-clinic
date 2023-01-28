import bcrypt from 'bcrypt';
import { clientValidations } from '../validations/index.js';

/**
 * @param {Request.body} reqBody
 * @param {Number} targetId
 * @returns {String} SQL query string
 */
export async function generateUpdateQuery(reqBody) {
  clientValidations.validateClient(reqBody);
  const updateString = await extractUpdateString(reqBody);
  const table = 'VetClinic.OurClients';

  return `UPDATE ${table} SET ${updateString} OUTPUT INSERTED.ClientID, INSERTED.Username, INSERTED.Password, INSERTED.Firstname, INSERTED.Lastname, INSERTED.Phone, INSERTED.Address WHERE ClientId=${reqBody.clientId};`;
};

async function extractUpdateString(reqBody) {
  const queryParts = [];
  if (typeof reqBody.password !== 'undefined') {
    const hashed = await bcrypt.hash(reqBody.password, 10);
    queryParts.push(`Password=N'${hashed}'`);
  }

  return new Promise((resolve, reject) => {
    if (typeof reqBody.firstName !== 'undefined') {
      queryParts.push(`Firstname=N'${reqBody.firstName.replaceAll("'", "''")}'`);
    }
    if (typeof reqBody.lastName !== 'undefined') {
      queryParts.push(`Lastname=N'${reqBody.lastName.replaceAll("'", "''")}'`);
    }
    if (typeof reqBody.phone !== 'undefined') {
      queryParts.push(`Phone=N'${reqBody.phone.replaceAll("'", "''")}'`);
    } if (typeof reqBody.address !== 'undefined') {
      queryParts.push(`Address=N'${reqBody.address.replaceAll("'", "''")}'`);
    }

    const updateString = queryParts.join(', ');
    resolve(updateString);
  });
}
