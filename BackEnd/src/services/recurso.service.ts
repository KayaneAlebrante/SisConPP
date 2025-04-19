import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

class RecursoServie{
    constructor(protected prisma: PrismaClient){}

    async solicitarRecurso(
        nomeRecurso: string, 
        justificativa: string,
        arquivo: Buffer,
        candidato: number,
        avaliador: number,
        quesitoRecurso: number,
        provaTeoricaIdprovaTeorica?: number,
        provaPraticaIdProvaPratica?: number
    ) {
        try {
            const recurso = await this.prisma.recurso.create({
                data: {
                    nomeRecurso,
                    justificativa,
                    status: false, 
                    dataRecurso: new Date(), 
                    arquivos: arquivo,
                    candidato,
                    avaliador,
                    quesitoRecurso,
                    provaTeoricaIdprovaTeorica,
                    provaPraticaIdProvaPratica
                }, 
            });
    
            return recurso;
        } catch (error) {
            console.error("Erro ao criar recurso:", error);
            throw new Error("Erro ao criar recurso. Verifique os dados fornecidos.");
        }
    }

    async listarRecursos() {
        try {
            const recursos = await this.prisma.recurso.findMany();
            return recursos;
        } catch (error) {
            console.error("Erro ao listar recursos:", error);
            throw new Error("Erro ao listar recursos.");
        }
    }

    async visualizarRecursoPorId(idRecurso: number) {
        try {
            const recurso = await this.prisma.recurso.findUnique({
                where: { idRecurso }
            });
            return recurso;
        } catch (error) {
            console.error("Erro ao listar recurso:", error);
            throw new Error("Erro ao listar recurso.");
        }
    }

    async alterarStatusRecurso(idRecurso: number, status: boolean) {
        try {
            const recurso = await this.prisma.recurso.update({
                where: { idRecurso },
                data: { status }
            });
            return recurso;
        } catch (error) {
            console.error("Erro ao alterar status do recurso:", error);
            throw new Error("Erro ao alterar status do recurso.");
        }
    }
}

const recursoService = new RecursoServie(prisma);
export default recursoService;