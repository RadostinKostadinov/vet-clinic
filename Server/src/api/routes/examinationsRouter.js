import express from 'express';
import { examinationsController } from '../controllers/index.js';
import { isEmployee } from '../middleware/isEmployee.js';

const db = examinationsController.databaseQueries;
const router = express.Router();

// IsPetOwner
router.get('/getByPetId/:Id', db.getPetExaminations);

// router.use(isEmployee);

router.get('/getAll', db.getAllExaminations);
router.get('/getById/:Id', db.getExaminationById);
router.get('/getByDate/', db.getExaminationsByDate);
router.get('/getInfoByDate/', db.getExaminationsInfoByDate);
router.post('/create', db.createExamination);
router.post('/update', db.updateExamination);
router.delete('/delete/:Id', db.deleteExamination);

const examinationsRouter = router;
export default examinationsRouter;
