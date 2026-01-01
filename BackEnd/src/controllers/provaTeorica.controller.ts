import { Request, Response } from "express";
import provaTeoricaService from "../services/provaTeorica.service";

class ProvaTeoricaController{
    async criarProvaTeorica(req: Request, res: Response) {
        const { nomeProva, notaMaxima, categorias, gabaritoOficial, numQuestao } = req.body;

        if (!nomeProva || !notaMaxima || !categorias || !numQuestao) {   
            return res.status(400).json({ mensagem: "Nome, notaMaxima, Categorias, gabaritoOficial e numQuestao da prova teórica é obrigatório." });
        }
        try {
            const provaTeorica = await provaTeoricaService.criarProvaTeorica(nomeProva, notaMaxima, categorias, gabaritoOficial, numQuestao);
            return res.status(201).json(provaTeorica);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarProvaTeoricaPorId(req: Request, res: Response) {
        const { id} = req.params;

        try {
            const provaTeorica = await provaTeoricaService.buscarProvaTeoricaPorId(Number(id));
            if (!provaTeorica) {
                return res.status(404).json({ mensagem: "Prova teórica não encontrada." });
            }
            return res.status(200).json(provaTeorica);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarProvasTeoricas(req: Request, res: Response) {
        try {
            const provasTeoricas = await provaTeoricaService.buscarProvasTeoricas();
            return res.status(200).json(provasTeoricas);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarProvasTeoricasPorCategoria(req: Request, res: Response){
        const {idCategoria} = req.params;

        if(!idCategoria){
            return res.status(400).json({error: "Categoria obrigatória"});
        }

        const provas = await provaTeoricaService.buscarProvaTeoricaPorCategoria(
            Number(idCategoria)
        );

        return res.json(provas);
    }

    async atualizarProvaTeorica(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        try {
            const { gabaritoOficinal, numQuestao, ...provaData } = data;
            const provaTeorica = await provaTeoricaService.atualizarProvaTeorica(Number(id), gabaritoOficinal, numQuestao, provaData);
            return res.status(200).json(provaTeorica);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }
}

export default new ProvaTeoricaController();