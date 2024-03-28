import express from 'express';
import GestorController from '../controllers/gestorController';

const router = express.Router();

router.get('/:id', GestorController.getGestorById);
router.get('/cpf/:cpf', GestorController.getGestorByCpf);
router.get('/', GestorController.getAllGestores);
router.post('/', GestorController.createGestor);
router.put('/:id', GestorController.updateGestor);
router.delete('/:id', GestorController.deleteGestor);

export default router;

