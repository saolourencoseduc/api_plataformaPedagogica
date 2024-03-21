import express, { Request, Response } from "express";
import EscolaController from "../controllers/escolaController";

const router = express.Router();

// Get all escolas
router.get("/", async (req: Request, res: Response) => {
  await EscolaController.getAllEscolas(req, res);
});

// Get escola by CPF
router.get("/:cpf", async (req: Request, res: Response) => {
  await EscolaController.getEscolaByCPF(req, res);
});

// Create new escola
router.post("/", async (req: Request, res: Response) => {
  await EscolaController.createEscola(req, res);
});

// Update escola by CPF
router.put("/:cpf", async (req: Request, res: Response) => {
  await EscolaController.updateEscolaByCPF(req, res);
});

// Delete escola by CPF
router.delete("/:cpf", async (req: Request, res: Response) => {
  await EscolaController.deleteEscolaByCPF(req, res);
});

export default router;
