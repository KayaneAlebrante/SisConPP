import { PrismaClient } from "@prisma/client";

class Avaliacao{
    protected prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async adicionarAvaliacao(
        comissaoId: number,
        avaliadorId: number,
        candidatoId: number,
        blocoProvaId: number,
    ){
        try {
            const avaliacao = await this.prisma.avaliacao.create({
                data: {
                    dataAvaliacao: new Date(),
                    comissaoId,
                    avaliadorId,
                    candidatoId,
                    blocoProvaId,
                    nota: 0, 
                },
            });
            return avaliacao;
        } catch (error) {
            throw new Error(`Erro ao adicionar avaliação: ${error}`);
        }
    }

    async editarAvaliacao(
        idAvalicao: number,
        avaliadorId: number,
        candidatoId: number,
    ){
        try {
            const avaliacao = await this.prisma.avaliacao.update({
                where: { idAvalicao, candidatoId },
                data: { avaliadorId },
            });
            return avaliacao;
        } catch (error) {
            throw new Error(`Erro ao editar avaliação: ${error}`);
        }
    }

    async visualizarAvaliacoes(
        candidatoId: number,
    ){
        try {
            const avaliacoes = await this.prisma.avaliacao.findMany({
                where: { candidatoId },
            });
            return avaliacoes;
        } catch (error) {
            throw new Error(`Erro ao visualizar avaliações: ${error}`);
        }
    }
}

const avaliacao = new Avaliacao();
export default avaliacao;