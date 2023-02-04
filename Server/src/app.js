// Libraries
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Our modules
import AppRouter from './api/routes/index.js';
import { connectToDB } from './api/services/databaseService.js';

// Variables
dotenv.config();
const PORT = process.env.PORT || 3000;
// ------------

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(AppRouter);

// Establishes connection with database
// Then starts the HTTP server
connectToDB(3)
  .then((pool) => {
    app.listen(PORT, () => {
      console.log('SUCCESS: VET CLINIC API - started.');
    });
  }).catch((error) => {
    return error;
  });
