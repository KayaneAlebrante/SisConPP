import { Request, Response } from "express";
import CTGService from "../services/ctg.service";

class CTGController {
    async criarCTG(req: Request, res: Response) {
        const { nomeCTG, RTid } = req.body;

        if (!nomeCTG || !RTid) {
            return res.status(400).json({ mensagem: "Nome CTG e número CTG são obrigatórios." });
        }

        try {
            const ctg = await CTGService.criarCTG(nomeCTG, RTid);
            return res.status(201).json(ctg);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async atualizarCTG(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;


        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
        }

        try {
            const ctg = await CTGService.atualizarCTG(Number(id), data);
            return res.status(200).json(ctg);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error); 
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarCTGPorId(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const ctg = await CTGService.buscarCTGPorId(Number(id));
            if (!ctg) {
                return res.status(404).json({ mensagem: "CTG não encontrado." });
            }
            return res.status(200).json(ctg);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error); 
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarCTGs(req: Request, res: Response) {
        try {
            const ctgs = await CTGService.buscarCTGs();
            return res.status(200).json(ctgs);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error); 
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async deletarCTG(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await CTGService.deletarCTG(Number(id));
            return res.status(200).json({ mensagem: "CTG deletado com sucesso." });
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

export default new CTGController();
