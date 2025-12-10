import { Categoria } from "@prisma/client";
import { ProvaService } from "./prova.service";
import { prisma } from "../prisma";

export class ProvaTeoricaService extends ProvaService {

    constructor() {
        super();
    }

    async criarProvaTeorica(
        nome: string,
        notaMaxima: number,
        categorias: number[],
        gabaritoOficinal: Buffer,
        numQuestao: number
    ) {
        try {
            const prova = await this.criarProva(
                nome,
                notaMaxima,
                categorias
            );

            const provaTeorica = await prisma.provaTeorica.create({
                data: {
                    provaId: prova.idProva,
                    gabaritoOficinal: new Uint8Array(gabaritoOficinal),
                    numQuestao
                }
            });

            return provaTeorica;

        } catch (error) {
            console.error("Erro ao criar prova Teórica:", error);
            throw new Error("Erro ao criar prova téorica. Verifique os dados fornecidos.");
        }
    }

    async buscarProvaTeoricaPorId(idProvaTeorica: number) {
        try {
            return await prisma.provaTeorica.findUnique({
                where: { idprovaTeorica: idProvaTeorica } 
            });
        } catch (error) {
            console.error("Erro ao buscar prova Teórica:", error);
            throw new Error("Erro ao buscar prova teórica.");
        }
    }

    async buscarProvasTeoricas() {
        try {
            return await prisma.provaTeorica.findMany();
        } catch (error) {
            console.error("Erro ao listar provas teóricas:", error);
            throw new Error("Erro ao listar provas teóricas.");
        }
    }

    async atualizarProvaTeorica(
        idProvaTeorica: number,
        data: {
            gabaritoOficinal?: Buffer,
            numQuestao?: number
        },
        provaData?: {
            nome?: string,
            notaMaxima?: number,
            categorias?: Categoria[],
        }
    ) {
        try {
            const provaTeorica = await prisma.provaTeorica.update({
                where: { idprovaTeorica: idProvaTeorica },
                data: {
                    gabaritoOficinal: data.gabaritoOficinal 
                        ? new Uint8Array(data.gabaritoOficinal)
                        : undefined,
                    numQuestao: data.numQuestao
                }
            });

            if (provaData && provaTeorica.provaId) {
                const prova = await this.atualizarProva(provaTeorica.provaId, provaData);
                return { provaTeorica, prova };
            }

            return provaTeorica;

        } catch (error) {
            console.error("Erro ao atualizar prova Teórica:", error);
            throw new Error("Erro ao atualizar prova teórica.");
        }
    }
}

export const provaTeoricaService = new ProvaTeoricaService();
export default provaTeoricaService;