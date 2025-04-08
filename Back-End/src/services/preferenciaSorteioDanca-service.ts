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
}

const preferenciaSorteioDanca = new PreferenciaSorteioDancaService();
export default preferenciaSorteioDanca;