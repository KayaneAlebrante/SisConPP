import { CTG, PrismaClient } from "@prisma/client";
import UsuarioService from "./usuario-service";
import candidatoService from "./candidato-service";
import { connect } from "http2";

const prisma = new PrismaClient();

class PessoaService {
    constructor(protected prisma: PrismaClient) {}

    async criarPessoa(
        nomeCompleto: string,
        cidade: string,
        estado: string,
        numCarteirinha?: string,
        CTGId?: CTG["idCTG"]
    ) {
        try {
            const pessoa = await this.prisma.pessoa.create({
                data: {
                    nomeCompleto: nomeCompleto,
                    cidade: cidade,
                    estado: estado,
                    numCarteirinha: numCarteirinha ?? '',
                    CTG: { connect: { idCTG: CTGId } }
                }
            });
            return pessoa;
        } catch (error) {
            throw new Error("Erro ao criar pessoa. Verifique os dados fornecidos.");
        }
    }

    async atualizarPessoa(
        idPessoa: number,
        data: { nomeCompleto?: string; cidade?: string; estado?: string; numCarteirinha?: string }
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

    async buscarPessoaPorId(idPessoa: number){
        try{
            const pessoa = await this.prisma.pessoa.findUnique({
                where: {idPessoa: idPessoa}
            });
            return pessoa;
        } catch(error){
            throw new Error("Erro ao buscar pessoa.");
        }
    }

    async buscarPessoas(){
        try{
            const pessoas = await this.prisma.pessoa.findMany();
            return pessoas;
        } catch(error){
            throw new Error("Erro ao buscar pessoas.");
        }
    }

    async deletarPessoa(idPessoa: number){
        try{
            await this.prisma.pessoa.delete({
                where: {idPessoa: idPessoa}
            });
        } catch(error){
            throw new Error("Erro ao deletar pessoa.");
        }
    }
}

export default PessoaService;