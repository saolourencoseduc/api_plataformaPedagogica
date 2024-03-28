import { Request, Response } from "express";
import AlunoModel from "../models/alunoModel";

class AlunoController {
  static async getAlunoByField(req: Request, res: Response): Promise<void> {
    const field = req.query.field as string;
    const value = req.query.value as string;

    try {
      let aluno;
      switch (field) {
        case 'nome_completo':
          aluno = await AlunoModel.findByNomeCompleto(value);
          break;
        case 'cpf':
          aluno = await AlunoModel.findByCpf(value);
          break;
        case 'codigo_inep':
          aluno = await AlunoModel.findByCodigoInep(value);
          break;
        default:
          res.status(400).json({ message: "Invalid field" });
          return;
      }

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
      const savedAluno = await newAluno.save(); // Alterado aqui
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

        await updatedAluno.update(); // Alterado aqui

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
