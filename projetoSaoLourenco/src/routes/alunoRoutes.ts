import express, { Request, Response } from "express";
import AlunoController from "../controllers/alunoController";

const router = express.Router();

// Get all alunos
router.get("/", async (req: Request, res: Response) => {
  await AlunoController.getAllAlunos(req, res);
});

// Get aluno by CPF
router.get("/cpf/:cpf", async (req: Request, res: Response) => {
  await AlunoController.getAlunoByCPF(req, res);
});

// Create new aluno
router.post("/", async (req: Request, res: Response) => {
  await AlunoController.createAluno(req, res);
});

// Update aluno by CPF
router.put("/cpf/:cpf", async (req: Request, res: Response) => {
  await AlunoController.updateAlunoByCPF(req, res);
});

// Delete aluno by CPF
router.delete("/cpf/:cpf", async (req: Request, res: Response) => {
  await AlunoController.deleteAlunoByCPF(req, res);
});

export default router;
