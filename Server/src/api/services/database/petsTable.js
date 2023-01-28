import sql from 'mssql';
import { Pet } from '../../models/index.js';

/**
 * @returns {Promise<Pet[]>}
 */
function getAllPets() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * from VetClinic.OurPets;')
      .then((res) => {
        const pets = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const pet = new Pet(res.recordset[i].PetId, res.recordset[i].Type, res.recordset[i].Breed, res.recordset[i].Name, res.recordset[i].Birthdate, res.recordset[i].Sex, res.recordset[i].Info, res.recordset[i].Owner);
          pets.push(pet);
        }
        resolve(pets);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Number} id
 * @return {Promise<Pet>}
 */
function getPetById(id) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.OurPets WHERE PetId=${parseInt(id)};`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error('No pet with Id ' + id);
          error.code = 'pet-not-found';
          reject(error);
        }

        const pet = new Pet(res.recordset[0].PetId, res.recordset[0].Type, res.recordset[0].Breed, res.recordset[0].Name, res.recordset[0].Birthdate, res.recordset[0].Sex, res.recordset[0].Info, res.recordset[0].Owner);
        resolve(pet);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Number} ownerId
 * @return {Promise<Pet[]>}
 */
function getPetsByOwner(ownerId) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.OurPets WHERE Owner=${parseInt(ownerId)};`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error('Client with Id "' + ownerId + '" doesn\'t have any pets.');
          error.code = 'doesnt-own-pets';
          reject(error);
        }
        const pets = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const pet = new Pet(res.recordset[i].PetId, res.recordset[i].Type, res.recordset[i].Breed, res.recordset[i].Name, res.recordset[i].Birthdate, res.recordset[i].Sex, res.recordset[i].Info, res.recordset[i].Owner);
          pets.push(pet);
        }
        resolve(pets);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Pet} pet
 * @return {Promise<Pet>}
 */
function createPet(pet) {
  if (!(pet instanceof Pet)) {
    throw new Error('Argument 1 in function createPet must be an instance of class "Pet".');
  }

  return new Promise((resolve, reject) => {
    sql.query(`INSERT INTO VetClinic.OurPets 
      OUTPUT INSERTED.PetId, INSERTED.Type, INSERTED.Breed, INSERTED.Name, INSERTED.Birthdate, INSERTED.Sex, INSERTED.Info, INSERTED.Owner
      VALUES (N'${pet.type}', N'${pet.breed}', N'${pet.name}', CONVERT(DATETIME, '${pet.birthdate.toISOString().slice(0, -1)}', 126), N'${pet.sex}', N'${pet.info}', '${Number(pet.ownerId)}')`)
      .then((res) => {
        const pet = new Pet(res.recordset[0].PetId, res.recordset[0].Type, res.recordset[0].Breed, res.recordset[0].Name, res.recordset[0].Birthdate, res.recordset[0].Sex, res.recordset[0].Info, res.recordset[0].Owner);
        resolve(pet);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @return {Promise<Pet>}
 */
function updatePet(queryString) {
  return new Promise((resolve, reject) => {
    sql.query(queryString)
      .then((res) => {
        const pet = new Pet(res.recordset[0].PetId, res.recordset[0].Type, res.recordset[0].Breed, res.recordset[0].Name, res.recordset[0].Birthdate, res.recordset[0].Sex, res.recordset[0].Info, res.recordset[0].Owner);
        resolve(pet);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Pet} pet
 * @return {Promise<sql.IResult>}
 */
function deletePet(id) {
  return new Promise((resolve, reject) => {
    sql.query(`DELETE FROM VetClinic.OurPets WHERE PetId=${id};`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default { getAllPets, getPetById, getPetsByOwner, createPet, updatePet, deletePet };
