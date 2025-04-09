import { DancaSalaoTradicional, PrismaClient } from "@prisma/client";
import preferenciaSorteioDanca from "./preferenciaSorteioDanca-service";

const prisma = new PrismaClient();

class SorteioDanca {
    async realizarSorteio(
        candidatoId: number,
        usuarioId: number,
        tipoDanca: DancaSalaoTradicional
    ) {
        try {

            const sorteioDancaExistente = preferenciaSorteioDanca.vereficarSorteioDancaId(candidatoId);

            if(await sorteioDancaExistente == true){
               return { message: "Sorteio já realizado para este candidato." };
            }

            const preferencias = await prisma.preferenciaSorteioDanca.findMany({
                where: {
                    candidatoId,
                    nomeSorteioDanca: tipoDanca,
                },
                include: { quesitos: true },
            });

            if (!preferencias || preferencias.length === 0) {
                throw new Error(
                    "Nenhuma preferência encontrada para o candidato com o tipo de dança especificado."
                );
            }

            const todosQuesitos = preferencias.flatMap(preferencia =>
                preferencia.quesitos.map(quesito => ({
                    idQuesito: quesito.idQuesito,
                    nomeQuesito: quesito.nomeQuesito,
                }))
            );

            if (todosQuesitos.length === 0) {
                throw new Error("Nenhum quesito encontrado nas preferências do candidato.");
            }


            const sorteioIndex = Math.floor(Math.random() * todosQuesitos.length);
            const quesitoSorteado = todosQuesitos[sorteioIndex];

            const sorteio = await prisma.sorteioDanca.create({
                data: {
                    resultadoSorteio: quesitoSorteado.idQuesito,
                    dataSorteio: new Date(),
                    candidatoId,
                    usuarioId
                },
            });

            preferenciaSorteioDanca.atualizarSorteioDancaId(
                candidatoId,
                sorteio.idSorteio,
                tipoDanca
            );
                        
            return {
                message: "Sorteio realizado com sucesso.",
                sorteio,
                quesitoSorteado
            };

        } catch (error: any) {
            console.error("Erro ao realizar sorteio de dança:", error);
            throw new Error("Erro ao realizar sorteio de dança: " + error.message);
        }
    }
}

const sorteioDanca = new SorteioDanca();
export default sorteioDanca;