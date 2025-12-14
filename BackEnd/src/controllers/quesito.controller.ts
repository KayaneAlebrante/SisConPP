import { Request, Response } from "express";
import quesitoService from "../services/quesito.service";

class QuesitoController {
    async criarQuesito(req: Request, res: Response) {
        const {
            nomeQuesito,
            notaMaximaQuesito,
            danca,
            dancaSalaoTradicional,
            blocoProvaIdBloco,
            provaTeoricaIdProvaTeorica
        } = req.body;

        if (!nomeQuesito || !notaMaximaQuesito || danca === undefined || dancaSalaoTradicional === undefined) {
            return res.status(400).json({ mensagem: "Nome do Quesito, Nota Máxima do Quesito, Dança e Dança Salão Tradicional são obrigatórios." });
        }

        try {
            const quesito = await quesitoService.criarQuesitos(
                nomeQuesito,
                notaMaximaQuesito,
                danca,
                dancaSalaoTradicional,
                blocoProvaIdBloco,
                provaTeoricaIdProvaTeorica
            );

            return res.status(201).json(quesito);
        } catch (error) {
            console.error("Erro ao criar Quesito", error);
            return res.status(400).json({ mensagem: "Erro ao criar o Quesito. Verifique os dados fornecidos." });
        }
    }

    async atualizarQuesito(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
        }

        try {
            const quesito = await quesitoService.atualizarQuesitos(Number(id), data);
            return res.status(200).json(quesito);
        } catch (error) {
            console.error("Erro ao atualizar Quesito", error);
            return res.status(400).json({ mensagem: "Erro ao atualizar o Quesito. Verifique os dados fornecidos." });
        }
    }

    async buscarQuesitoPorId(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const quesito = await quesitoService.buscarQuesitoPorId(Number(id));
            if (!quesito) {
                return res.status(404).json({ mensagem: "Quesito não encontrado." });
            }
            return res.status(200).json(quesito);
        } catch (error) {
            console.error("Erro ao buscar Quesito", error);
            return res.status(400).json({ mensagem: "Erro ao buscar o Quesito." });
        }
    }

    async buscarQuesitos(req: Request, res: Response) {
        try {
            const quesitos = await quesitoService.buscarQuesitos();
            return res.status(200).json(quesitos);
        } catch (error) {
            console.error("Erro ao buscar Quesitos", error);
            return res.status(400).json({ mensagem: "Erro ao buscar os Quesitos." });
        }
    }

    async buscarDancasTradicionais(req: Request, res: Response) {
        try {
            const dancas = await quesitoService.buscarDancasTradicionais();
            return res.status(200).json(dancas);
        } catch (error) {
            console.error("Erro ao buscar danças", error);
            return res.status(400).json({ mensagem: "Erro ao buscar Danças." });
        }
    }

    async buscarDancasSalao(req: Request, res: Response) {
        try {
            const dancas = await quesitoService.buscarDancasSalao();
            return res.status(200).json(dancas);
        } catch (error) {
            console.error("Erro ao buscar danças", error);
            return res.status(400).json({ mensagem: "Erro ao buscar Danças." });
        }
    }

    async deletarQuesito(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await quesitoService.deletarQuesito(Number(id));
            return res.status(200).json({ mensagem: "Quesito deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar Quesito", error);
            return res.status(400).json({ mensagem: "Erro ao deletar o Quesito." });
        }
    }
}

export default new QuesitoController();