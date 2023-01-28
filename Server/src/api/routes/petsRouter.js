import express from 'express';
import { petsController } from '../controllers/index.js';

const db = petsController.databaseQueries;
const router = express.Router();

router.get('/getAll', db.getAllPets);
router.get('/getById/:Id', db.getPetById);
router.get('/getByClient/:ownerId', db.getPetsByOwnerId);
router.post('/create', db.createPet);
router.post('/update', db.updatePet);
router.delete('/delete/:Id', db.deletePet);

const petsRouter = router;
export default petsRouter;
