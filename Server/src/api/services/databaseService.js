import sql from 'mssql';
import { DatabaseConfig } from '../../config/index.js';

function connect() {
  return new Promise((resolve, reject) => {
    sql
      .connect(DatabaseConfig)
      .then((pool) => {
        resolve(pool);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Tries to establish a connection with the database X (maxAttempts) times.
 * @param {Number} maxAttempts
 * @param {Number} attempt
 * @returns SQL Connection Pool || Error
 */
export function connectToDB(maxAttempts, attempt = 0) {
  return new Promise((resolve, reject) => {
    connect()
      .then((pool) => {
        console.log('SUCCESS: VET CLINIC API - connected to DB.');
        resolve(pool);
      })
      .catch((err) => {
        if (attempt >= maxAttempts) {
          reject(err);
        }
        console.error("Can't connect to DB...");
        console.error(err.message);
        console.error(`Retrying...(${attempt})`);
        setTimeout(() => {
          connectToDB(maxAttempts, attempt + 1);
        }, 2000);
      });
  });
}
