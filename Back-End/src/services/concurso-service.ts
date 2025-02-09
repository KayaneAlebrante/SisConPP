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

    async buscarConcursoPorId(idConcurso: number){
        try{
            const concurso = await this.prisma.concurso.findUnique({
                where: { idConcurso: idConcurso }
            });
            return concurso;
        }catch(error){
            throw new Error("Erro ao buscar Concurso.");
        }
    }

    async buscarConcursos(){
        try{
            const concursos = await this.prisma.concurso.findMany();
            return concursos;
        }catch(erro){
            throw new Error("Erro ao buscar concursos");
        }
    }

    async deletarConcuro(idConcurso: number){
        try{
            console.log("IdConcurso", idConcurso);

            const concurso = await this.prisma.concurso.findUnique({
                where: { idConcurso }
            });

            if(!concurso){
                throw new Error("Concurso não encontrado.");
            }

            await this.prisma.concurso.delete({
                where: { idConcurso },
            });

            return { mensagem: "Concurso deletado com sucesso." };
        }catch(error){
            console.error(error);
            throw new Error("Erro ao deletar concurso.");

        }
    }

    async buscarCandidatosConcurso(idConcurso: number) {
        try {
            if (!idConcurso || isNaN(idConcurso)) {
                throw new Error("ID do concurso inválido.");
            }
    
            const candidatos = await this.prisma.candidato.findMany({
                where: { concursoId: idConcurso },
            });
    
            return candidatos;
        } catch (error) {
            console.error("Erro ao buscar candidatos do concurso:", error);
            throw new Error("Erro ao buscar candidatos do concurso.");
        }
    }
    
    
    async anexarEdital(idConcurso: number, editalAnexo: Partial<{ anexarEdital: Buffer }>) {
        try {
            const concurso = await prisma.concurso.update({
                where: { idConcurso },
                data: { anexoEdital: editalAnexo.anexarEdital }
            });
            return concurso;
        } catch (error) {
        throw new Error("Erro ao anexar Edital: " + error);
        }
    }   

}

const concursoService = new ConcursoService(prisma);
export default concursoService;