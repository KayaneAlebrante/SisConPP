import { Request, Response } from "express";
import usuarioService from "../services/usuario-service";

class UsuarioController{
    async criarUsuario(req: Request, res: Response){
        const { nomeCompleto, cidade, estado, numCarteirinha, login, senha, funcao, numCredenciamento, cTGIdCTG } = req.body;

        if(!login || !senha || !funcao || !cTGIdCTG){
            return res.status(400).json({ mensagem: "Login, senha, função e CTG são obrigatórios." });
        }

        try{
            const Usuario = await usuarioService.criarUsuario(nomeCompleto, cidade, estado, numCarteirinha, login, senha, funcao, numCredenciamento, cTGIdCTG);
            return res.status(201).json(Usuario);
        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async atualizarUsuario(req: Request, res: Response){
        /*const { id } = req.params;
        const data = req.body;

        if(!data || Object.keys(data).length === 0){
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
        }

        try{
            const Usuario = await usuarioService.atualizarUsuario(Number(id), data);          
            return res.status(200).json(Usuario);
        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }*/
    }

    async buscarUsuarioPorId(req: Request, res: Response){
        const { id } = req.params;

        try{
            const Usuario = await usuarioService.buscarUsuarioPorId(Number(id));
            if(!Usuario){
                return res.status(404).json({ mensagem: "Usuário não encontrado." });
            }
            return res.status(200).json(Usuario);
        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarUsuarios(req: Request, res: Response){
        try{
            const Usuarios = await usuarioService.buscarUsuarios();
            return res.status(200).json(Usuarios);
        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async deletarUsuario(req: Request, res: Response){
        const { id } = req.params;

        try{
            await usuarioService.deletarUsuario(Number(id));
            return res.status(204).send();
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

export default new UsuarioController();