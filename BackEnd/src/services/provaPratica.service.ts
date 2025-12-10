import { Categoria, PrismaClient } from "@prisma/client";
import { ProvaService } from "./prova.service";
import { prisma } from "../prisma";

export class ProvaPraticaService extends ProvaService {

    constructor() {
        super(); 
    }

    async criarProvaPratica(
        nomeProva: string,
        notaMaxima: number,
        categorias: number[],
        blocosProva: number[],
    ) {

        try {
            const prova = await this.criarProva(
                nomeProva,
                notaMaxima,
                categorias
            );
            const provaPratica = await prisma.provaPratica.create({
                data: {
                    provaId: prova.idProva,
                    blocosProvas: {
                        connect: blocosProva.map(id => ({ idBloco: id }))
                    }
                }
            });

            return provaPratica;

        } catch (error) {
            console.error("Erro ao criar prova prática:", error);
            throw new Error("Erro ao criar prova prática.");
        }
    }

    async buscarProvaPraticaPorId(idProvaPratica: number) {
        return prisma.provaPratica.findUnique({
            where: { idProvaPratica }
        });
    }

    async buscarProvasPraticas() {
        return prisma.provaPratica.findMany();
    }

    async atualizarProvaPratica(
        idProvaPratica: number,
        data: {
            blocosProvas?: number[],
        },
        provaData?: {
            nomeProva?: string,
            categorias?: Categoria[],
        }
    ) {

        try {
            const provaPratica = await prisma.provaPratica.update({
                where: { idProvaPratica },
                data: {
                    blocosProvas: data.blocosProvas
                        ? { set: data.blocosProvas.map(id => ({ idBloco: id })) }
                        : undefined
                }
            });

            if (provaData && provaPratica.provaId) {
                const prova = await this.atualizarProva(provaPratica.provaId, provaData);
                return { provaPratica, prova };
            }

            return provaPratica;

        } catch (error) {
            console.error("Erro ao atualizar prova prática:", error);
            throw new Error("Erro ao atualizar prova prática.");
        }
    }

}

export const provaPraticaService = new ProvaPraticaService();
export default provaPraticaService;