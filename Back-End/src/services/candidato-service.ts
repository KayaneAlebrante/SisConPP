import { Avaliacao, PreferenciaSorteioDanca, PrismaClient, ProvaCampeiraEsportiva, SorteioDanca } from "@prisma/client";
import PessoaService from "./pessoa-service";
import usuarioController from "../controllers/usuario-controller";

const prisma = new PrismaClient();

class CandidatoService extends PessoaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
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
        concursoId: number,
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
        const pessoaId = await this.criarPessoa(
            nomeCompleto,
            cidade,
            estado,
            CTGId,
            numCarteirinha
        );

        const pessoaExistente = await this.prisma.pessoa.findUnique({
            where: { idPessoa: pessoaId.idPessoa },
            include: { Usuario: true, Candidato: true },
        });

        if (pessoaExistente?.Usuario || pessoaExistente?.Candidato) {
            throw new Error("Esta pessoa já está associada a um usuário ou candidato.");
        }

        try {
            const candidato = await this.prisma.candidato.create({
                data: {
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
                    concursoId,
                    categoriaId
                }
            });

            console.log("Candidato Criado con sucesso");
            return { candidato, pessoaId };

        } catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao criar candidato. Verifique os dados fornecidos.");
        }
    }

    async atualizarCandidato(
        idCandidato: number,
        data: {
            categoriaId: number,
            CPF: string,
            RG: string,
            endereco: string,
            numEndereco: number,
            bairro: string,
            escolaridade: string,
            filiacao: string,
            ProvaCampeiraEsportiva: ProvaCampeiraEsportiva,
            concursoId: number,
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

        pessoaData: {
            nomeCompleto?: string;
            cidade?: string;
            estado?: string;
            CTGId?: number;
            numCarteirinha?: string
        }
    ) {
        try {

            const candidato = await this.prisma.candidato.update({
                where: { idCandidato },
                data,
                include: { Pessoa: true },
            });

            if(pessoaData && candidato.pessoaId){
                const pessoa = await this.atualizarPessoa(candidato.pessoaId, pessoaData);
                return{ candidato, pessoa };
            }        

            return candidato;
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
                include: { Pessoa: true },
            });
    
            if (!candidato) {
                throw new Error("Candidato não encontrado.");
            }
    
            const idPessoa = candidato.pessoaId;
    
            await this.prisma.candidato.delete({
                where: { idCandidato },
            });
    
            if (idPessoa) {
                await this.deletarPessoa(idPessoa);
                console.log("Pessoa Deletada com Sucesso!");
            }
    
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