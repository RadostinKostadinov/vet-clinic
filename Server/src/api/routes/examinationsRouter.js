import express from 'express';
import { examinationsController } from '../controllers/index.js';

const db = examinationsController.databaseQueries;
const router = express.Router();

router.get('/getAll', db.getAllExaminations);
router.get('/getById/:Id', db.getExaminationById);
router.get('/getByPetId/:Id', db.getPetExaminations);
router.post('/create', db.createExamination);
router.post('/update', db.updateExamination);
router.delete('/delete/:Id', db.deleteExamination);

const examinationsRouter = router;
export default examinationsRouter;
