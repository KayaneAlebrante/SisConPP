import { Request, Response } from "express";
import PreferenciaSorteioDanca from "../services/preferenciaSorteioDanca-service";

class PreferenciaSorteioDancaController {
    async criarPreferencias(req: Request, res: Response) {
          const { nomeSorteioDanca, candidatoId, quesitos } = req.body;
    
        try {
          const preferencias = await PreferenciaSorteioDanca.selecionarPreferenciaSorteioDanca(
            nomeSorteioDanca,
            Number(candidatoId),
            quesitos
          );
          return res.status(201).json(preferencias);
        } catch (error: any) {
          return res.status(400).json({ erro: error.message });
        }
      }
    
      // Visualiza preferências existentes
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

}

export default new PreferenciaSorteioDancaController();