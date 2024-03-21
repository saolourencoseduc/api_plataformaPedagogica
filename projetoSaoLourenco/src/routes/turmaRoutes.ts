import express, { Request, Response } from "express";
import TurmaController from "../controllers/turmaController";

const router = express.Router();

// Get all turmas
router.get("/", async (req: Request, res: Response) => {
  await TurmaController.getAllTurmas(req, res);
});

// Get turma by CPF
router.get("/:cpf", async (req: Request, res: Response) => {
  await TurmaController.getTurmaByCPF(req, res);
});

// Create new turma
router.post("/", async (req: Request, res: Response) => {
  await TurmaController.createTurma(req, res);
});

// Update turma by CPF
router.put("/:cpf", async (req: Request, res: Response) => {
  await TurmaController.updateTurma(req, res);
});

// Delete turma by CPF
router.delete("/:cpf", async (req: Request, res: Response) => {
  await TurmaController.deleteTurma(req, res);
});

export default router;
