import { PrismaClient } from "@prisma/client";

class FichaCandidatoService{
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async criarFichaCandidato(
        candidatoId: number,
        provaId: number,
        concursoId: number,
        categoriaId: number
        ){
        try{
            const fichaCandidato = await this.prisma.fichaCandidato.create({
                data: {
                    candidatoId,
                    provaId,
                    concursoId,
                    categoriaId,
                }
            });
            return fichaCandidato;
        }catch (error) {
            console.error("Erro ao criar ficha do candidato:", error);
            throw new Error("Erro ao criar ficha do candidato");
        }
    }
    
    async anexarProvaTeorica(
        idFicha: number,
        candidatoId: number,
        numAcertosProvaTeorica: number,
        anexoGabarito: Buffer,
        notaRedacao: number,
        anexoRedacao: Buffer,
    ){
        try{
            const fichaCandidato = await this.prisma.fichaCandidato.update({
                where: { 
                    idFicha: idFicha,
                    candidatoId: candidatoId 
                },
                data: {
                    numAcertosProvaTeorica,
                    anexoGabarito,
                    notaRedacao,
                    anexoRedacao
                }
            });
            return fichaCandidato;
        }catch (error) {
            console.error("Erro ao anexar prova teórica:", error);
            throw new Error("Erro ao anexar prova teórica");
        }
    }

    async anexarTermodeCiencia(
        idFicha: number,
        candidatoId: number,
        anexoTermodeCiencia: Buffer,
    ){
        try{
            const fichaCandidato = await this.prisma.fichaCandidato.update({
                where: { 
                    idFicha: idFicha,
                    candidatoId: candidatoId 
                },
                data: {
                    anexoTermodeCiencia,
                    dataTermo: new Date()
                }
            });
            return fichaCandidato;
        }catch (error) {
            console.error("Erro ao anexar termo de ciência:", error);
            throw new Error("Erro ao anexar termo de ciência");
        }
    }

    async somarNotas(
        idFicha: number,
        candidatoId: number,
        avaliacoes: number[],
        notaProvaTeorica: number,
        notaRedacao: number,
    ){
        try {
            const somaAvaliacoes = avaliacoes.reduce((acc, curr) => acc + curr, 0);
           
            const notaFinal = somaAvaliacoes + notaProvaTeorica + notaRedacao;
            
            const fichaCandidato = await this.prisma.fichaCandidato.update({
            where: { 
                idFicha: idFicha,
                candidatoId: candidatoId 
            },
            data: {
                notaCandidato: notaFinal,
            }
            });
            return fichaCandidato;
        } catch (error) {
            console.error("Erro ao somar notas:", error);
            throw new Error("Erro ao somar notas");
        }
        
    }
}