import { PrismaClient, Prisma } from "@prisma/client";
import AppError from '../errors/AppError';

const prisma = new PrismaClient();

class CTGService {
    constructor(private prisma: PrismaClient) { }

    async criarCTG(nomeCTG: string, RTid: number) {
        try {
            const ctg = await this.prisma.cTG.create({
                data: {
                    nomeCTG: nomeCTG,
                    RTid: RTid,
                },
            });
            return ctg.idCTG;
        } catch (error) {
            throw new Error("Erro ao criar CTG. Verifique os dados fornecidos.");
        }
    }

    async atualizarCTG(
        idCTG: number,
        data: {
            nomeCTG?: string;
            RTId?: number;
        }
    ) {
        try {
            const ctg = await this.prisma.cTG.update({
                where: { idCTG: idCTG },
                data: data,
            });
            return ctg;
        } catch (error) {
            throw new Error("Erro ao atualizar CTG. Verifique os dados fornecidos.");
        }
    }

    async buscarCTGPorId(idCTG: number) {
        try {
            const ctg = await this.prisma.cTG.findUnique({
                where: { idCTG: idCTG },
            });
            return ctg;
        } catch (error) {
            throw new Error("Erro ao buscar CTG.");
        }
    }

    async buscarCTGs() {
        try {
            const ctg = await this.prisma.cTG.findMany();
            return ctg;
        } catch (error) {
            throw new Error("Erro ao buscar CTGs.");
        }
    }

    async deletarCTG(idCTG: number) {
        try {
            const ctg = await this.prisma.cTG.findUnique({
                where: { idCTG }
            });

            if (!ctg) {
                throw new AppError("CTG não encontrada.", 404);
            }

            await this.prisma.cTG.delete({
                where: { idCTG}
            });

            return { message: "CTG deletada com sucesso." };

        } catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
                throw new AppError("Não é possível deletar a CTG pois ela está associado a outros registros.", 409);
            };

            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Erro ao deletar CTG", 500);
        }
    }
}

const ctgService = new CTGService(prisma);

export default ctgService;