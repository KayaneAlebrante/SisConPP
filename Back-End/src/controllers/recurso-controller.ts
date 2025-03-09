import { Request, Response } from "express";
import RecursoService from "../services/recurso-service";

class RecursoController{
    async solicitarRecurso(req: Request, res: Response) {
        const { nomeRecurso, justificativa, arquivo, candidato, avaliador, quesitoRecurso, provaTeoricaIdprovaTeorica, provaPraticaIdProvaPratica } = req.body;

        if (!nomeRecurso || !justificativa || !arquivo || !candidato || !avaliador || !quesitoRecurso) {
            return res.status(400).json({ mensagem: "Nome do recurso, justificativa, arquivo, candidato, avaliador e quesito do recurso são obrigatórios." });
        }

        try {
            const recurso = await RecursoService.solicitarRecurso(nomeRecurso, justificativa, arquivo, candidato, avaliador, quesitoRecurso, provaTeoricaIdprovaTeorica, provaPraticaIdProvaPratica);
            return res.status(201).json(recurso);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async listarRecursos(req: Request, res: Response) {
        try {
            const recursos = await RecursoService.listarRecursos();
            return res.status(200).json(recursos);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }   


    async visualizarRecursoPorId(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const recurso = await RecursoService.visualizarRecursoPorId(Number(id));
            if (!recurso) {
                return res.status(404).json({ mensagem: "Recurso não encontrado." });
            }
            return res.status(200).json(recurso);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async alterarStatusRecurso(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;

        if (status === undefined) {
            return res.status(400).json({ mensagem: "Status é obrigatório." });
        }

        try {
            const recurso = await RecursoService.alterarStatusRecurso(Number(id), status);
            return res.status(200).json(recurso);
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

export default new RecursoController();
