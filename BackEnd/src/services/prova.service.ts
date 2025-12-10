import { Categoria } from "@prisma/client";
import { prisma } from '../prisma';

export class ProvaService {

    protected prisma = prisma; // ← agora a classe tem o prisma internamente, sem construtor

    async criarProva(
        nomeProva: string,
        notaMaxima: number, 
        categorias: number[]
    ){
        try{
            const prova = await this.prisma.prova.create({
                data:{
                    nomeProva,
                    notaMaxima,
                    categorias: {
                        connect: categorias.map(id => ({ idCategoria: id }))
                    },
                }
            });

            return prova;
        }catch(error){
            console.error("Erro ao criar Prova:", error);
            throw error;
        }
    }

    async atualizarProva(
        idProva: number,
        data: {
            nomeProva?: string,
            categorias?: Categoria[]
        }
    ){
        try{
            const prova = await this.prisma.prova.update({
                where: { idProva },
                data: {
                    nomeProva: data.nomeProva,
                    categorias: data.categorias ? { set: data.categorias } : undefined
                },
            });
            return prova;
        }catch(error){
            throw new Error("Erro ao atualizar Prova.");
        }
    }

    async buscarProvas(){
        try{
            return await this.prisma.prova.findMany();
        }catch(error){
            throw new Error("Erro ao buscar provas.");
        }
    }

    async deletarProvas(idProva: number){
        try{
            return await this.prisma.prova.delete({
                where: { idProva },
            });
        }catch(error){
            throw new Error("Erro ao deletar Prova.");
        }
    }

}


export const provaService = new ProvaService();