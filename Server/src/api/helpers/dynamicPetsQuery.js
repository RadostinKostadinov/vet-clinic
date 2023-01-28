import { petValidations } from '../validations/index.js';

/**
 * @param {Request.body} reqBody
 * @param {Number} targetId
 * @returns {String} SQL query string
 */
export function generateUpdateQuery(reqBody) {
  petValidations.validatePet(reqBody);
  const updateString = extractUpdateString(reqBody);
  const table = 'VetClinic.OurPets';

  return `UPDATE ${table} SET ${updateString} OUTPUT INSERTED.PetId, INSERTED.Type, INSERTED.Breed, INSERTED.Name, INSERTED.Birthdate, INSERTED.Sex, INSERTED.Info, INSERTED.Owner WHERE PetId=${reqBody.petId};`;
};

function extractUpdateString(reqBody) {
  const queryParts = [];
  if (typeof reqBody.type !== 'undefined') {
    queryParts.push(`Type=N'${reqBody.type.replaceAll("'", "''")}'`);
  }
  if (typeof reqBody.breed !== 'undefined') {
    queryParts.push(`Breed=N'${reqBody.breed.replaceAll("'", "''")}'`);
  }
  if (typeof reqBody.name !== 'undefined') {
    queryParts.push(`Name=N'${reqBody.name.replaceAll("'", "''")}'`);
  }
  if (typeof reqBody.birthdate !== 'undefined') {
    queryParts.push(`Birthdate=CONVERT(DATETIME, '${new Date(reqBody.birthdate).toISOString().slice(0, -1)}', 126)`);
  }
  if (typeof reqBody.sex !== 'undefined') {
    queryParts.push(`Sex=N'${reqBody.sex}'`);
  }
  if (typeof reqBody.info !== 'undefined') {
    queryParts.push(`Info=N'${reqBody.info.replaceAll("'", "''")}'`);
  }
  if (typeof reqBody.ownerId !== 'undefined') {
    queryParts.push(`Owner='${parseInt(reqBody.ownerId)}'`);
  }

  const updateString = queryParts.join(', ');
  return updateString;
}
