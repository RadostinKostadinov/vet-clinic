import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sql from 'mssql';
import bcrypt from 'bcrypt';

import dbConfig from './dbFiles/dbConfig.js';
import dbEmployees from './dbFiles/dbEmployees.js';
import Employee from './dbFiles/dbSchemas/Employee.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
// ------------

const app = express();

app.use(express.json());
app.use(cors());
app.use('/static', express.static('./static'));

app.get('/', (req, res) => {
  res.send('VET CLINIC API - working.');
});

app.listen(PORT, () => {
  console.log('SUCCESS: VET CLINIC API - started.');
});

sql.connect(dbConfig, async function err(err) {
  if (err) {
    throw new Error('Can\'t connect to DB. ' + '\n' + 'Problem: ' + err.message);
  } else {
    console.log('SUCCESS: VET CLINIC API - connected to DB.');
  }
});
