import { examinationValidations } from '../validations/index.js';

/**
 * @param {Request.body} reqBody
 * @param {Number} targetId
 * @returns {String} SQL query string
 */
export function generateUpdateQuery(reqBody) {
  examinationValidations.validateExamination(reqBody);
  const updateString = extractUpdateString(reqBody);
  const table = 'VetClinic.OurExaminations';

  return `UPDATE ${table} SET ${updateString} OUTPUT INSERTED.ExaminationId, INSERTED.Pet, INSERTED.Employee, INSERTED.ExaminationDate, INSERTED.Occasion, INSERTED.Conclusion, INSERTED.Duration WHERE ExaminationId=${reqBody.examinationId};`;
};

function extractUpdateString(reqBody) {
  const queryParts = [];
  if (typeof reqBody.petId !== 'undefined') {
    queryParts.push(`Pet='${parseInt(reqBody.petId)}'`);
  }
  if (typeof reqBody.employeeId !== 'undefined') {
    queryParts.push(`Employee='${parseInt(reqBody.employeeId)}'`);
  }
  if (typeof reqBody.name !== 'undefined') {
    queryParts.push(`Name=N'${reqBody.name.replaceAll("'", "''")}'`);
  }
  if (typeof reqBody.examinationDate !== 'undefined') {
    queryParts.push(`ExaminationDate=CONVERT(DATETIME, '${new Date(reqBody.examinationDate).toISOString().slice(0, -1)}', 126)`);
  }
  if (typeof reqBody.occasion !== 'undefined') {
    queryParts.push(`Occasion=N'${reqBody.occasion.replaceAll("'", "''")}'`);
  }
  if (typeof reqBody.conclusion !== 'undefined') {
    queryParts.push(`Conclusion=N'${reqBody.conclusion.replaceAll("'", "''")}'`);
  }
  if (typeof reqBody.duration !== 'undefined') {
    queryParts.push(`Duration='${parseInt(reqBody.duration)}'`);
  }

  const updateString = queryParts.join(', ');
  return updateString;
}
