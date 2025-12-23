import { Request,Response } from "express";
import blocoProvaService from "../services/blocoProva.service";

class BlocoProvaController{
    async criarBlocoProva(req: Request, res: Response){
        const {nomeBloco, notaMaximaBloco, provaPraticaId} = req.body;

        if(!nomeBloco || !notaMaximaBloco || !provaPraticaId){
            return res.status(400).json({mensagem: "Nome do Bloco, Nota Máxima do Bloco e Id da Bloco de Prova são Obrigatórios"});
        }

        try{
            const blocoProva = await blocoProvaService.criarBlocoProva(nomeBloco, notaMaximaBloco,provaPraticaId);
            return res.status(201).json(blocoProva);
        }catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao criar BlocoProva:", error);
                return res.status(400).json({ mensagem: error.message });
            } else{
                console.error("Erro desconhecido:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

    async editarBlocoProva(req: Request, res: Response){
        const {idBloco, nomeBloco, notaMaximaBloco, provaPraticaId} = req.body;

        if(!idBloco || !nomeBloco || !notaMaximaBloco || !provaPraticaId){
            return res.status(400).json({mensagem: "Id do Bloco, Nome do Bloco, Nota Máxima do Bloco e Id da Prova Prática são Obrigatórios"});
        }

        try{
            const blocoProva = await blocoProvaService.editarBlocoProva(idBloco, nomeBloco, notaMaximaBloco, provaPraticaId);
            return res.status(200).json(blocoProva);
        }catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao editar BlocoProva:", error);
                return res.status(400).json({ mensagem: error.message });
            } else{
                console.error("Erro desconhecido:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

    async consultarBlocoProva(req: Request, res: Response){
        const {idBloco} = req.params;

        if(!idBloco){
            return res.status(400).json({mensagem: "Id do Bloco é Obrigatório"});
        }

        try{
            const blocoProva = await blocoProvaService.consultarBlocoProva(Number(idBloco));
            return res.status(200).json(blocoProva);
        }catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao consultar BlocoProva:", error);
                return res.status(400).json({ mensagem: error.message });
            } else{
                console.error("Erro desconhecido:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

    async consultarBlocosProva(req: Request, res: Response){
        try{
            const blocosProva = await blocoProvaService.consultarBlocosProva();
            return res.status(200).json(blocosProva);
        }catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao consultar BlocosProva:", error);
                return res.status(400).json({ mensagem: error.message });
            } else{
                console.error("Erro desconhecido:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

}

export default new BlocoProvaController();