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

    async atualizarConcurso(
        idConcurso: number,
        data: {
            nomeConcurso: string,
            lancamentoEdital: Date,
            inscricoesInicio: Date,
            inscricoesFinal: Date,
            dataProvaEscrita: Date,
            dataProvasPraticas: Date,
            dataResultado: Date,
            local: string
        }
    ) {
        try {
            if (!idConcurso || isNaN(idConcurso)) {
                throw new Error("ID do concurso inválido.");
            }
    
            const dataAtualizada = {
                ...data,
                lancamentoEdital: new Date(data.lancamentoEdital),
                inscricoesInicio: new Date(data.inscricoesInicio),
                inscricoesFinal: new Date(data.inscricoesFinal),
                dataProvaEscrita: new Date(data.dataProvaEscrita),
                dataProvasPraticas: new Date(data.dataProvasPraticas),
                dataResultado: new Date(data.dataResultado),
            };
    
            const concurso = await this.prisma.concurso.update({
                where: { idConcurso },
                data: dataAtualizada,
            });

            console.log("Concurso alterado com sucesso.");
            return concurso;
        } catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao atualizar concurso. Verifique os dados fornecidos.");
        }
    }
    
}

const concursoService = new ConcursoService(prisma);
export default concursoService;