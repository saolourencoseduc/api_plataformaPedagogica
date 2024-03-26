import express, { Request, Response } from "express";
import AlunoController from "../controllers/alunoController";

const router = express.Router();

// Get all alunos
router.get("/", async (req: Request, res: Response) => {
  await AlunoController.getAllAlunos(req, res);
});

// Get aluno by field
router.get("/:field/:value", async (req: Request, res: Response) => {
  await AlunoController.getAlunoByField(req, res);
});

// Create new aluno
router.post("/", async (req: Request, res: Response) => {
  await AlunoController.createAluno(req, res);
});

// Update aluno by ID
router.put("/:id", async (req: Request, res: Response) => {
  await AlunoController.updateAluno(req, res);
});

// Delete aluno by ID
router.delete("/:id", async (req: Request, res: Response) => {
  await AlunoController.deleteAluno(req, res);
});

export default router;
