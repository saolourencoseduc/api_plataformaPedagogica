import { Request, Response } from 'express';
import GestorModel from '../models/gestorModel';

class GestorController {
  static async getGestorById(req: Request, res: Response): Promise<void> {
    try {
      const gestorId = req.params.id;
      const gestor = await GestorModel.findById(gestorId, null, null);
      if (gestor) {
        res.status(200).json(gestor);
      } else {
        res.status(404).json({ message: 'Gestor not found' });
      }
    } catch (error) {
      console.error('Error getting gestor by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getGestorByCpf(req: Request, res: Response): Promise<void> {
    try {
      const cpf = req.params.cpf;
      const gestor = await GestorModel.findByCpf(cpf);
      if (gestor) {
        res.status(200).json(gestor);
      } else {
        res.status(404).json({ message: 'Gestor not found' });
      }
    } catch (error) {
      console.error('Error getting gestor by CPF:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getGestorByNome(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.params.nome;
      const gestor = await GestorModel.findByNome(nome);
      if (gestor) {
        res.status(200).json(gestor);
      } else {
        res.status(404).json({ message: 'Gestor not found' });
      }
    } catch (error) {
      console.error('Error getting gestor by name:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getAllGestores(req: Request, res: Response): Promise<void> {
    try {
      const gestores = await GestorModel.findAll();
      res.status(200).json(gestores);
    } catch (error) {
      console.error('Error getting all gestores:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createGestor(req: Request, res: Response): Promise<void> {
    try {
      const newGestor = new GestorModel(req.body);
      const savedGestor = await GestorModel.save(newGestor);
      res.status(201).json(savedGestor);
    } catch (error) {
      console.error('Error creating gestor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateGestor(req: Request, res: Response): Promise<void> {
    try {
      const gestorId = req.params.id;
      const gestorData = req.body;
      const updatedGestor = await GestorModel.update({ id: gestorId, ...gestorData });
      res.status(200).json(updatedGestor);
    } catch (error) {
      console.error('Error updating gestor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteGestor(req: Request, res: Response): Promise<void> {
    try {
      const gestorId = req.params.id;
      await GestorModel.excluirPorId(gestorId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting gestor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default GestorController;
