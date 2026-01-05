import { DancaSalaoTradicional, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DancaService {
    constructor(private prisma: PrismaClient) {}

    async criarDanca(nomeDanca: string, tipo: "DANCA_DE_SALAO" | "DANCA_TRADICIONAL") {
        return await this.prisma.danca.create({
            data: {
                nomeDanca,
                dancaSalaoTradicional: tipo,
            },
        });
    }

    async atualizarDanca(idDanca: number, dados: Partial<{ nomeDanca: string; dancaSalaoTradicional: "DANCA_DE_SALAO" | "DANCA_TRADICIONAL"; }>) {
        return await this.prisma.danca.update({
            where: { idDanca },
            data: dados,
        });
    }

    async buscarDancasTradicionais() {
        try {
            const dancas = await this.prisma.danca.findMany({
                where: {
                    dancaSalaoTradicional: DancaSalaoTradicional.DANCA_TRADICIONAL,
                }
            });

            return dancas;
        } catch (error) {
            console.error("Erro ao buscar danças tradicionais:", error);
            throw new Error("Erro ao buscar danças tradicionais");
        }
    }

    async buscarDancasSalao() {
        try {
            const dancas = await this.prisma.danca.findMany({
                where: {
                    dancaSalaoTradicional: DancaSalaoTradicional.DANCA_DE_SALAO,
                }
            });

            return dancas;
        } catch (error) {
            console.error("Erro ao buscar danças de salão:", error);
            throw new Error("Erro ao buscar danças de salão");
        }
    }

    async deletarDanca(idDanca: number) {
        return await this.prisma.danca.delete({
            where: { idDanca },
        });
    }
}

const dancaService = new DancaService(prisma);
export default dancaService;