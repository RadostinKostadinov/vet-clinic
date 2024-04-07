import sql from 'mssql';
import { Pet } from '../../models/index.js';
import { camelizeKeys } from '../../helpers/camelizeKeys.js';

/**
 * @returns {Promise<Pet[]>}
 */
function getAllPets() {
  return new Promise((resolve, reject) => {
    sql
      .query(
        "SELECT OurPets.*, Clients.Username as clientUsername, CONCAT(Clients.Firstname, ' ', Clients.Lastname) as clientName, Clients.Phone, Clients.Address FROM VetClinic.OurPets JOIN VetClinic.Clients ON OurPets.Owner = Clients.ClientID"
      )
      .then((res) => {
        const pets = [];
        res.recordset.forEach((record) => pets.push(camelizeKeys(record)));
        console.log(pets[0]);
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
    sql
      .query(`SELECT * from VetClinic.OurPets WHERE PetId=${parseInt(id)};`)
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error('No pet with Id ' + id);
          error.code = 'pet-not-found';
          reject(error);
        }

        const pet = new Pet(
          res.recordset[0].PetId,
          res.recordset[0].Type,
          res.recordset[0].Breed,
          res.recordset[0].Name,
          res.recordset[0].Birthdate,
          res.recordset[0].Sex,
          res.recordset[0].Info,
          res.recordset[0].Owner
        );
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
    sql
      .query(
        `SELECT * from VetClinic.OurPets WHERE Owner=${parseInt(ownerId)};`
      )
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error(
            'Client with Id "' + ownerId + '" doesn\'t have any pets.'
          );
          error.code = 'doesnt-own-pets';
          reject(error);
        }
        const pets = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const pet = new Pet(
            res.recordset[i].PetId,
            res.recordset[i].Type,
            res.recordset[i].Breed,
            res.recordset[i].Name,
            res.recordset[i].Birthdate,
            res.recordset[i].Sex,
            res.recordset[i].Info,
            res.recordset[i].Owner
          );
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
 * @param {String} username
 * @return {Promise<Pet[]>}
 */
function getPetsByClientUsername(username) {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `SELECT VetClinic.OurPets.PetId as PetId, VetClinic.OurPets.Name as Name 
    FROM VetClinic.OurPets, VetClinic.OurClients
    WHERE VetClinic.OurPets.Owner = VetClinic.OurClients.ClientId
    AND VetClinic.OurClients.Username=N'${username}';`
      )
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error(
            'Client with username "' + username + '" doesn\'t have any pets.'
          );
          error.code = 'doesnt-own-pets';
          reject(error);
        }
        const pets = [];
        for (let i = 0; i < res.recordset.length; i++) {
          const pet = {
            petId: res.recordset[i].PetId,
            name: res.recordset[i].Name
          };
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
 * @return {Promise<Client>}
 */
function getPetsByTerm(searchTerm) {
  searchTerm.replaceAll("'", "''");
  return new Promise((resolve, reject) => {
    sql
      .query(
        `SELECT OurClients.Username, OurClients.Firstname + ' ' + OurClients.Lastname as ClientName, OurClients.Address, OurClients.Phone, OurPets.PetId, OurPets.Type, OurPets.Breed, OurPets.Name, OurPets.Birthdate, OurPets.Sex, OurPets.Info
    FROM VetClinic.OurPets, VetClinic.OurClients
    WHERE VetClinic.OurPets.Owner = VetClinic.OurClients.ClientId
    AND OurPets.Name LIKE N'%${searchTerm}%';`
      )
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error(`No pets with term "${searchTerm}"`);
          error.code = 'pet-not-found';
          throw error;
        }
        const pets = [];
        res.recordset.forEach((record) => pets.push(camelizeKeys(record)));
        resolve(res.recordset);
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
    throw new Error(
      'Argument 1 in function createPet must be an instance of class "Pet".'
    );
  }

  return new Promise((resolve, reject) => {
    sql
      .query(
        `INSERT INTO VetClinic.OurPets 
      OUTPUT INSERTED.PetId, INSERTED.Type, INSERTED.Breed, INSERTED.Name, INSERTED.Birthdate, INSERTED.Sex, INSERTED.Info, INSERTED.Owner
      VALUES (N'${pet.type}', N'${pet.breed}', N'${
          pet.name
        }', CONVERT(DATETIME, '${pet.birthdate
          .toISOString()
          .slice(0, -1)}', 126), N'${pet.sex}', N'${pet.info}', '${Number(
          pet.ownerId
        )}')`
      )
      .then((res) => {
        const pet = new Pet(
          res.recordset[0].PetId,
          res.recordset[0].Type,
          res.recordset[0].Breed,
          res.recordset[0].Name,
          res.recordset[0].Birthdate,
          res.recordset[0].Sex,
          res.recordset[0].Info,
          res.recordset[0].Owner
        );
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
    sql
      .query(queryString)
      .then((res) => {
        const pet = new Pet(
          res.recordset[0].PetId,
          res.recordset[0].Type,
          res.recordset[0].Breed,
          res.recordset[0].Name,
          res.recordset[0].Birthdate,
          res.recordset[0].Sex,
          res.recordset[0].Info,
          res.recordset[0].Owner
        );
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
    sql
      .query(`DELETE FROM VetClinic.OurPets WHERE PetId=${id};`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default {
  getAllPets,
  getPetById,
  getPetsByOwner,
  getPetsByClientUsername,
  getPetsByTerm,
  createPet,
  updatePet,
  deletePet
};
