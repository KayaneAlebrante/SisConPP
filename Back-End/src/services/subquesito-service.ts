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

            console.log("Subquesito criado com sucesso.");
            return subquesito;
        }catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao criar Subquesito. Verifique os dados fornecidos.");
        }

    }

}

const subQuesitosService = new SubQuesitosService(prisma);
export default subQuesitosService;