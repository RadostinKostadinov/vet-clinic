// Libraries
import express from 'express';

import clientsRouter from './clientsRouter.js';
import employeesRouters from './employeesRouter.js';
import petsRouter from './petsRouter.js';
import examinationsRouter from './examinationsRouter.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('VET CLINIC API - working.');
});

// API main routes
router.use('/pets', petsRouter);
router.use('/examinations', examinationsRouter);
router.use('/clients', clientsRouter);
router.use('/employees', employeesRouters);

const AppRouter = router;
export default AppRouter;
