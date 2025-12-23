import { DancaSalaoTradicional, PrismaClient } from "@prisma/client";
import preferenciaSorteioDanca from "./preferenciaSorteioDanca.service";

const prisma = new PrismaClient();

class SorteioDanca {
    async realizarSorteio(
        candidatoId: number,
        usuarioId: number,
        tipoDanca: DancaSalaoTradicional
    ) {
        try {
            if (await preferenciaSorteioDanca.verificarSorteioDancaId(candidatoId, tipoDanca)) {
                return { message: "Sorteio já realizado para este candidato." };
            }

            const preferencias = await prisma.preferenciaSorteioDanca.findMany({
                where: {
                    candidatoId,
                    nomeSorteioDanca: tipoDanca,
                },
                include: { dancas: true }, 
            });

            if (!preferencias || preferencias.length === 0) {
                throw new Error(
                    "Nenhuma preferência encontrada para o candidato com o tipo de dança especificado."
                );
            }

            const todasDancas = preferencias.flatMap(preferencia =>
                preferencia.dancas.map(danca => ({
                    idDanca: danca.idDanca,
                    nomeDanca: danca.nomeDanca,
                }))
            );

            if (todasDancas.length === 0) {
                throw new Error("Nenhuma dança encontrada nas preferências do candidato.");
            }

            const sorteioIndex = Math.floor(Math.random() * todasDancas.length);
            const dancaSorteada = todasDancas[sorteioIndex];
            const sorteio = await prisma.sorteioDanca.create({
                data: {
                    resultadoSorteio: dancaSorteada.idDanca, 
                    candidatoId,
                    usuarioId,
                    tipoDanca,
                },
            });

            await preferenciaSorteioDanca.atualizarSorteioDancaId(
                candidatoId,
                sorteio.idSorteio,
                tipoDanca
            );

            return {
                message: "Sorteio realizado com sucesso.",
                sorteio,
                dancaSorteada,
            };

        } catch (error: any) {
            console.error("Erro ao realizar sorteio de dança:", error);
            throw new Error("Erro ao realizar sorteio de dança: " + error.message);
        }
    }
}

const sorteioDanca = new SorteioDanca();
export default sorteioDanca;