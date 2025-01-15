import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class preferenciaSorteioDanca{
    /*constructor(prisma: PrismaClient){
        this.prisma = prisma;
    }

    async criarPreferenciaSorteioDanca(
        danca: string,
        candidatoIdCandidato: number
    ){
        try{
            const preferenciaSorteioDanca = await this.prisma.preferenciaSorteioDanca.create({
                data: {
                    danca,
                    candidatoIdCandidato
                }
            });
            return preferenciaSorteioDanca;
        }catch(error){
            throw new Error(error);
        }
    }*/
}

export default preferenciaSorteioDanca;