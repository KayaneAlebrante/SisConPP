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

    async vereficarSorteioDancaId(candidatoId: number) {
        const sorteioDancaId = await prisma.preferenciaSorteioDanca.findFirst({
            where: {
                candidatoId,
            },
        });

        if (sorteioDancaId == null){
            throw new Error("Sorteio não Realizado!");
            return false;
        }else{
            return true;
        }
    }
}

const preferenciaSorteioDanca = new PreferenciaSorteioDancaService();
export default preferenciaSorteioDanca;