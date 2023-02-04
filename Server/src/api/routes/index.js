// Libraries
import express from 'express';

import clientsRouter from './clientsRouter.js';
import employeesRouters from './employeesRouter.js';
import petsRouter from './petsRouter.js';
import examinationsRouter from './examinationsRouter.js';
import authRouter from './authRouter.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

// No authentication needed for this routes
router.get('/testapi', (req, res) => res.status(200).send('VET CLINIC API - working.'));
router.use('/auth', authRouter);

// router.use(verifyJWT);

// API main routes (need authentication)
router.use('/pets', petsRouter);
router.use('/examinations', examinationsRouter);
router.use('/employees', employeesRouters);
router.use('/clients', clientsRouter);

const AppRouter = router;
export default AppRouter;
