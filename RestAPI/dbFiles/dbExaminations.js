import sql from 'mssql';
import Examination from './dbSchemas/Examination.js';

/**
 * @returns {Promise<Examination[]>}
 */
function getExaminations() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * from VetClinic.Examinations')
      .then((res) => {
        const examinations = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const ExaminationObj = new Examination(res.recordset[i].ExaminationID, res.recordset[i].Pet, res.recordset[i].Employee, res.recordset[i].ExaminationDate, res.recordset[i].Occasion, res.recordset[i].Conclusion, res.recordset[i].Duration);
          examinations.push(ExaminationObj);
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
    id = parseInt(id);
    if (Number.isNaN(id)) {
      reject(new Error('ID must be a valid number.'));
    }

    sql.query(`SELECT * from VetClinic.Examinations WHERE ExaminationID=${id};`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          reject(new Error('No examination with ID ' + id));
        }

        const ExaminationObj = new Examination(res.recordset[0].ExaminationID, res.recordset[0].Pet, res.recordset[0].Employee, res.recordset[0].ExaminationDate, res.recordset[0].Occasion, res.recordset[0].Conclusion, res.recordset[0].Duration);

        resolve(ExaminationObj);
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
function getExaminationsByPet(pet) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.Examinations WHERE Pet=${pet.petID};`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          reject(new Error('Pet with name "' + pet.name + '" has no previous examinations.'));
        }
        const examinations = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const ExaminationObj = new Examination(res.recordset[i].ExaminationID, res.recordset[i].Pet, res.recordset[i].Employee, res.recordset[i].ExaminationDate, res.recordset[i].Occasion, res.recordset[i].Conclusion, res.recordset[i].Duration);
          examinations.push(ExaminationObj);
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

  console.log(examination.petID);
  console.log(examination.employeeID);
  console.log(examination.examinationDate);
  console.log(examination.occasion);
  console.log(examination.conclusion);
  console.log(examination.duration);

  return new Promise((resolve, reject) => {
    sql.query(`INSERT INTO VetClinic.Examinations (Pet, Employee, ExaminationDate, Occasion, Conclusion, Duration)
      OUTPUT INSERTED.ExaminationID, INSERTED.Pet, INSERTED.Employee, INSERTED.ExaminationDate, INSERTED.Occasion, INSERTED.Conclusion, INSERTED.Duration
      VALUES ('${Number(examination.petID)}', '${Number(examination.employeeID)}', CONVERT(DATETIME, '${examination.examinationDate.toISOString().slice(0, -1)}', 126), N'${examination.occasion}', N'${examination.conclusion}', '${Number(examination.duration)}');`)
      .then((res) => {
        const ExaminationObj = new Examination(res.recordset[0].ExaminationID, res.recordset[0].Pet, res.recordset[0].Employee, res.recordset[0].ExaminationDate, res.recordset[0].Occasion, res.recordset[0].Conclusion, res.recordset[0].Duration);
        resolve(ExaminationObj);
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
function updateExamination(examination) {
  if (!(examination instanceof Examination)) {
    throw new Error('Argument 1 in function updateExamination must be an instance of class "Examination".');
  }

  return new Promise((resolve, reject) => {
    sql.query(`UPDATE VetClinic.Examinations
      SET Pet='${examination.petID}', Employee='${examination.employeeID}', ExaminationDate=CONVERT(DATETIME, '${examination.examinationDate.toISOString().slice(0, -1)}', 126), Occasion=N'${examination.occasion}', Conclusion=N'${examination.conclusion}', Duration='${examination.duration}'  
      OUTPUT INSERTED.ExaminationID, INSERTED.Pet, INSERTED.Employee, INSERTED.ExaminationDate, INSERTED.Occasion, INSERTED.Conclusion, INSERTED.Duration
      WHERE ExaminationID=${examination.examinationID};`)
      .then((res) => {
        const ExaminationObj = new Examination(res.recordset[0].ExaminationID, res.recordset[0].Pet, res.recordset[0].Employee, res.recordset[0].ExaminationDate, res.recordset[0].Occasion, res.recordset[0].Conclusion, res.recordset[0].Duration);
        resolve(ExaminationObj);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Examination} examination
 * @return {Promise<sql.IResult>}
 */
function deleteExamination(examination) {
  if (!(examination instanceof Examination)) {
    throw new Error('Argument 1 in function deleteExamination must be an instance of class "Examination".');
  }

  return new Promise((resolve, reject) => {
    sql.query(`DELETE FROM VetClinic.Examinations WHERE ExaminationID=${examination.examinationID};`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default { getExaminations, getExaminationById, getExaminationsByPet, createExamination, updateExamination, deleteExamination };
