import express from 'express';
import { clientsController } from '../controllers/index.js';

const db = clientsController.databaseQueries;
const router = express.Router();

router.get('/getAll', db.getAllClients);
router.get('/getById/:id', db.getClientById);
router.get('/getByUsername/:username', db.getClientByUsername);
router.post('/create', db.createClient);
router.post('/update', db.updateClient);
router.delete('/delete/:Id', db.deleteClient);

const clientsRouter = router;
export default clientsRouter;
