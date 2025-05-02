import { PrismaClient, ProvaCampeiraEsportiva } from "@prisma/client";

const prisma = new PrismaClient();

class CandidatoService{
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) { 
        this.prisma = prisma;
    }

    async criarCandidato(
        nomeCompleto: string,
        cidade: string,
        estado: string,
        CTGId: number,
        numCarteirinha: string,
        categoriaId: number,
        CPF: string,
        RG: string,
        endereco: string,
        numEndereco: number,
        bairro: string,
        escolaridade: string,
        filiacao: string,
        ProvaCampeiraEsportiva: ProvaCampeiraEsportiva,
        anexoDocumento?: Buffer,
        anexoCarteirinha?: Buffer,
        anexoEscolaridade?: Buffer,
        anexoResidencia?: Buffer,
        anexoAtaConcurso?: Buffer,
        fichaInscricao?: Buffer,
        anexoTermoCandidato?: Buffer,
        anexoRelatorioVivencia?: Buffer,
        anexoResponsavel?: Buffer,
        anexoProvaEsportivaCampeira?: Buffer
    ) {
        try {
            const candidato = await this.prisma.candidato.create({
                data: {
                    nomeCompleto,
                    cidade,
                    estado, 
                    CTGId,
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
                    categoriaId
                }
            });

            return { candidato};
        } catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao criar candidato. Verifique os dados fornecidos.");
        }
    }

    async atualizarCandidato(
        idCandidato: number,
        data: {
            nomeCompleto?: string;
            cidade?: string;
            estado?: string;
            CTGId?: number;
            numCarteirinha?: string
            categoriaId?: number,
            CPF?: string,
            RG?: string,
            endereco?: string,
            numEndereco?: number,
            bairro?: string,
            escolaridade?: string,
            filiacao?: string,
            ProvaCampeiraEsportiva?: ProvaCampeiraEsportiva,
            anexoDocumento?: Buffer,
            anexoCarteirinha?: Buffer,
            anexoEscolaridade?: Buffer,
            anexoResidencia?: Buffer,
            anexoAtaConcurso?: Buffer,
            fichaInscricao?: Buffer,
            anexoTermoCandidato?: Buffer,
            anexoRelatorioVivencia?: Buffer,
            anexoResponsavel?: Buffer,
            anexoProvaEsportivaCampeira?: Buffer
        },
    ) {
        try {
            const candidatoExistente = await this.prisma.candidato.findUnique({
                where: { idCandidato }
            });

            if (!candidatoExistente) {
                throw new Error("Candidato não encontrado");
            }

            const candidatoAtualizado = await this.prisma.candidato.update({
                where: { idCandidato },
                data
            });

            return candidatoAtualizado;
        } catch (error) {
            console.error(error);
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
            console.log("IdCandidato:", idCandidato);
    
            const candidato = await this.prisma.candidato.findUnique({
                where: { idCandidato },
            });
    
            if (!candidato) {
                throw new Error("Candidato não encontrado.");
            }
    
            await this.prisma.candidato.delete({
                where: { idCandidato },
            });
    
            return { mensagem: "Candidato deletado com sucesso." };
        } catch (error) {
            console.error(error);
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