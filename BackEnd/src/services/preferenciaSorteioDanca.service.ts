import { DancaSalaoTradicional, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PreferenciaSorteioDancaService {
    
    async selecionarPreferenciaSorteioDanca(
        nomeSorteioDanca: DancaSalaoTradicional, 
        candidatoId: number,
        quesitosIds: number[]
    ) {
        try {
            const preferenciaExistente = await prisma.preferenciaSorteioDanca.findFirst({
                where: {
                    candidatoId: candidatoId,
                    nomeSorteioDanca: nomeSorteioDanca
                }
            });

            if (preferenciaExistente) {
                throw new Error(`O candidato já definiu suas preferências para a modalidade: ${nomeSorteioDanca}.`);
            }

            const preferenciasCriadas = await prisma.preferenciaSorteioDanca.create({
                data: {
                    nomeSorteioDanca, 
                    candidatoId,
                    quesitos: {
                        connect: quesitosIds.map(id => ({ idQuesito: id })),
                    },
                },
                include: {
                    quesitos: true
                }
            });

            return preferenciasCriadas;

        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error(`Já existe um grupo de preferências cadastrado para ${nomeSorteioDanca}.`);
            }
            throw new Error("Erro ao criar preferências: " + error.message);
        }
    }

    async visualizarPreferencias(candidatoId: number) {
        const preferencias = await prisma.preferenciaSorteioDanca.findMany({
            where: { candidatoId },
            include: { quesitos: true },
        });
        return preferencias;
    }

    async atualizarSorteioDancaId(
        candidatoId: number,
        sorteioDancaId: number,
        nomeSorteioDanca: DancaSalaoTradicional
    ) {
        return await prisma.preferenciaSorteioDanca.updateMany({
            where: { candidatoId, nomeSorteioDanca },
            data: { sorteioDancaId },
        });
    }

    async verificarSorteioDancaId(candidatoId: number, tipoDanca: DancaSalaoTradicional): Promise<boolean> {
        const sorteio = await prisma.preferenciaSorteioDanca.findFirst({
            where: {
                candidatoId,
                nomeSorteioDanca: tipoDanca,
                sorteioDancaId: { not: null },
            },
        });
        return sorteio !== null;
    }
}

const preferenciaSorteioDanca = new PreferenciaSorteioDancaService();
export default preferenciaSorteioDanca;