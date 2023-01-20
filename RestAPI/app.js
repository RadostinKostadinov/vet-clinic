const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;
// ------------

const app = express();

app.use(express.json());
app.use(cors());
app.use('/static', express.static('./static'));

app.get('/', (req, res) => {
  res.send('VET CLINIC API - working');
});

app.listen(PORT, () => {
  console.log('SUCCESS: VET CLINIC API - started');
});
