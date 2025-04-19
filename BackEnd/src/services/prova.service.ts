import { Categoria, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProvaService{
    constructor(protected prisma: PrismaClient){}

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
                where: { idProva: idProva },
                data: {
                    nomeProva: data.nomeProva,
                    categorias: data.categorias ? {
                        set: data.categorias
                    } : undefined
                },
            });
            return prova;
        }catch(error){
            throw new Error("Erro ao atualizar Prova. Verefique os dados fornecidos.");
        }
    }

    async buscarProvas(){
        try{
            const provas = await this.prisma.prova.findMany();
            return provas;
        }catch(error){
            throw new Error("Erro ao buscar provas.");
        }
    }

    async deletarProvas(idProva: number){
        try{
            const prova = await this.prisma.prova.delete({
                where: { idProva: idProva },
            });
        }catch(error){
            throw new Error("Erro ao deltar Prova.");
        }
    }

}

export default ProvaService;