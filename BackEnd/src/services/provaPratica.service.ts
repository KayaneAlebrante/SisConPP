import {  BlocoProva, Categoria, PrismaClient } from "@prisma/client";
import ProvaService from "./prova.service";

const prisma = new PrismaClient();

class ProvaPraticaService extends ProvaService{
    constructor(protected prisma: PrismaClient) {
        super(prisma);
    }

    async criarProvaPratica(
       nomeProva: string,
       notaMaxima: number,    
       categorias: number[],
       blocodProva: number[]
    ) {
        const prova = await this.criarProva(
            nomeProva,
            notaMaxima,
            categorias,
        );

        try{
            const provaPratica = await this.prisma.provaPratica.create({
                data: {
                    provaId: prova.idProva,
                    blocosProvas: {
                        connect: blocodProva.map(id => ({ idBloco: id }))
                    },
                }
            });
            return provaPratica;
        }catch(error){
            console.error("Erro ao criar prova prática:", error);
            throw new Error("Erro ao criar prova prática. Verifique os dados fornecidos.");
        }
    }

    async buscarProvaPraticaPorId(idProvaPratica: number) {
        try {
            const provaPratica = await this.prisma.provaPratica.findUnique({
                where: { idProvaPratica }
            });
            return provaPratica;
        } catch (error) {
            console.error("Erro ao listar prova prática:", error);
            throw new Error("Erro ao listar prova prática.");
        }
    }

    async buscarProvasPraticas() {
        try {
            const provasPraticas = await this.prisma.provaPratica.findMany();
            return provasPraticas;
        } catch (error) {
            console.error("Erro ao listar provas práticas:", error);
            throw new Error("Erro ao listar provas práticas.");
        }
    }


    async atualizarProvaPratica(
        idProvaPratica: number,
        data:{
            blocosProvas?: number[],
        },
        provaData:{
            nomeProva?: string,
            categorias?: Categoria[],
        }
    ) {
        try {
            const provaPratica = await this.prisma.provaPratica.update({
                where: { idProvaPratica },
                data: {
                    blocosProvas: {
                        set: data.blocosProvas?.map(id => ({ idBloco: id })) || [],
                    },
                },
            });

            if(provaData && provaPratica.provaId) {
                const prova = await this.atualizarProva(provaPratica.provaId, provaData);
                return { provaPratica, prova };
            }
            return provaPratica;
        } catch (error) {
            console.error("Erro ao atualizar prova prática:", error);
            throw new Error("Erro ao atualizar prova prática. Verifique os dados fornecidos.");
        }
    }
}

const provaPraticaService = new ProvaPraticaService(prisma);
export default provaPraticaService;

