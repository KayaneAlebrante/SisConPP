import { Request, Response } from "express";
import categoriaService from "../services/categoria-service";

class CategoriaController{
    async criarCategoria(req: Request, res: Response){
        const{
            nomeCategoria, 
            escolaridade,
            sorteioDanca,
            idadeInicial, 
            idadeLimite,
            provaTeoricaId,
            provaPraticaId,
        } = req.body;

        if(!nomeCategoria || !escolaridade || !sorteioDanca || ! idadeInicial){
            return res.status(400).json({mensagem: "NomeCategoria, Escolaridade, SorteioDanca, IdadeInicial, ProvaTeoricaId, ProvaPraticaId são Obrigatórios."});
        }

        try{
            const categoria = await categoriaService.criarCategoria(
                nomeCategoria, 
                escolaridade, 
                sorteioDanca, 
                idadeInicial,
                idadeLimite,
                provaTeoricaId, 
                provaPraticaId
            );

            return res.status(201).json(categoria);
        }catch(error: unknown){
            if(error instanceof Error){
                console.error("Erro ao criar categoria", error);
                return res.status(400).json({mensagem: error.message});
            }else{
                console.error("Erro desconhecido:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

    async atualizarCategoria(req: Request, res: Response){
        const { id } = req.params;
        const data = req.body;

        if(!data || Object.keys(data).length === 0){
            return res.status(400).json({mensagem: "Dadis para atualziação são obrigatóeios."});
        }

        try{
            const categoria = await categoriaService.atualizarCategoria(Number(id), data);
            return res.status(200).json(categoria);
        }catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({mensagem: error.message});
            }else{
                console.error("Erro desconhecido:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

    async buscarCategorias(req: Request, res: Response){
        try{
            const categorias = await categoriaService.listarCategorias();
            return res.status(200).json(categorias);
        }catch(error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error); 
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async deletarCategoria(req: Request, res: Response){
        const { id } = req.params;

        try{
            await categoriaService.deletarCategoria(Number(id));
            return res.status(200).json({mensagem: "Categoria deleada com sucesso."});
        }catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error); 
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }    
    }
}

export default new CategoriaController();