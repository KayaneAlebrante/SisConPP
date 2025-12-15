import { Request, Response } from "express";
import candidatoService from "../services/candidato.service";

class CandidatoController {
    async criarCandidato(req: Request, res: Response) {
        const {
            nomeCompleto,
            cidade,
            estado,
            CTGId,
            numCarteirinha,
            categoriaId,
            CPF,
            RG,
            endereco,
            numEndereco,
            bairro,
            escolaridade,
            filiacaoPai,
            filiacaoMae,
            ProvaCampeiraEsportiva,
            anexoFoto,
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
        } = req.body;

        if(!categoriaId || !CPF || !RG || !endereco || !numEndereco || !bairro || !escolaridade || !filiacaoPai || !filiacaoMae || !ProvaCampeiraEsportiva){
            return res.status(400).json({mensagem: "CategoriaId, CPF, RG, endereco, numEndereco, bairro, escolaridade, filiacao, ProvaCampeiraEsportica, concursoId são Obrigatórios"});
        }

        try {
            const Candidato = await candidatoService.criarCandidato(
                nomeCompleto, 
                cidade, 
                estado,
                CTGId,
                numCarteirinha,
                categoriaId,
                CPF,
                RG,
                endereco,
                numEndereco,
                bairro,
                escolaridade,
                filiacaoPai,
                filiacaoMae,
                ProvaCampeiraEsportiva,
                anexoFoto,
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
            );
            return res.status(201).json(Candidato);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao criar candidato:", error);
                return res.status(400).json({ mensagem: error.message });
            } else{
                console.error("Erro desconhecido:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

    async atualizarCandidato(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        if(!data || Object.keys(data).length === 0){
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
        }

        try{
            const { 
                nomeCompleto, 
                cidade, 
                estado,
                CTGId,
                numCarteirinha,
                categoriaId,
                CPF,
                RG,
                endereco,
                numEndereco,
                bairro,
                escolaridade,
                filiacaoPai,
                filiacaoMae,
                ProvaCampeiraEsportiva,
                concursoId} = data;

            const candidatoData = { nomeCompleto, cidade, estado, CTGId, numCarteirinha, categoriaId,CPF,RG,
                endereco,numEndereco,bairro,escolaridade,filiacaoPai, filiacaoMae, ProvaCampeiraEsportiva,concursoId};

            const Candidato = await candidatoService.atualizarCandidato(Number(id), candidatoData);          
            return res.status(200).json(Candidato);

        } catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
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
        const { id} = req.params;

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
            anexoFoto,
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
                anexoFoto,
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
            anexoFoto,
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
                anexoFoto,
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