import { Request, Response } from "express";
import dancaService from "../services/danca.service";

class DancaController {
  async criarDanca(req: Request, res: Response) {
    try {
      const { nomeDanca, tipo, quesitoId } = req.body;
      const novaDanca = await dancaService.criarDanca(nomeDanca, tipo);
      res.status(201).json(novaDanca);
    } catch (error) {
      console.error("Erro ao criar dança:", error);
      res.status(500).json({ error: "Erro ao criar dança" });
    }
  }

  async atualizarDanca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dados = req.body;
      const dancaAtualizada = await dancaService.atualizarDanca(Number(id), dados);
      res.json(dancaAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar dança:", error);
      res.status(500).json({ error: "Erro ao atualizar dança" });
    }
  }

  async listarDancasTradicionais(req: Request, res: Response) {
    try {
      const dancas = await dancaService.buscarDancasTradicionais();
      res.json(dancas);
    } catch (error) {
      console.error("Erro ao listar danças tradicionais:", error);
      res.status(500).json({ error: "Erro ao listar danças tradicionais" });
    }
  }

  async listarDancasSalao(req: Request, res: Response) {
    try {
      const dancas = await dancaService.buscarDancasSalao();
      res.json(dancas);
    } catch (error) {
      console.error("Erro ao listar danças de salão:", error);
      res.status(500).json({ error: "Erro ao listar danças de salão" });
    }
  }

  async deletarDanca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await dancaService.deletarDanca(Number(id));
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar dança:", error);
      res.status(500).json({ error: "Erro ao deletar dança" });
    }
  }
}

export default new DancaController();