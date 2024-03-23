import { Request, Response } from 'express';
import Aluno2024 from '../models/alunos2024Model';

class Aluno2024Controller {
  async getAllAlunos2024(req: Request, res: Response) {
    try {
      const alunos = await Aluno2024.find();
      res.json(alunos);
    } catch (error: any) { // Ajuste aqui
      res.status(500).json({ message: error.message });
    }
  }

  async getAluno2024ByCPF(req: Request, res: Response) {
    try {
      const aluno = await Aluno2024.findOne({ cpf: req.params.cpf });
      if (!aluno) {
        res.status(404).json({ message: 'Aluno not found' });
        return;
      }
      res.json(aluno);
    } catch (error: any) { // Ajuste aqui
      res.status(500).json({ message: error.message });
    }
  }

  async createAluno2024(req: Request, res: Response) {
    const aluno = new Aluno2024(req.body);
    try {
      const novoAluno = await aluno.save();
      res.status(201).json(novoAluno);
    } catch (error: any) { // Ajuste aqui
      res.status(400).json({ message: error.message });
    }
  }

  async updateAluno2024ByCPF(req: Request, res: Response) {
    try {
      const aluno = await Aluno2024.findOneAndUpdate({ cpf: req.params.cpf }, req.body, { new: true });
      if (!aluno) {
        res.status(404).json({ message: 'Aluno not found' });
        return;
      }
      res.json(aluno);
    } catch (error: any) { // Ajuste aqui
      res.status(400).json({ message: error.message });
    }
  }

  async deleteAluno2024ByCPF(req: Request, res: Response) {
    try {
      const aluno = await Aluno2024.findOneAndDelete({ cpf: req.params.cpf });
      if (!aluno) {
        res.status(404).json({ message: 'Aluno not found' });
        return;
      }
      res.json({ message: 'Aluno deleted successfully' });
    } catch (error: any) { // Ajuste aqui
      res.status(500).json({ message: error.message });
    }
  }
}

export default new Aluno2024Controller();
