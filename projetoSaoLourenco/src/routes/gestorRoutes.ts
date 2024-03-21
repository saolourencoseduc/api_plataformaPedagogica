import express, { Request, Response } from 'express';
import GestorController from '../controllers/gestorController';

const router = express.Router();

// Get all gestores
router.get('/', async (req: Request, res: Response) => {
    await GestorController.getAllGestores(req, res);
});

// Get gestor by CPF
router.get('/:cpf', async (req: Request, res: Response) => {
    await GestorController.getGestorByCPF(req, res);
});

// Create new gestor
router.post('/', async (req: Request, res: Response) => {
    await GestorController.createGestor(req, res);
});

// Update gestor by CPF
router.put('/:cpf', async (req: Request, res: Response) => {
    await GestorController.updateGestor(req, res);
});

// Delete gestor by CPF
router.delete('/:cpf', async (req: Request, res: Response) => {
    await GestorController.deleteGestor(req, res);
});

export default router;
