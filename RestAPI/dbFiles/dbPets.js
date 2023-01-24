import sql from 'mssql';
import Pet from './dbSchemas/Pet.js';

/**
 * @returns {Promise<Pet[]>}
 */
function getPets() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * from VetClinic.Pets WHERE IsDeleted = 0;').then((res) => {
      const pets = [];
      for (let i = 0; i < res.recordset.length; i++) {
        const PetObj = new Pet(res.recordset[i].PetID, res.recordset[i].Type, res.recordset[i].Breed, res.recordset[i].Name, res.recordset[i].Birthdate, res.recordset[i].Sex, res.recordset[i].Info, res.recordset[i].Owner);
        pets.push(PetObj);
      }
      resolve(pets);
    }).catch((error) => {
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
    id = parseInt(id);
    if (Number.isNaN(id)) {
      reject(new Error('ID must be a valid number.'));
    }

    sql.query(`SELECT * from VetClinic.Pets WHERE PetID=${id} AND IsDeleted = 0;`).then((res) => {
      if (res.rowsAffected[0] === 0) {
        reject(new Error('No pet with ID ' + id));
      }

      const PetObj = new Pet(res.recordset[0].PetID, res.recordset[0].Type, res.recordset[0].Breed, res.recordset[0].Name, res.recordset[0].Birthdate, res.recordset[0].Sex, res.recordset[0].Info, res.recordset[0].Owner);
      resolve(PetObj);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * @param {Client} client
 * @return {Promise<Pet[]>}
 */
function getPetsByOwner(client) {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * from VetClinic.Pets WHERE Owner=${client.clientID} AND IsDeleted = 0;`).then((res) => {
      if (res.rowsAffected[0] === 0) {
        reject(new Error('Client with username "' + client.userName + '" doesn\'t have any pets.'));
      }
      const pets = [];
      for (let i = 0; i < res.recordset.length; i++) {
        const PetObj = new Pet(res.recordset[i].PetID, res.recordset[i].Type, res.recordset[i].Breed, res.recordset[i].Name, res.recordset[i].Birthdate, res.recordset[i].Sex, res.recordset[i].Info, res.recordset[i].Owner);
        pets.push(PetObj);
      }
      resolve(pets);
    }).catch((error) => {
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
    sql.query(`INSERT INTO VetClinic.Pets 
      OUTPUT INSERTED.PetID, INSERTED.Type, INSERTED.Breed, INSERTED.Name, INSERTED.Birthdate, INSERTED.Sex, INSERTED.Info, INSERTED.Owner
      VALUES (N'${pet.type}', N'${pet.breed}', N'${pet.name}', CONVERT(DATETIME, '${pet.birthdate.toISOString().slice(0, -1)}', 126), N'${pet.sex}', N'${pet.info}', '${Number(pet.ownerID)}')`).then((res) => {
      const PetObj = new Pet(res.recordset[0].PetID, res.recordset[0].Type, res.recordset[0].Breed, res.recordset[0].Name, res.recordset[0].Birthdate, res.recordset[0].Sex, res.recordset[0].Info, res.recordset[0].Owner);
      resolve(PetObj);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * @return {Promise<Pet>}
 */
function updatePet(pet) {
  if (!(pet instanceof Pet)) {
    throw new Error('Argument 1 in function updatePet must be an instance of class "Pet".');
  }

  return new Promise((resolve, reject) => {
    sql.query(`UPDATE VetClinic.Pets
      SET Type=N'${pet.type}', Breed=N'${pet.breed}', Name=N'${pet.name}', Birthdate=CONVERT(DATETIME, '${pet.birthdate.toISOString().slice(0, -1)}', 126), Sex=N'${pet.sex}', Info=N'${pet.info}', Owner='${pet.ownerID}'  
      OUTPUT INSERTED.PetID, INSERTED.Type, INSERTED.Breed, INSERTED.Name, INSERTED.Birthdate, INSERTED.Sex, INSERTED.Info, INSERTED.Owner
      WHERE PetID=${pet.petID};`).then((res) => {
      const PetObj = new Pet(res.recordset[0].PetID, res.recordset[0].Type, res.recordset[0].Breed, res.recordset[0].Name, res.recordset[0].Birthdate, res.recordset[0].Sex, res.recordset[0].Info, res.recordset[0].Owner);
      resolve(PetObj);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * @param {Pet} pet
 * @return {Promise<sql.IResult>}
 */
function deletePet(pet) {
  if (!(pet instanceof Pet)) {
    throw new Error('Argument 1 in function deletePet must be an instance of class "Pet".');
  }

  return new Promise((resolve, reject) => {
    sql.query(`UPDATE VetClinic.Pets SET IsDeleted='${pet.petID}' WHERE PetID=${pet.petID};`).then((res) => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  });
}

export default { getPets, getPetById, getPetsByOwner, createPet, updatePet, deletePet };
