import { Request, Response } from "express";
import sorteioDancaService from "../services/sorteioDanca-service";

class SorteioDancaController {
    async realizarSorteio(req: Request, res: Response) {
        const { candidatoId, usuarioId, tipoDanca } = req.body;

        if (!candidatoId || !usuarioId || !tipoDanca) {
            return res.status(400).json({ error: "Os campos candidatoId e usuarioId são obrigatórios." });
        }

        try {
            const resultado = await sorteioDancaService.realizarSorteio(candidatoId, usuarioId, tipoDanca);
            return res.status(200).json(resultado);
        } catch (error: any) {
            console.error("Erro ao realizar sorteio de dança:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new SorteioDancaController();