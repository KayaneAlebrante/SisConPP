import { Categoria, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

class ProvaTeoricaService{
    async criarProvaTeorica(
        nomeProva: string,
        notaMaxima: number,
        categorias: number[],
        gabaritoOficial: Buffer,
        numQuestao: number       
    ){
        try{
            const provaTeorica = await prisma.provaTeorica.create({
                data: {
                    nomeProva,
                    notaMaxima,
                    categorias: {
                        connect: categorias?.map((id: number) => ({
                            idCategoria: id,
                        })),
                    },
                    ...(gabaritoOficial && { gabaritoOficial: new Uint8Array(gabaritoOficial) }),
                    numQuestao
                }               
            });
            return provaTeorica;
    }catch(error){
        console.error("Erro ao criar prova Teorica:", error);
        throw new Error("Erro ao criar prova Teorica. Verifique os dados fornecidos.");
    }
    }

    async buscarProvaTeoricaPorId(provaTeoricaId: number) {
        try {
            const provaTeorica = await prisma.provaTeorica.findUnique({
                where: { idprovaTeorica: provaTeoricaId }
            });
            return provaTeorica;
        } catch (error) {
            console.error("Erro ao listar prova Teorica:", error);
            throw new Error("Erro ao listar prova Teorica.");
        }
    }

    async buscarProvasTeoricas() {
        try {
            const provasTeoricas = await prisma.provaTeorica.findMany();
            return provasTeoricas;
        } catch (error) {
            console.error("Erro ao listar provas Teoricas:", error);
            throw new Error("Erro ao listar provas Teoricas.");
        }
    }

    async atualizarProvaTeorica(
        provaTeoricaId: number,
        nomeProva?: string,
        notaMaxima?: number,
        categorias?: number[],
        data?: { gabaritoOficial?: Buffer; numQuestao?: number },
        
    ){
        try{
            const provaTeorica = await prisma.provaTeorica.update({
                where: { idprovaTeorica: provaTeoricaId },
                data: {
                    nomeProva,
                    notaMaxima,
                    categorias: {
                        connect: categorias?.map((id: number) => ({
                            idCategoria: id,
                        })),
                    },
                    ...(data?.gabaritoOficial && { gabaritoOficial: new Uint8Array(data.gabaritoOficial) }),
                    ...(data?.numQuestao && { numQuestao: data.numQuestao })
                }
            });

            return provaTeorica;
        }catch(error){
            throw new Error("Erro ao atualizar Prova Teorica. Verefique os dados fornecidos.");
        }
    }

}

const provaTeoricaService = new ProvaTeoricaService();
export default provaTeoricaService;