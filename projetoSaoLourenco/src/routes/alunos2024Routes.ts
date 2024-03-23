import express, { Request, Response } from 'express';
import Aluno2024Controller from '../controllers/alunos2024Controller';

const router = express.Router();

// Get all alunos2024
router.get('/', async (req: Request, res: Response) => {
  await Aluno2024Controller.getAllAlunos2024(req, res);
});

// Get aluno2024 by CPF
router.get('/cpf/:cpf', async (req: Request, res: Response) => {
  await Aluno2024Controller.getAluno2024ByCPF(req, res);
});

// Create new aluno2024
router.post('/', async (req: Request, res: Response) => {
  await Aluno2024Controller.createAluno2024(req, res);
});

// Update aluno2024 by CPF
router.put('/cpf/:cpf', async (req: Request, res: Response) => {
  await Aluno2024Controller.updateAluno2024ByCPF(req, res);
});

// Delete aluno2024 by CPF
router.delete('/cpf/:cpf', async (req: Request, res: Response) => {
  await Aluno2024Controller.deleteAluno2024ByCPF(req, res);
});

export default router;
