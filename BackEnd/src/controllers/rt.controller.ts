import { Request, Response } from "express";
import RTService from "../services/rt.service";
import AppError from "../errors/AppError";

class RTController {
    async criarRT(req: Request, res: Response) {
        const { nomeRT, numeroRT } = req.body;


        if (!nomeRT || !numeroRT) {
            return res.status(400).json({ mensagem: "Nome RT e número RT são obrigatórios." });
        }

        try {
            const rt = await RTService.criarRT(nomeRT, numeroRT);
            return res.status(201).json(rt);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async atualizarRT(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
        }

        try {
            const rt = await RTService.atualizarRT(Number(id), data);
            return res.status(200).json(rt);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarRTPorId(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const rt = await RTService.buscarRTPorId(Number(id));
            if (!rt) {
                return res.status(404).json({ mensagem: "RT não encontrado." });
            }
            return res.status(200).json(rt);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarRTs(req: Request, res: Response) {
        try {
            const rts = await RTService.buscarRTs();
            return res.status(200).json(rts);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async deletarRT(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await RTService.deletarRT(Number(id));
            return res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            console.error("Erro desconhecido ao deletar RT:", error);
            return res.status(500).json({ message: "Erro desconhecido." });
        }
    }
}

export default new RTController();