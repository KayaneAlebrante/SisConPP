import { Categoria, PrismaClient } from "@prisma/client";
import ProvaService from "./prova.service";

const prisma = new PrismaClient;

class ProvaTeoricaService extends ProvaService {
    constructor(protected prisma: PrismaClient) {
        super(prisma);
    }

    async criarProvaTeorica(
        nome: string,
        notaMaxima: number,
        categorias: number[],
        gabaritoOficial: Buffer,
        numQuestao: number       
    ){
        const prova = await this.criarProva(
            nome,
            notaMaxima,
            categorias,
        );

        try{
            const provaTeorica = await this.prisma.provaTeorica.create({
                data: {
                    provaId: prova.idProva,
                    gabaritoOficinal: gabaritoOficial,
                    numQuestao,
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
            const provaTeorica = await this.prisma.provaTeorica.findUnique({
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
            const provasTeoricas = await this.prisma.provaTeorica.findMany();
            return provasTeoricas;
        } catch (error) {
            console.error("Erro ao listar provas Teoricas:", error);
            throw new Error("Erro ao listar provas Teoricas.");
        }
    }

    async atualizarProvaTeorica(
        provaTeoricaId: number,
        data: {
            gabaritoOficinal?: Buffer,
            numQuestao?: number
        },
        provaData:{
            nome?: string,
            notaMaxima?: number,
            categorias?: Categoria[],
        }
    ){
        try{
            const provaTeorica = await this.prisma.provaTeorica.update({
                where: { idprovaTeorica: provaTeoricaId },
                data: {
                    gabaritoOficinal: data.gabaritoOficinal,
                    numQuestao: data.numQuestao
                },
            });

            if(provaData && provaTeorica.provaId) {
                const prova = await this.atualizarProva(provaTeorica.provaId, provaData);
                return { provaTeorica, prova };
            }
            return provaTeorica;
        }catch(error){
            throw new Error("Erro ao atualizar Prova Teorica. Verefique os dados fornecidos.");
        }
    }

}

const provaTeoricaService = new ProvaTeoricaService(prisma);
export default provaTeoricaService;