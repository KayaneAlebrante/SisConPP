import { DancaSalaoTradicional, PrismaClient, Quesitos } from "@prisma/client";

const prisma = new PrismaClient();

class PreferenciaSorteioDancaService {
    async selecionarPreferenciaSorteioDanca(
        nomeSorteioDanca: DancaSalaoTradicional,
        candidatoId: number,
        quesitos: number[]
    ) {
        try{
            const preferenciasCriadas = await prisma.preferenciaSorteioDanca.create({
                data: {
                    nomeSorteioDanca, 
                    candidatoId,
                    quesitos: {
                        connect: quesitos.map(id => ({ idQuesito: id })),
                    },
                },
            });

            return preferenciasCriadas;
        }catch (error: any) {
            throw new Error("Erro ao criar preferências de sorteio de dança: " + error.message);
        }
        
    }

    async visualizarPreferencias(candidatoId: number) {
        const preferencias = await prisma.preferenciaSorteioDanca.findMany({
            where: { candidatoId },
            include: { quesitos: true },
        });

        if (!preferencias) throw new Error("Nenhuma preferência encontrada");

        return preferencias;
    }

    async atualizarSorteioDancaId(
        candidatoId: number,
        sorteioDancaId: number,
        nomeSorteioDanca: DancaSalaoTradicional
    ) {
        const preferenciaAtualizada = await prisma.preferenciaSorteioDanca.updateMany({
            where: {
                candidatoId,
                nomeSorteioDanca,
            },
            data: {
                sorteioDancaId,
            },
        });

        return preferenciaAtualizada;
    }

    async verificarSorteioDancaId(candidatoId: number, tipoDanca: DancaSalaoTradicional): Promise<boolean> {
        try {
            const sorteioDanca = await prisma.preferenciaSorteioDanca.findFirst({
                where: {
                    candidatoId,
                    nomeSorteioDanca: tipoDanca, 
                    sorteioDancaId: { not: null }, 
                },
            });
    
            return sorteioDanca !== null;
        } catch (error: any) {
            console.error("Erro ao verificar sorteio de dança:", error);
            throw new Error("Erro ao verificar sorteio de dança: " + error.message);
        }
    }
}

const preferenciaSorteioDanca = new PreferenciaSorteioDancaService();
export default preferenciaSorteioDanca;