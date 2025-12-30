import { Request, Response } from "express";
import AvaliacaoService from "../services/avaliacao.service";

class AvaliacaoController {
    async criarAvaliacaoCompleta(req: Request, res: Response) {
        try {
            const {
                comissaoId,
                avaliadorId,
                candidatoId,
                blocoProvaId,
                quesitos,
            } = req.body

            if (
                !comissaoId ||
                !avaliadorId ||
                !candidatoId ||
                !blocoProvaId ||
                !Array.isArray(quesitos)
            ) {
                return res.status(400).json({
                    message: "Dados obrigatórios não informados",
                })
            }

            const avaliacao = await AvaliacaoService.criarAvaliacaoCompleta({
                comissaoId,
                avaliadorId,
                candidatoId,
                blocoProvaId,
                quesitos,
            })

            return res.status(201).json(avaliacao)

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Erro ao criar avaliação",
                error: error instanceof Error ? error.message : error,
            })
        }
    }

    async editarAvaliacao(req: Request, res: Response) {
        const { idAvalicao, candidatoId, avaliadorId } = req.body;

        if (!idAvalicao || !avaliadorId || !candidatoId) {
            return res.status(400).json({ mensagem: "Id da Avaliação e Id do Avaliador e Id Candidato são obrigatórios." });
        }

        try {
            const avaliacao = await AvaliacaoService.editarAvaliacao(idAvalicao, candidatoId, avaliadorId);
            return res.status(200).json(avaliacao);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao editar avaliação:", error);
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(500).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async visualizarAvaliacoes(req: Request, res: Response) {
        const { candidatoId } = req.params;

        if (!candidatoId) {
            return res.status(400).json({ mensagem: "Id do Candidato é obrigatório." });
        }

        try {
            const avaliacoes = await AvaliacaoService.visualizarAvaliacoes(Number(candidatoId));
            return res.status(200).json(avaliacoes);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao visualizar avaliações:", error);
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(500).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarEstruturaCompleta(req: Request, res: Response) {
        const { avaliadorId, candidatoId } = req.params;

        try {
            const estrutura = await AvaliacaoService.buscarEstruturaCompleta(
                Number(avaliadorId),
                Number(candidatoId)
            );

            return res.status(200).json(estrutura);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao buscar provas:", error);
                return res.status(400).json({ mensagem: error.message });
            }
            return res.status(500).json({ mensagem: "Erro desconhecido." });
        }
    }

    async criarAvaliacaoTeorica(req: Request, res: Response) {
        try {
            const { candidatoId, provaTeoricaId, quesitos, ficha } = req.body;

            if (!candidatoId || !provaTeoricaId || !Array.isArray(quesitos) || !ficha) {
                return res.status(400).json({ message: "Dados obrigatórios não informados" });
            }
            
            const avaliacaoTeorica = await AvaliacaoService.criarAvaliacaoTeorica({
                candidatoId,
                provaTeoricaId,
                quesitos,
                ficha,
            });

            return res.status(201).json(avaliacaoTeorica);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

}

export default new AvaliacaoController();