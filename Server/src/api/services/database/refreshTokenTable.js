import sql from 'mssql';

export default {
  addRefreshToken,
  getRefreshToken,
  removeToken,
  removeExpiredTokens
};

function addRefreshToken(username, refreshToken, expiresAt, role) {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
    IF EXISTS (SELECT username FROM VetClinic.RefreshTokens WHERE username=N'${username}' AND role='${role}')  
    BEGIN  
      UPDATE VetClinic.RefreshTokens   
      SET refreshToken='${refreshToken}', expiresAt=CONVERT(DATETIME, '${expiresAt
          .toISOString()
          .slice(0, -1)}', 126)
      WHERE username=N'${username}';  
    END  
    ELSE  
    BEGIN  
      INSERT INTO VetClinic.RefreshTokens 
      (username, refreshToken, expiresAt, role)
      VALUES (N'${username}', '${refreshToken}', CONVERT(DATETIME, '${expiresAt
          .toISOString()
          .slice(0, -1)}', 126), '${role}');
    END  
    `
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `SELECT * FROM VetClinic.RefreshTokens WHERE refreshToken='${refreshToken}' AND expiresAt > GETDATE();`
      )
      .then((res) => {
        if (res.rowsAffected[0] === 0) {
          const error = new Error('Token not found.');
          error.code = 'token-not-found';
          reject(error);
        }

        resolve(res.recordset[0]);
      })
      .catch((error) => {
        resolve(error);
      });
  });
}

function removeToken(refreshToken) {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `DELETE FROM VetClinic.RefreshTokens WHERE refreshToken='${refreshToken}'`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function removeExpiredTokens() {
  return new Promise((resolve, reject) => {
    sql
      .query('DELETE FROM VetClinic.RefreshTokens WHERE expiresAt < GETDATE();')
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
