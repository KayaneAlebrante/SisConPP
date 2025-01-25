import { Request, Response } from "express";
import PessoaService from "../services/pessoa-service";

class PessoaController{
    async criarPessoa(req: Request, res: Response){
        const{nomeCompleto, cidade, estado,CTGId, numCarteirinha} = req.body;

        if(!nomeCompleto || !cidade || !estado){
            return res.status(400).json({ mensagem: "Nome completo, cidade e estado são obrigatórios." });
        }

        try{
            const pessoa = await PessoaService.prototype.criarPessoa(nomeCompleto, cidade, estado,CTGId,numCarteirinha);
            return res.status(201).json(pessoa);
        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async atualizarPessoa(req: Request, res: Response){
        const { id } = req.params;
        const data = req.body;

        if(!data || Object.keys(data).length === 0){
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
        }

        try{
            const pessoa = await PessoaService.prototype.atualizarPessoa(Number(id), data);
            return res.status(200).json(pessoa);
        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarPessoaPorId(req: Request, res: Response){
        const { id } = req.params;

        try{
            const pessoa = await PessoaService.prototype.buscarPessoaPorId(Number(id));
            if(!pessoa){
                return res.status(404).json({ mensagem: "Pessoa não encontrada." });
            }
            return res.status(200).json(pessoa);
        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarPessoas(req: Request, res: Response){
        try{
            const pessoas = await PessoaService.prototype.buscarPessoas();
            return res.status(200).json(pessoas);
        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async deletarPessoa(req: Request, res: Response){
        const { idPessoa } = req.params;

        try{
            await PessoaService.prototype.deletarPessoa(Number(idPessoa));
            return res.status(204).end();
        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }
}    

export default new PessoaController();