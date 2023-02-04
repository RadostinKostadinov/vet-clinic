export function getClientsByTerm(term) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/clients/getByTerm/${term}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}

export function getClientById(clientId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/clients/getById/${clientId}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}

export function getAllClients() {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/clients/getAll`)
      .then((res) => res.json())
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}

export function createClient(clientObject) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/clients/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientObject),
    })
      .then((res) => res.json())
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}
