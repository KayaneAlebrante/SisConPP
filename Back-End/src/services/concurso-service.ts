import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

class ConcursoService{
    constructor(protected prisma: PrismaClient){}

    async criarConcurso(
        nomeConcurso: string,
        lancamentoEdital: Date,
        inscricoesInicio: Date,
        inscricoesFinal: Date,
        dataProvaEscrita: Date,
        dataProvasPraticas: Date,
        dataResultado: Date,
        local: string
    ) {
        try {
            const concurso = await this.prisma.concurso.create({
                data: {
                    nomeConcurso,
                    lancamentoEdital: new Date(lancamentoEdital),
                    inscricoesInicio: new Date(inscricoesInicio),
                    inscricoesFinal: new Date(inscricoesFinal),
                    dataProvaEscrita: new Date(dataProvaEscrita),
                    dataProvasPraticas: new Date(dataProvasPraticas),
                    dataResultado: new Date(dataResultado),
                    local,
                },
            });
    
            console.log("Concurso criado com sucesso.");
            return concurso;
        } catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao criar Concurso. Verifique os dados fornecidos.");
        }
    }    
}

const concursoService = new ConcursoService(prisma);
export default concursoService;