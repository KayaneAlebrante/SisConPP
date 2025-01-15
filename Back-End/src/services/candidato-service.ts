import { Avaliacao, PreferenciaSorteioDanca, PrismaClient, ProvaCampeiraEsportiva, SorteioDanca } from "@prisma/client";
import PessoaService from "./pessoa-service";

const prisma = new PrismaClient();

class CandidatoService extends PessoaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    async criarCandidato(
        categoriaId: number,
        pessoaData: { nomeCompleto: string; cidade: string; estado: string; numCarteirinha?: string },
        CPF: string,
        RG: string,
        endereco: string,
        numEndereco: number,
        bairro: string,
        escolaridade: string,
        filiacao: string,
        ProvaCampeiraEsportiva: ProvaCampeiraEsportiva,
        anexoDocumento: Buffer,
        anexoCarteirinha: Buffer,
        anexoEscolaridade: Buffer,
        anexoResidencia: Buffer,
        anexoAtaConcurso: Buffer,
        fichaInscricao: Buffer,
        anexoTermoCandidato: Buffer,
        anexoRelatorioVivencia: Buffer,
        anexoResponsavel: Buffer,
        anexoProvaEsportivaCampeira: Buffer,
        cTGIdCTG: number,
        concursoId: number
    ) {
        try {
            const { nomeCompleto, cidade, estado, numCarteirinha } = pessoaData;
            const pessoaId = await this.criarPessoa(nomeCompleto, cidade, estado, numCarteirinha);

            const candidato = await this.prisma.candidato.create({
                data: {
                    categoriaId,
                    pessoaId: pessoaId.idPessoa,
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
                }
            });

            return candidato;
        } catch (error) {
            throw new Error("Erro ao criar candidato. Verifique os dados fornecidos.");
        }
    }

    async atualizarCandidato(
        candidatoId: number,
        categoriaId: number,
        pessoaData: { nomeCompleto: string; cidade: string; estado: string; numCarteirinha?: string },
        CPF: string,
        RG: string,
        endereco: string,
        numEndereco: number,
        bairro: string,
        escolaridade: string,
        filiacao: string,
        ProvaCampeiraEsportiva: ProvaCampeiraEsportiva,
        anexoDocumento: Buffer,
        anexoCarteirinha: Buffer,
        anexoEscolaridade: Buffer,
        anexoResidencia: Buffer,
        anexoAtaConcurso: Buffer,
        fichaInscricao: Buffer,
        anexoTermoCandidato: Buffer,
        anexoRelatorioVivencia: Buffer,
        anexoResponsavel: Buffer,
        anexoProvaEsportivaCampeira: Buffer,
        cTGIdCTG: number,
        preferenciaSorteioDanca: PreferenciaSorteioDanca[], 
        concursoId: number,
        avaliacao: Avaliacao[], 
        sorteioDanca: SorteioDanca[]
    ) {
        try {
            const { nomeCompleto, cidade, estado, numCarteirinha } = pessoaData;
            const pessoa = await this.atualizarPessoa(candidatoId, { nomeCompleto, cidade, estado, numCarteirinha });
            const pessoaId = pessoa.idPessoa;

            const candidato = await this.prisma.candidato.update({
                where: { idCandidato: candidatoId },
                data: {
                    categoriaId,
                    pessoaId,
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
                    PreferenciaSorteioDanca: { create: preferenciaSorteioDanca },
                    concursoId
                }
            });    
        } catch (error) {
            throw new Error("Erro ao atualizar candidato. Verifique os dados fornecidos.");
        }
    }
    
    async buscarCandidatoPorId(idCandidato: number) {
        try {
            const candidato = await this.prisma.candidato.findUnique({
                where: { idCandidato: idCandidato }
            });
            return candidato;
        } catch (error) {
            throw new Error("Erro ao buscar candidato.");
        }
    }

    async buscarCandidatos() {
        try {
            const candidatos = await this.prisma.candidato.findMany();
            return candidatos;
        } catch (error) {
            throw new Error("Erro ao buscar candidatos.");
        }
    }

    async deletarCandidato(idCandidato: number) {
        try {
            await this.prisma.candidato.delete({
                where: { idCandidato: idCandidato }
            });
        } catch (error) {
            throw new Error("Erro ao deletar candidato.");
        }
    }

    async anexarAnexos(idCandidato: number, anexos: Partial<{
        anexoDocumento: Buffer,
        anexoCarteirinha: Buffer,
        anexoEscolaridade: Buffer,
        anexoResidencia: Buffer,
        anexoAtaConcurso: Buffer,
        fichaInscricao: Buffer,
        anexoTermoCandidato: Buffer,
        anexoRelatorioVivencia: Buffer,
        anexoResponsavel: Buffer,
        anexoProvaEsportivaCampeira: Buffer
    }>) {
        try {
            const candidato = await this.prisma.candidato.update({
                where: { idCandidato: idCandidato },
                data: anexos
            });
            return candidato;
        } catch (error) {
            throw new Error("Erro ao anexar anexos.");
        }        
    }

    
    async visualizarAnexos(idCandidato: number) {
        try {
            const candidato = await this.prisma.candidato.findUnique({
                where: { idCandidato: idCandidato }
            });
            if (candidato) {
                return {
                    anexoDocumento: candidato.anexoDocumento,
                    anexoCarteirinha: candidato.anexoCarteirinha,
                    anexoEscolaridade: candidato.anexoEscolaridade,
                    anexoResidencia: candidato.anexoResidencia,
                    anexoAtaConcurso: candidato.anexoAtaConcurso,
                    fichaInscricao: candidato.fichaInscricao,
                    anexoTermoCandidato: candidato.anexoTermoCandidato,
                    anexoRelatorioVivencia: candidato.anexoRelatorioVivencia,
                    anexoResponsavel: candidato.anexoResponsavel,
                    anexoProvaEsportivaCampeira: candidato.anexoProvaEsportivaCampeira
                };
            } else {
                throw new Error("Candidato não encontrado.");
            }
        } catch (error) {
            throw new Error("Erro ao visualizar anexos.");
        }
    }

    async editarAnexos(idCandidato: number, anexos: Partial<{
        anexoDocumento: Buffer,
        anexoCarteirinha: Buffer,
        anexoEscolaridade: Buffer,
        anexoResidencia: Buffer,
        anexoAtaConcurso: Buffer,
        fichaInscricao: Buffer,
        anexoTermoCandidato: Buffer,
        anexoRelatorioVivencia: Buffer,
        anexoResponsavel: Buffer,
        anexoProvaEsportivaCampeira: Buffer
    }>) {
        try {
            const candidato = await this.prisma.candidato.update({
                where: { idCandidato: idCandidato },
                data: anexos
            });
            return candidato;
        } catch (error) {
            throw new Error("Erro ao editar anexos.");
        }
    }
}

const candidatoService = new CandidatoService(prisma);
export default candidatoService;