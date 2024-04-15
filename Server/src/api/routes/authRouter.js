import express from 'express';

import { authController } from '../controllers/index.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

router.post('/client/login', authController.clientLogin);
router.post('/employee/login', authController.employeeLogin);
router.post('/refreshToken', authController.refreshToken);

router.get('/logout', verifyJWT, authController.logout);

const authRouter = router;
export default authRouter;
