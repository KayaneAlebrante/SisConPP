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

    async atualziarComissao(req: Request, res: Response) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID da comissão é obrigatório" });
        }

        try {
            const comissao = await comissaoService.atualizarComissao(Number(id), dadosAtualizados);
            return res.status(200).json(comissao);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarComissaoPorId(req: Request, res: Response) {
        const { id} = req.params;

        try {
            const comissao = await comissaoService.buscarComissaoPorId(Number(id));
            return res.status(200).json(comissao);
        } catch(error: unknown){
            if(error instanceof Error){
                console.log("Erro ao buscar concurso:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

    async buscarTodasComissoes(req: Request, res: Response) {
        try {
            const comissoes = await comissaoService.buscarTodasComissoes();
            return res.status(200).json(comissoes);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deletarComissao(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID da comissão é obrigatório" });
        }

        try {
            await comissaoService.deletarComissao(Number(id));
            return res.status(200).json({ message: "Comissão deletada com sucesso" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new ComissaoController();
