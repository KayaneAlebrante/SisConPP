import { PrismaClient } from "@prisma/client";
import { prisma } from '../prisma';

class Avaliacao{
    constructor(private prisma: PrismaClient){}

    async adicionarAvaliacao(
        comissaoId: number,
        avaliadorId: number,
        candidatoId: number,
        provaId: number,
        blocoProvaId: number,
    ){
        try {
            const avaliacao = await this.prisma.avaliacao.create({
                data: {
                    dataAvaliacao: new Date(),
                    comissaoId,
                    avaliadorId,
                    candidatoId,
                    provaId,
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

const avaliacao = new Avaliacao(prisma);
export default avaliacao;