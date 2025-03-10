import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProvaPraticaService{
    constructor(protected prisma: PrismaClient) {}

    async criarProvaPratica(
       nome: string
    ) {
        try{
            const provaPratica = await this.prisma.provaPratica.create({
                data: {
                    nome
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
        nome: string,
    ) {
        try {
            const provaPratica = await this.prisma.provaPratica.update({
                where: { idProvaPratica },
                data: {
                    nome
                }
            });
            return provaPratica;
        } catch (error) {
            console.error("Erro ao atualizar prova prática:", error);
            throw new Error("Erro ao atualizar prova prática. Verifique os dados fornecidos.");
        }
    }
}

const provaPraticaService = new ProvaPraticaService(prisma);
export default provaPraticaService;

