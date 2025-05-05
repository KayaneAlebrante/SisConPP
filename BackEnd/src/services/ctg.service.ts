import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CTGService{
    constructor(private prisma: PrismaClient){ }

    async criarCTG(nomeCTG: string, RTid: number){
        try{
            const ctg = await this.prisma.cTG.create({
                data: {
                    nomeCTG: nomeCTG,
                    RTid: RTid,
                },
            });
            return ctg.idCTG;
        } catch (error){
            throw new Error("Erro ao criar CTG. Verifique os dados fornecidos.");
        }
    }

    async atualizarCTG(
        idCTG: number,
        data: {
            nomeCTG?: string;
            RTId?: number;
        }
    ){
        try{
            const ctg = await this.prisma.cTG.update({
                where: { idCTG: idCTG },
                data: data,
            });
            return ctg;
        }catch(error){
            throw new Error("Erro ao atualizar CTG. Verifique os dados fornecidos.");
        }
    }

    async buscarCTGPorId(idCTG: number){
        try{
            const ctg = await this.prisma.cTG.findUnique({
                where: { idCTG: idCTG },
            });
            return ctg;
        }catch(error){
            throw new Error("Erro ao buscar CTG.");
        }
    }

    async buscarCTGs(){
        try{
            const ctg = await this.prisma.cTG.findMany();
            return ctg;
        }catch(error){
            throw new Error("Erro ao buscar CTGs.");
        }
    }

    async deletarCTG(idCTG: number){
        try{
            const ctg = await this.prisma.cTG.delete({
                where: { idCTG: idCTG },
            });
            return ctg;
        }catch(error){
            throw new Error("Erro ao deletar CTG.");
        }
    }
}

const ctgService = new CTGService(prisma);

export default ctgService;