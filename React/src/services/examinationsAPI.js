export async function addExamination(examinationObject) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/examinations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examinationObject),
    })
      .then((res) => res.json())
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}

export async function getExaminationsByPetId(petId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/examinations/getByPetId/${petId}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        if (typeof dbResponse === "string") {
          resolve(dbResponse);
        }
        dbResponse = dbResponse.map((el) => {
          return JSON.parse(el);
        });
        resolve(dbResponse);
      });
  });
}

export async function getExaminationById(examinationId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/examinations/getById/${examinationId}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        if (typeof dbResponse === "string") {
          resolve(dbResponse);
        }
        resolve(dbResponse);
      });
  });
}

export async function deleteExamination(examinationId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/examinations/delete/${examinationId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((dbResponse) => {
        if (typeof dbResponse === "string") {
          resolve(dbResponse);
        }
        resolve(dbResponse);
      });
  });
}

export async function updateExamination(examinationObject) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/examinations/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examinationObject),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        } else {
          reject(
            new Error(
              "Съжаляваме, но в момента има проблем със сървърите, нашите техници работят по отстраняването. Благодарим Ви за търпението!"
            )
          );
        }
      })
      .then((dbResponse) => {
        resolve(dbResponse);
      });
  });
}
