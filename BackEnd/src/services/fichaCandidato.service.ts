import { Avaliacao } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

class FichaCandidatoService {
    constructor(private prisma: PrismaClient) { }

    async criarFichaCandidato(
        candidatoId: number,
        notaCandidato: number,
        avaliacoes: Avaliacao[],
        provaId: number,
        concursoId: number,
        categoriaId: number,
    ) {

    }

    async cricarProvaPratica(
        avaliacoes: Avaliacao[],


    ){

    }

    async criarProvaTeorica(
        numAcertosProvaTeorica: number,
        anexoGabarito: Buffer,
        notaRedacao: number,
        anexoRedacao: Buffer,
        anexoProvaPratica: Buffer
    ) {

    }
}