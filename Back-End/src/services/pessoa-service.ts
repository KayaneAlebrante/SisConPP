import { CTG, PrismaClient } from "@prisma/client";
import UsuarioService from "./usuario-service";
import candidatoService from "./candidato-service";
import { connect } from "http2";

const prisma = new PrismaClient();

class PessoaService {
    constructor(protected prisma: PrismaClient) { }

    async criarPessoa(
        nomeCompleto: string,
        cidade: string,
        estado: string,
        CTGId: number,
        numCarteirinha?: string
    ) {
        console.log("CTG ID:", CTGId);
        try {
            const ctgExiste = await this.prisma.cTG.findUnique({
                where: { idCTG: CTGId }
            });

            if (!ctgExiste) {
                throw new Error('CTG não encontrado');
            }

            const pessoa = await this.prisma.pessoa.create({
                data: {
                    nomeCompleto,
                    cidade,
                    estado,
                    CTG: {
                        connect: { idCTG: CTGId }
                    },
                    numCarteirinha: numCarteirinha ?? ''
                }
            });
            return pessoa;
        } catch (error) {
            console.error("Erro ao criar pessoa:", error);
            throw error;
        }
    }

    async atualizarPessoa(
        idPessoa: number,
        data: { nomeCompleto?: string; cidade?: string; estado?: string; CTGId?: number; numCarteirinha?: string }
    ) {
        try {
            const pessoa = await this.prisma.pessoa.update({
                where: { idPessoa: idPessoa },
                data: data
            });
            return pessoa;
        } catch (error) {
            throw new Error("Erro ao atualizar pessoa. Verifique os dados fornecidos.");
        }
    }

    async buscarPessoaPorId(idPessoa: number) {
        try {
            const pessoa = await this.prisma.pessoa.findUnique({
                where: { idPessoa: idPessoa }
            });
            return pessoa;
        } catch (error) {
            throw new Error("Erro ao buscar pessoa.");
        }
    }

    async buscarPessoas() {
        try {
            const pessoas = await this.prisma.pessoa.findMany();
            return pessoas;
        } catch (error) {
            throw new Error("Erro ao buscar pessoas.");
        }
    }

    async deletarPessoa(idPessoa: number) {
        try {
            await this.prisma.pessoa.delete({
                where: { idPessoa: idPessoa }
            });
            
            return { message: 'Pessoa deletada com sucesso.' };
        } catch (error: any) {
            console.error('Erro ao deletar pessoa:', error);
            throw new Error(`Erro ao deletar pessoa: ${error.message}`);
        }
    }
}

export default PessoaService;