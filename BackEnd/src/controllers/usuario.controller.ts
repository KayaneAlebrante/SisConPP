import { Request, Response } from "express";
import usuarioService from "../services/usuario.service";
import AppError from "../errors/AppError";

class UsuarioController {
    async criarUsuario(req: Request, res: Response) {
        const {
            nomeCompleto,
            cidade,
            estado,
            CTGId,
            numCarteirinha,
            login,
            senha,
            funcao,
            credenciamento,
            numCredenciamento,
            comissaoUsuarioId,
        } = req.body;

        if (!login || !senha || !funcao || !CTGId) {
            return res.status(400).json({ mensagem: "Login, senha, função e CTG são obrigatórios." });
        }

        try {
            const Usuario = await usuarioService.criarUsuarioComPessoa(
                nomeCompleto,
                cidade,
                estado,
                CTGId,
                numCarteirinha,
                login,
                senha,
                funcao,
                credenciamento,
                numCredenciamento,
                comissaoUsuarioId,
            );

            return res.status(201).json(Usuario);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao Criar Usuario: ", error);
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }


    async atualizarUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
        }

        try {
            const {
                nomeCompleto,
                cidade,
                estado,
                CTGId,
                numCarteirinha,
                login,
                senha,
                funcao,
                credenciamento,
                numCredenciamento,
                comissaoUsuarioId
            } = data;

            const userData = {
                nomeCompleto,
                cidade,
                estado,
                CTGId,
                numCarteirinha,
                login,
                senha,
                funcao,
                credenciamento,
                numCredenciamento,
                comissaoUsuarioId,
            };


            const Usuario = await usuarioService.atualizarUsuario(Number(id), userData);

            return res.status(200).json(Usuario);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarUsuarioPorId(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const Usuario = await usuarioService.buscarUsuarioPorId(Number(id));
            if (!Usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado." });
            }
            return res.status(200).json(Usuario);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarUsuarios(req: Request, res: Response) {
        try {
            const Usuarios = await usuarioService.buscarUsuarios();
            return res.status(200).json(Usuarios);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarUsuariosAvaliadores(req: Request, res: Response) {
        try {
            const avaliadores = await usuarioService.listarUsuariosAvaliadores();
            res.status(200).json(avaliadores);
        } catch (error) {
            console.error('Erro ao buscar avaliadores:', error);
            res.status(500).json({ error: 'Erro ao buscar avaliadores' });
        }
    }

    async buscarUsuariosAuxiliares(req: Request, res: Response) {
        try {
            const auxiliares = await usuarioService.listarUsuariosAuxiliares();
            return res.status(200).json(auxiliares);
        } catch (error) {
            console.error('Erro ao buscar auxiliares:', error);
            res.status(500).json({ error: 'Erro ao buscar auxiliares' });
        }
    }

    async buscarUsuariosSecretarios(req: Request, res: Response) {
        try {
            const secretarios = await usuarioService.listarUsuariosSecretarios();
            return res.status(200).json(secretarios);
        } catch (error) {
            console.error('Erro ao buscar secretarios:', error);
            res.status(500).json({ error: 'Erro ao buscar secretarios' });
        }
    }

    async deletarUsuario(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await usuarioService.deletarUsuario(Number(id));
            return res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            console.error("Erro desconhecido ao deletar usuário:", error);
            return res.status(500).json({ message: "Erro desconhecido." });
        }
    }
}

export default new UsuarioController();