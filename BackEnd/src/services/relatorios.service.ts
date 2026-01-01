import { PrismaClient, FichaCandidato } from "@prisma/client";

const prisma = new PrismaClient();

export class RelatoriosService {
    constructor(protected prisma: PrismaClient) { }

    async relatorioGeralPorConcurso(
        concursoId: number
    ): Promise<RelatorioGeralCandidatoDTO[]> {

        const fichas = await prisma.fichaCandidato.findMany({
            where: {
                concursoId,
            },
            include: {
                Candidato: {
                    include: {
                        Categoria: true,
                    },
                },
                Concurso: true,
            },
            orderBy: [
                {
                    Candidato: {
                        Categoria: {
                            nomeCategoria: "asc",
                        },
                    },
                },
                {
                    notaCandidato: "desc",
                },
            ],
        });

        return fichas.map((ficha) => ({
            candidatoId: ficha.candidatoId,
            nomeCandidato: ficha.Candidato.nomeCompleto,
            categoria: ficha.Candidato.Categoria.nomeCategoria,
            concurso: ficha.Concurso.nomeConcurso,
            notaProvaTeorica: ficha.notaFinalProvaTeorica ?? 0,
            notaProvasPraticas: ficha.notaFinalProvasPraticas ?? 0,
            notaFinal: ficha.notaCandidato ?? 0,
        }));
    }

    async rankingPorCategoria(
        concursoId: number,
        categoriaId: number
    ): Promise<RelatorioAvaliacaoDTO[]> {

        const fichas = await prisma.fichaCandidato.findMany({
            where: {
                concursoId,
                Candidato: {
                    categoriaId,
                },
            },
            include: {
                Candidato: {
                    include: {
                        Categoria: true,
                    },
                },
                Concurso: true,
            },
            orderBy: {
                notaCandidato: "desc",
            },
        });

        let classificacao = 1;
        let ultimaNota: number | null = null;

        return fichas.map((ficha, index) => {
            if (ultimaNota !== ficha.notaCandidato) {
                classificacao = index + 1;
                ultimaNota = ficha.notaCandidato;
            }

            return {
                candidatoId: ficha.candidatoId,
                nomeCandidato: ficha.Candidato.nomeCompleto,
                concurso: ficha.Concurso.nomeConcurso,
                categoria: ficha.Candidato.Categoria.nomeCategoria,
                notaFinal: ficha.notaCandidato ?? 0,
                classificacao,
            };
        });
    }
}

const relatorios = new RelatoriosService(prisma);
export default relatorios;

interface RelatorioAvaliacaoDTO {
    candidatoId: number;
    nomeCandidato: string;
    concurso: string;
    categoria: string;
    notaFinal: number;
    classificacao: number;
}

export interface RelatorioGeralCandidatoDTO {
    candidatoId: number;
    nomeCandidato: string;
    categoria: string;
    concurso: string;
    notaProvaTeorica: number;
    notaProvasPraticas: number;
    notaFinal: number;
}