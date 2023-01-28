import dotenv from 'dotenv';
dotenv.config();

const DatabaseConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_UID,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: true
  }
};

export default DatabaseConfig;
