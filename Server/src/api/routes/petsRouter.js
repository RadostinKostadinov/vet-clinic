import express from 'express';
import { petsController } from '../controllers/index.js';

const db = petsController.databaseQueries;
const router = express.Router();

// IsPetOwner
router.get('/getByClientId/:ownerId', db.getPetsByOwnerId);
router.get('/getByClientUsername/:username', db.getPetsByClientUsername);

router.get('/getAll', db.getAllPets);
router.get('/getById/:Id', db.getPetById);
router.get('/getByTerm/:searchTerm', db.getPetsByTerm);
router.post('/create', db.createPet);
router.post('/update', db.updatePet);
router.delete('/delete/:Id', db.deletePet);

const petsRouter = router;
export default petsRouter;
