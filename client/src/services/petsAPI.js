export function getAllPets() {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/pets/getAll`)
      .then((res) => res.json())
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}

export function getPetsByClientId(clientId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/pets/getByClientId/${clientId}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        if (typeof dbResponse === "string") {
          resolve(dbResponse);
          return;
        }
        dbResponse = dbResponse.map((el) => {
          return JSON.parse(el);
        });
        resolve(dbResponse);
      });
  });
}

export function getPetsByTerm(term) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/pets/getByTerm/${term}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        if (typeof dbResponse === "string") {
          resolve(dbResponse);
        }
        resolve(dbResponse);
      });
  });
}

export function createPet(petObject) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/pets/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petObject),
    })
      .then((res) => res.json())
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}

export function getPetById(petId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/pets/getById/${petId}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}
