import { Request, Response } from "express";
import subQuesitosService from "../services/subquesito.service";


class SubquesitoController{
    async criarsubQuesitos( req: Request, res: Response){
        const { nomeSubquesito, notaSubequesito, quesitoId } = req.body;

        if (!nomeSubquesito || !notaSubequesito || !quesitoId){
            return res.status(400).json({ mensagem: "Nome do Subquesito, Nota do Subquesito e ID do Quesito são obrigatórios."});
        }
        try{
            const subquesito = await subQuesitosService.criarsubQuesitos(
                nomeSubquesito,
                notaSubequesito,
                quesitoId
            );
            res.json(subquesito);
        }catch (error) {
            console.error("Erro ao criar Subquesito", error);
            return res.status(400).json({ mensagem: "Erro ao criar o Subquesito. Verifique os dados fornecidos." });
        }
    }

    async atualizarsubQuesitos( req: Request, res: Response){
        const { id } = req.params;
        const data = req.body;

        if (!data || Object.keys(data).length === 0){
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios."});
        }
        try{
            const subquesito = await subQuesitosService.atualizarsubQuesitos(Number(id), data);
            return res.status(200).json(subquesito);
        }catch (error){
            console.error("Erro ao atualizar Subquesito", error);
            return res.status(400).json({ mensagem: "Erro ao atualizar o Subquesito. Verifique os dados fornecidos." });
        }
    }

    async buscarSubQuesitoPorId( req: Request, res: Response){
        const { id } = req.params;

        try{
            const subquesito = await subQuesitosService.buscarSubQuesitoPorId(Number(id));
            if (!subquesito){
                return res.status(404).json({ mensagem: "Subquesito não encontrado." });
            }
            return res.json(subquesito);
        }catch (error){
            console.error("Erro ao buscar Subquesito", error);
            return res.status(400).json({ mensagem: "Erro ao buscar o Subquesito. Verifique os dados fornecidos." });
        }
    }

    async buscarSubQuesitos( req: Request, res: Response){
        try{
            const subquesitos = await subQuesitosService.buscarSubQuesitos();
            return res.json(subquesitos);
        }catch (error){
            console.error("Erro ao buscar Subquesitos", error);
            return res.status(400).json({ mensagem: "Erro ao buscar os Subquesitos. Verifique os dados fornecidos." });
        }
    }

    async deletarSubQuesito( req: Request, res: Response){
        const { id } = req.params;

        try{
            await subQuesitosService.deletarSubQuesito(Number(id));
            return res.json({ mensagem: "Subquesito deletado com sucesso." });
        }catch (error){
            console.error("Erro ao deletar Subquesito", error);
            return res.status(400).json({ mensagem: "Erro ao deletar o Subquesito. Verifique os dados fornecidos." });
        }
    }
}

export default new SubquesitoController();