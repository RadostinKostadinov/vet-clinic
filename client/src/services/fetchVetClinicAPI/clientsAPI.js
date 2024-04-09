import fetchVetClinicAPI from "./fetchVetClinicAPI";

export function getClientsByTerm(term) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/clients/getByTerm/${term}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}

export function clientLogin(username, password) {
  return fetchVetClinicAPI(`http://localhost:5000/auth/client/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
}
// export function clientLogin(username, password) {
//   return new Promise((resolve, reject) => {
//     fetch(`http://localhost:5000/auth/client/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ username: username, password: password }),
//     })
//       .then((res) => res.json())
//       .then((dbResponse) => {
//         if (dbResponse.status !== 200) {
//           reject(dbResponse);
//         }
//         resolve(dbResponse);
//       });
//   });
// }

export function employeeLogin(username, password) {
  return fetchVetClinicAPI(`http://localhost:5000/auth/employee/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
}
// export function employeeLogin(username, password) {
//   return new Promise((resolve, reject) => {
//     fetch(`http://localhost:5000/auth/employee/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ username: username, password: password }),
//     })
//       .then((res) => res.json())
//       .then((dbResponse) => {
//         if (dbResponse.status !== 200) {
//           reject(dbResponse);
//         }
//         resolve(dbResponse);
//       });
//   });
// }

export function userLogout() {
  return fetchVetClinicAPI(`http://localhost:5000/auth/logout`, {
    method: "GET",
  });
}
// export function userLogout() {
//   return new Promise((resolve, reject) => {
//     fetch(`http://localhost:5000/auth/logout`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((dbResponse) => {
//         if (dbResponse.status !== 200) {
//           reject(dbResponse);
//         }
//         resolve(dbResponse);
//       });
//   });
// }

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
