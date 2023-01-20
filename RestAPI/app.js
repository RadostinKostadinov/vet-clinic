import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sql from 'mssql';

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

sql.connect(`Driver={ODBC Driver 18 for SQL Server};Server=tcp:rk-recheck-vet-clinic.database.windows.net,1433;Database=${process.env.DATABASE};Uid=${process.env.DB_UID};Pwd=${process.env.DB_PASSWORD};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;`, (err) => {
  if (err) {
    throw new Error('Can\'t connect to DB.');
  } else {
    console.log('SUCCESS: VET CLINIC API - connected to DB.');
  }
});
