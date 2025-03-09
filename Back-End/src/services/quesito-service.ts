import { DancaSalaoTradicional, PrismaClient, Recurso, SubQuesitos } from "@prisma/client";

const prisma = new PrismaClient();

class QuesitoService{
    constructor(private prisma: PrismaClient){}

    async criarQuesitos(
        nomeQuesito: string,
        notaMaximaQuesito: number,
        danca: boolean,
        dancaSalaoTradicional: DancaSalaoTradicional,
        blocoProvaIdBloco?: number,
        provaTeoricaIdProvaTeorica?: number
    ){
        try {
            if (blocoProvaIdBloco) {
                const blocoProvaExiste = await this.prisma.blocoProva.findUnique({
                    where: { idBloco: blocoProvaIdBloco }
                });
    
                if (!blocoProvaExiste) {
                    throw new Error(`O blocoProvaIdBloco ${blocoProvaIdBloco} não existe.`);
                }
            }
    
            const quesito = await this.prisma.quesitos.create({
                data: {
                    nomeQuesito: nomeQuesito,
                    notaMaximaQuesito: notaMaximaQuesito,
                    danca: danca,
                    dancaSalaoTradicional: dancaSalaoTradicional,
                    blocoProvaIdBloco: blocoProvaIdBloco ?? null, 
                    provaTeoricaIdprovaTeorica: provaTeoricaIdProvaTeorica ?? null
                },
            });
    
            return quesito;
        }catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao criar Quesito. Verifique os dados fornecidos.");
        }
    }

    async atualizarQuesitos(
        idQuesito: number,
        data:{
            nomeQuesito?: string;
            notaMaximaQuesito?: number;
            danca?: boolean;
            dancaSalaoTradicional?: DancaSalaoTradicional;
            blocoProvaIdBloco?: number;
        }
    ){
        try{
            const quesito = await this.prisma.quesitos.update({
                where: { idQuesito: idQuesito },
                data: data,
            });
            return quesito;

        }catch(error){
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao atualizar Quesito. Verifique os dados fornecidos.");
        }
    }

    async buscarQuesitoPorId(idQuesito: number){
        try{
            const quesito = await this.prisma.quesitos.findUnique({
                where: { idQuesito: idQuesito },
            });
            return quesito;
        }catch(error){
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao buscar Quesito.");
        }
    }

    async buscarQuesitos(){
        try{
            const quesitos = await this.prisma.quesitos.findMany();
            return quesitos;
        }catch(error){
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao buscar Quesitos.");
        }
    }

    async deletarQuesito(idQuesito: number){
        try{
            const quesito = await this.prisma.quesitos.delete({
                where: { idQuesito: idQuesito },
            });
            return quesito;
        }catch(error){
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao deletar Quesito.");
        }
    }
}    

const quesitoService = new QuesitoService(prisma);
export default quesitoService;