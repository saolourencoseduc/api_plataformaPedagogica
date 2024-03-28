import { Request, Response } from "express";
import AlunoModel from "../models/alunoModel";

class AlunoController {
  static async getAlunoByNomeCompleto(req: Request, res: Response): Promise<void> {
    const nomeCompleto = req.params.nomeCompleto;

    try {
      const aluno = await AlunoModel.findByNomeCompleto(nomeCompleto);
      if (aluno) {
        res.status(200).json(aluno);
      } else {
        res.status(404).json({ message: "Aluno not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAlunoByCpf(req: Request, res: Response): Promise<void> {
    const cpf = req.params.cpf;

    try {
      const aluno = await AlunoModel.findByCpf(cpf);
      if (aluno) {
        res.status(200).json(aluno);
      } else {
        res.status(404).json({ message: "Aluno not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllAlunos(req: Request, res: Response): Promise<void> {
    try {
      const alunos = await AlunoModel.findAll();
      res.status(200).json(alunos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createAluno(req: Request, res: Response): Promise<void> {
    const alunoData = req.body;

    try {
      const newAluno = new AlunoModel(alunoData);
      const savedAluno = await newAluno.save();
      res.status(201).json(savedAluno);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateAluno(req: Request, res: Response): Promise<void> {
    const alunoId = req.params.id;
    const updatedAlunoData = req.body;

    try {
      const existingAluno = await AlunoModel.findById(alunoId);

      if (existingAluno) {
        const updatedAluno = new AlunoModel({
          ...existingAluno,
          ...updatedAlunoData,
        });

        await updatedAluno.update();

        res.status(200).json(updatedAluno);
      } else {
        res.status(404).json({ message: "Aluno not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteAluno(req: Request, res: Response): Promise<void> {
    const alunoId = req.params.id;

    try {
      await AlunoModel.excluirPorId(alunoId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default AlunoController;
