import { Request, Response } from "express";
import candidatoService from "../services/candidato-service";

class CandidatoController {
    async criarCandidato(req: Request, res: Response) {
        const {
            categoriaId,
            nomeCompleto,
            cidade,
            estado,
            numCarteirinha,
            CPF,
            RG,
            endereco,
            numEndereco,
            bairro,
            escolaridade,
            filiacao,
            ProvaCampeiraEsportiva,
            anexoDocumento,
            anexoCarteirinha,
            anexoEscolaridade,
            anexoResidencia,
            anexoAtaConcurso,
            fichaInscricao,
            anexoTermoCandidato,
            anexoRelatorioVivencia,
            anexoResponsavel,
            anexoProvaEsportivaCampeira,
            cTGIdCTG,
            concursoId
        } = req.body;

        try {
            const pessoaData = { nomeCompleto, cidade, estado, numCarteirinha };
            const candidato = await candidatoService.criarCandidato(
                categoriaId,
                pessoaData,
                CPF,
                RG,
                endereco,
                numEndereco,
                bairro,
                escolaridade,
                filiacao,
                ProvaCampeiraEsportiva,
                anexoDocumento,
                anexoCarteirinha,
                anexoEscolaridade,
                anexoResidencia,
                anexoAtaConcurso,
                fichaInscricao,
                anexoTermoCandidato,
                anexoRelatorioVivencia,
                anexoResponsavel,
                anexoProvaEsportivaCampeira,
                cTGIdCTG,
                concursoId
            );
            return res.status(201).json(candidato);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao criar candidato:", error);
                return res.status(400).json({ mensagem: error.message });
            }
            return res.status(400).json({ mensagem: "Erro desconhecido." });
        }
    }

    async atualizarCandidato(req: Request, res: Response) {
        const { id } = req.params;
        const {
            categoriaId,
            nomeCompleto,
            cidade,
            estado,
            numCarteirinha,
            CPF,
            RG,
            endereco,
            numEndereco,
            bairro,
            escolaridade,
            filiacao,
            ProvaCampeiraEsportiva,
            anexoDocumento,
            anexoCarteirinha,
            anexoEscolaridade,
            anexoResidencia,
            anexoAtaConcurso,
            fichaInscricao,
            anexoTermoCandidato,
            anexoRelatorioVivencia,
            anexoResponsavel,
            anexoProvaEsportivaCampeira,
            cTGIdCTG,
            concursoId
        } = req.body;

        try {
            const pessoaData = { nomeCompleto, cidade, estado, numCarteirinha };
            const candidato = await candidatoService.atualizarCandidato(
                Number(id),
                categoriaId,
                pessoaData,
                CPF,
                RG,
                endereco,
                numEndereco,
                bairro,
                escolaridade,
                filiacao,
                ProvaCampeiraEsportiva,
                anexoDocumento,
                anexoCarteirinha,
                anexoEscolaridade,
                anexoResidencia,
                anexoAtaConcurso,
                fichaInscricao,
                anexoTermoCandidato,
                anexoRelatorioVivencia,
                anexoResponsavel,
                anexoProvaEsportivaCampeira,
                cTGIdCTG,
                [], // preferenciaSorteioDanca
                concursoId,
                [], // avaliacao
                []  // sorteioDanca
            );
            return res.status(200).json(candidato);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao atualizar candidato:", error);
                return res.status(400).json({ mensagem: error.message });
            }
            return res.status(400).json({ mensagem: "Erro desconhecido." });
        }
    }

    async buscarCandidatoPorId(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const candidato = await candidatoService.buscarCandidatoPorId(Number(id));
            return res.status(200).json(candidato);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao buscar candidato por ID:", error);
                return res.status(400).json({ mensagem: error.message });
            }
            return res.status(400).json({ mensagem: "Erro desconhecido." });
        }
    }

    async buscarCandidatos(req: Request, res: Response) {
        try {
            const candidatos = await candidatoService.buscarCandidatos();
            return res.status(200).json(candidatos);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao buscar candidatos:", error);
                return res.status(400).json({ mensagem: error.message });
            }
            return res.status(400).json({ mensagem: "Erro desconhecido." });
        }
    }

    async deletarCandidato(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await candidatoService.deletarCandidato(Number(id));
            return res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao deletar candidato:", error);
                return res.status(400).json({ mensagem: error.message });
            }
            return res.status(400).json({ mensagem: "Erro desconhecido." });
        }
    }

    async anexarAnexos(req: Request, res: Response) {
        const { id } = req.params;
        const {
            anexoDocumento,
            anexoCarteirinha,
            anexoEscolaridade,
            anexoResidencia,
            anexoAtaConcurso,
            fichaInscricao,
            anexoTermoCandidato,
            anexoRelatorioVivencia,
            anexoResponsavel,
            anexoProvaEsportivaCampeira
        } = req.body;

        try {
            const anexos = {
                anexoDocumento,
                anexoCarteirinha,
                anexoEscolaridade,
                anexoResidencia,
                anexoAtaConcurso,
                fichaInscricao,
                anexoTermoCandidato,
                anexoRelatorioVivencia,
                anexoResponsavel,
                anexoProvaEsportivaCampeira
            };
            const candidato = await candidatoService.anexarAnexos(Number(id), anexos);
            return res.status(200).json(candidato);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao anexar anexos:", error);
                return res.status(400).json({ mensagem: error.message });
            }
            return res.status(400).json({ mensagem: "Erro desconhecido." });
        }
    }

    async visualizarAnexos(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const anexos = await candidatoService.visualizarAnexos(Number(id));
            return res.status(200).json(anexos);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao visualizar anexos:", error);
                return res.status(400).json({ mensagem: error.message });
            }
            return res.status(400).json({ mensagem: "Erro desconhecido." });
        }
    }

    async editarAnexos(req: Request, res: Response) {
        const { id } = req.params;
        const {
            anexoDocumento,
            anexoCarteirinha,
            anexoEscolaridade,
            anexoResidencia,
            anexoAtaConcurso,
            fichaInscricao,
            anexoTermoCandidato,
            anexoRelatorioVivencia,
            anexoResponsavel,
            anexoProvaEsportivaCampeira
        } = req.body;

        try {
            const anexos = {
                anexoDocumento,
                anexoCarteirinha,
                anexoEscolaridade,
                anexoResidencia,
                anexoAtaConcurso,
                fichaInscricao,
                anexoTermoCandidato,
                anexoRelatorioVivencia,
                anexoResponsavel,
                anexoProvaEsportivaCampeira
            };
            const candidato = await candidatoService.editarAnexos(Number(id), anexos);
            return res.status(200).json(candidato);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao editar anexos:", error);
                return res.status(400).json({ mensagem: error.message });
            }
            return res.status(400).json({ mensagem: "Erro desconhecido." });
        }
    }
}

export default new CandidatoController();