import { Request, Response } from "express";
import comissaoUsuarioService from "../services/comissaoUsuario-service";
import comissaoService from "../services/comissao-service";

class ComissaoController {
    async criarComissao(req: Request, res: Response) {
        const { nomeComissao, concursoId, avaliacoes, usuarios } = req.body;

        if (!nomeComissao || !concursoId) {
            return res.status(400).json({ error: "Nome da comissão e ID do concurso são obrigatórios" });
        }

        try {
            const comissao = await comissaoService.criarComissao(
                nomeComissao,
                concursoId,
                avaliacoes || [],
                usuarios || []
            );
            return res.status(201).json(comissao);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async adicionarUsuarioComissao(req: Request, res: Response) {
        const { usuarioId, comissaoId } = req.body;

        if (!usuarioId || !comissaoId) {
            return res.status(400).json({ error: "Usuário e Comissão são obrigatórios" });
        }

        try {
            const comissaoUsuario = await comissaoUsuarioService.adicionarUsuarioComissao(usuarioId, comissaoId);
            return res.status(201).json(comissaoUsuario);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async adicionarAuxiliarComissao(req: Request, res: Response) {
        const { usuarioId, comissaoId } = req.body;

        if (!usuarioId || !comissaoId) {
            return res.status(400).json({ error: "Usuário e Comissão são obrigatórios" });
        }

        try {
            const comissaoUsuario = await comissaoUsuarioService.adicionarAuxiliarComissao(usuarioId, comissaoId);
            return res.status(201).json(comissaoUsuario);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deletarUsuarioComissao(req: Request, res: Response) {
        const { usuarioId, comissaoId } = req.params;

        if (!usuarioId || !comissaoId) {
            return res.status(400).json({ error: "Usuário e Comissão são obrigatórios" });
        }

        try {
            await comissaoUsuarioService.deletarUsuarioComissao(Number(usuarioId), Number(comissaoId));
            return res.status(200).json({ message: "Usuário removido da comissão com sucesso" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async listarUsuariosComissao(req: Request, res: Response) {
        try {
            const usuarios = await comissaoUsuarioService.listComissaoUsuarios();
            return res.status(200).json(usuarios);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new ComissaoController();
