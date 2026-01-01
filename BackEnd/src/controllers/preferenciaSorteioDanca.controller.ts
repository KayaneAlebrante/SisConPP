import { Request, Response } from "express";
import PreferenciaSorteioDanca from "../services/preferenciaSorteioDanca.service";

class PreferenciaSorteioDancaController {
  async criarPreferencias(req: Request, res: Response) {
    const { nomeSorteioDanca, candidatoId, dancas } = req.body;

    try {
      const preferencias = await PreferenciaSorteioDanca.selecionarPreferenciaSorteioDanca(
        nomeSorteioDanca,
        Number(candidatoId),
        dancas
      );
      return res.status(201).json(preferencias);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async visualizarPreferencias(req: Request, res: Response) {
    const { candidatoId } = req.params;

    try {
      const preferencias = await PreferenciaSorteioDanca.visualizarPreferencias(
        Number(candidatoId)
      );
      return res.status(200).json(preferencias);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async atualizarSorteioDancaId(req: Request, res: Response) {
    const { candidatoId, sorteioDancaId, nomeSorteioDanca } = req.body;

    try {
      const preferenciaAtualizada = await PreferenciaSorteioDanca.atualizarSorteioDancaId(
        Number(candidatoId),
        Number(sorteioDancaId),
        nomeSorteioDanca
      );
      return res.status(200).json(preferenciaAtualizada);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
}

export default new PreferenciaSorteioDancaController();