import sql from 'mssql';
import { Examination } from '../../models/index.js';

/**
 * @returns {Promise<Examination[]>}
 */
function getAllExaminations() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * from VetClinic.OurExaminations;')
      .then((res) => {
        const examinations = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const examination = new Examination(res.recordset[i].ExaminationId, res.recordset[i].Pet, res.recordset[i].Employee, res.recordset[i].ExaminationDate, res.recordset[i].Occasion, res.recordset[i].Conclusion, res.recordset[i].Duration);
          examinations.push(examination);
        }

        resolve(examinations);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Number} id
 * @return {Promise<Examination>}
 */
function getExaminationById(id) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.OurExaminations WHERE ExaminationId=${id};`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error('No examination with Id ' + id);
          error.code = 'examination-not-found';
          reject(error);
        }

        const examination = new Examination(res.recordset[0].ExaminationId, res.recordset[0].Pet, res.recordset[0].Employee, res.recordset[0].ExaminationDate, res.recordset[0].Occasion, res.recordset[0].Conclusion, res.recordset[0].Duration);

        resolve(examination);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Pet} pet
 * @return {Promise<Examination[]>}
 */
function getExaminationsByPetId(petId) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.OurExaminations WHERE Pet=${parseInt(petId)};`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error('Pet with ID "' + parseInt(petId) + '" has no previous examinations.');
          error.code = 'examination-not-found';
          reject(error);
        }

        const examinations = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const examination = new Examination(res.recordset[i].ExaminationId, res.recordset[i].Pet, res.recordset[i].Employee, res.recordset[i].ExaminationDate, res.recordset[i].Occasion, res.recordset[i].Conclusion, res.recordset[i].Duration);
          examinations.push(examination);
        }

        resolve(examinations);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Examination} examination
 * @return {Promise<Examination>}
 */
function createExamination(examination) {
  if (!(examination instanceof Examination)) {
    throw new Error('Argument 1 in function createExamination must be an instance of class "Examination".');
  }

  return new Promise((resolve, reject) => {
    sql.query(`INSERT INTO VetClinic.Examinations (Pet, Employee, ExaminationDate, Occasion, Conclusion, Duration)
      OUTPUT INSERTED.ExaminationId, INSERTED.Pet, INSERTED.Employee, INSERTED.ExaminationDate, INSERTED.Occasion, INSERTED.Conclusion, INSERTED.Duration
      VALUES ('${Number(examination.petId)}', '${Number(examination.employeeId)}', CONVERT(DATETIME, '${examination.examinationDate.toISOString().slice(0, -1)}', 126), N'${examination.occasion}', N'${examination.conclusion}', '${Number(examination.duration)}');`)
      .then((res) => {
        const createdExamination = new Examination(res.recordset[0].ExaminationId, res.recordset[0].Pet, res.recordset[0].Employee, res.recordset[0].ExaminationDate, res.recordset[0].Occasion, res.recordset[0].Conclusion, res.recordset[0].Duration);

        resolve(createdExamination);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {String} queryString
 * @return {Promise<Examination>}
 */
function updateExamination(queryString) {
  return new Promise((resolve, reject) => {
    sql.query(queryString)
      .then((res) => {
        const ExaminationObj = new Examination(res.recordset[0].ExaminationId, res.recordset[0].Pet, res.recordset[0].Employee, res.recordset[0].ExaminationDate, res.recordset[0].Occasion, res.recordset[0].Conclusion, res.recordset[0].Duration);

        resolve(ExaminationObj);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Number} id
 * @return {Promise<sql.IResult>}
 */
function deleteExamination(id) {
  return new Promise((resolve, reject) => {
    sql.query(`DELETE FROM VetClinic.OurExaminations WHERE ExaminationId=${parseInt(id)};`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default { getAllExaminations, getExaminationById, getExaminationsByPetId, createExamination, updateExamination, deleteExamination };
