import { Request, Response } from "express";
import GestorModel from "../models/gestorModel";

class GestorController {
  static async getGestorByCPF(req: Request, res: Response): Promise<void> {
    const gestorCPF = req.params.cpf;

    try {
      const gestor = await GestorModel.findByCPF(gestorCPF);

      if (gestor) {
        res.status(200).json(gestor);
      } else {
        res.status(404).json({ message: "Gestor not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllGestores(req: Request, res: Response): Promise<void> {
    try {
      const gestores = await GestorModel.findAll();
      res.status(200).json(gestores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createGestor(req: Request, res: Response): Promise<void> {
    const gestorData = req.body;

    try {
      const novoGestor = new GestorModel(gestorData);
      const gestorSalvo = await GestorModel.save(novoGestor);
      res.status(201).json(gestorSalvo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateGestor(req: Request, res: Response): Promise<void> {
    const gestorCPF = req.params.cpf;
    const dadosAtualizadosGestor = req.body;

    try {
      const gestorExistente = await GestorModel.findByCPF(gestorCPF);

      if (gestorExistente) {
        const gestorAtualizado = new GestorModel({
          ...gestorExistente,
          ...dadosAtualizadosGestor,
        });

        await GestorModel.update(gestorAtualizado);

        res.status(200).json(gestorAtualizado);
      } else {
        res.status(404).json({ message: "Gestor not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteGestor(req: Request, res: Response): Promise<void> {
    const gestorCPF = req.params.cpf;

    try {
      await GestorModel.deleteByCPF(gestorCPF);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default GestorController;
