import { Request, Response } from "express";
import relatoriosService  from "../services/relatorios.service";

class RelatoriosController {

    async relatorioGeralPorConcurso(req: Request, res: Response) {
        const { concursoId } = req.params;

        if (!concursoId) {
            return res.status(400).json({
                mensagem: "Id do Concurso é obrigatório"
            });
        }

        try {
            const relatorio =
                await relatoriosService.relatorioGeralPorConcurso(
                    Number(concursoId)
                );

            return res.status(200).json(relatorio);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao gerar relatório geral:", error);
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({
                    mensagem: "Erro desconhecido."
                });
            }
        }
    }

    async rankingPorCategoria(req: Request, res: Response) {
        const { concursoId, categoriaId } = req.params;

        if (!concursoId || !categoriaId) {
            return res.status(400).json({
                mensagem: "Id do Concurso e Id da Categoria são obrigatórios"
            });
        }

        try {
            const ranking =
                await relatoriosService.rankingPorCategoria(
                    Number(concursoId),
                    Number(categoriaId)
                );

            return res.status(200).json(ranking);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao gerar ranking por categoria:", error);
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({
                    mensagem: "Erro desconhecido."
                });
            }
        }
    }
}

export default new RelatoriosController();
