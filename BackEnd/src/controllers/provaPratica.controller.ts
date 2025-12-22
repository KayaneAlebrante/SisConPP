import { Request, Response } from "express";
import provaPraticaService from "../services/provaPratica.service";

class ProvaPraticaController {
    async criarProvaPratica(req: Request, res: Response) {
        const { nomeProva, notaMaxima, categorias, blocosProvas } = req.body;

        if (!nomeProva || !notaMaxima || !categorias || !blocosProvas) {
            return res.status(400).json({ mensagem: "Nome, notaMaxima, Categorias e blocosProvas da prova prática é obrigatório." });
        }

        try {
            const provaPratica = await provaPraticaService.criarProvaPratica(nomeProva, notaMaxima, categorias, blocosProvas);
            return res.status(201).json(provaPratica);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarProvaPraticaPorId(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const provaPratica = await provaPraticaService.buscarProvaPraticaPorId(Number(id));
            if (!provaPratica) {
                return res.status(404).json({ mensagem: "Prova prática não encontrada." });
            }
            return res.status(200).json(provaPratica);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarProvasPraticas(req: Request, res: Response) {
        try {
            const provasPraticas = await provaPraticaService.buscarProvasPraticas();
            return res.status(200).json(provasPraticas);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarPorCategoria(req: Request, res: Response) {
        const { categoriaId } = req.query;

        if (!categoriaId) {
            return res.status(400).json({ error: "Categoria obrigatória" });
        }

        const provas = await provaPraticaService.buscarProvaPraticaPorCategoria(
            Number(categoriaId)
        );

        return res.json(provas);
    }


    async atualizarProvaPratica(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
        }

        try {
            const { categorias, blocosProvas, provaData } = data;
            const provaPratica = await provaPraticaService.atualizarProvaPratica(Number(id), categorias, blocosProvas, provaData);
            return res.status(200).json(provaPratica);


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

export default new ProvaPraticaController();