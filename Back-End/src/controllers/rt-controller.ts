import { Request, Response } from "express";
import RTService from "../services/rt-service";

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

    // Função para atualizar RT
    async atualizarRT(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        // Validação simples de dados
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
            return res.status(200).json({ mensagem: "RT deletado com sucesso." });
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

export default new RTController();