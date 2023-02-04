export function getAllEmployees() {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/employees/getAll`)
      .then((res) => res.json())
      .then((dbResponse) => {
        dbResponse = dbResponse.map((el) => {
          return JSON.parse(el);
        });
        resolve(dbResponse);
      });
  });
}

export function getEmployeeById(employeeId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/employees/getById/${Number(employeeId)}`)
      .then((res) => {
        return res.json();
      })
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}
