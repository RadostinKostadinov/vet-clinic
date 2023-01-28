import express from 'express';
import { employeesController } from '../controllers/index.js';

const db = employeesController.databaseQueries;
const router = express.Router();

router.get('/getAll', db.getAllEmployees);
router.get('/getById/:Id', db.getEmployeeById);
router.post('/create', db.createEmployee);
router.post('/update', db.updateEmployee);
router.delete('/delete/:Id', db.deleteEmployee);

const employeesRouter = router;
export default employeesRouter;
