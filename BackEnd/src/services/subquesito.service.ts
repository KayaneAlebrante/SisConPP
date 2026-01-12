import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient;

class SubQuesitosService{
    constructor(protected prisma: PrismaClient){}

    async criarsubQuesitos(
        nomeSubquesito : string,
        notaSubequesito: number,
        quesitoId: number
    ){
        try{
            const subquesito = await this.prisma.subQuesitos.create({
                data:{
                    nomeSubquesito,
                    notaSubequesito,
                    quesitoId
                },
            });

            return subquesito;
        }catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao criar Subquesito. Verifique os dados fornecidos.");
        }

    }

    async atualizarsubQuesitos(idSubequestios: number, data: any){
        try{
            const subquesito = await this.prisma.subQuesitos.update({
                where: { idSubequestios },
                data,
            });

            console.log("Subquesito atualizado com sucesso.");
            return subquesito;
        }catch (error){
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao atualizar Subquesito. Verifique os dados fornecidos.");
        }
    }

    async buscarSubQuesitoPorId(idSubequestios: number){
        const subquesito = await this.prisma.subQuesitos.findUnique({
            where: { idSubequestios },
        });

        return subquesito;
    }

    async buscarSubQuesitos(){
        const subquesitos = await this.prisma.subQuesitos.findMany();
        return subquesitos;
    }

    async deletarSubQuesito(idSubequestios: number){
        try{
            await this.prisma.subQuesitos.delete({
                where: { idSubequestios },
            });

            console.log("Subquesito deletado com sucesso.");
        }catch (error){
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao deletar Subquesito.");
        }
    }
}

const subQuesitosService = new SubQuesitosService(prisma);
export default subQuesitosService;