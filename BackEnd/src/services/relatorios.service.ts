import { PrismaClient, FichaCandidato, SubQuesitos, Avaliacao, AvaliacaoQuesito, BlocoProva } from "@prisma/client";

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

    async gerarRelatorioIndividualDetalhado(candidatoId: number) {
        const avaliacoes = await this.prisma.avaliacao.findMany({
            where: { candidatoId },
            include: {
                Usuario: {
                    select: {
                        idUsuario: true,
                        nomeCompleto: true,
                    },
                },
                quesitosAvaliados: {
                    include: {
                        Quesito: {
                            include: {
                                BlocoProva: true,
                            },
                        },
                        subQuesitosAvaliados: {
                            include: {
                                SubQuesito: true,
                            },
                        },
                    },
                },
            },
        });

        const avaliadoresMap = new Map<
            number,
            {
                nomeAvaliador: string;
                blocos: Map<
                    number,
                    {
                        nomeBloco: string;
                        quesitos: Map<
                            number,
                            {
                                nomeQuesito: string;
                                notaQuesito: number;
                                comentario: string | null;
                                subquesitos: {
                                    nomeSubQuesito: string;
                                    nota: number;
                                }[];
                            }
                        >;
                        totalBloco: number;
                    }
                >;
                totalAvaliador: number;
            }
        >();

        let totalFinal = 0;

        for (const avaliacao of avaliacoes) {
            // 🔹 Caso seja Prova Teórica
            if (avaliacao.provaTeoricaId) {
                const idAvaliador = -1; // identificador especial
                if (!avaliadoresMap.has(idAvaliador)) {
                    avaliadoresMap.set(idAvaliador, {
                        nomeAvaliador: "Prova Teórica",
                        blocos: new Map(),
                        totalAvaliador: 0,
                    });
                }

                const avaliador = avaliadoresMap.get(idAvaliador)!;

                if (!avaliador.blocos.has(avaliacao.provaTeoricaId)) {
                    avaliador.blocos.set(avaliacao.provaTeoricaId, {
                        nomeBloco: "Prova Teórica",
                        quesitos: new Map(),
                        totalBloco: 0,
                    });
                }

                const blocoMap = avaliador.blocos.get(avaliacao.provaTeoricaId)!;

                for (const aq of avaliacao.quesitosAvaliados) {
                    const temNota = aq.notaQuesito !== null && aq.notaQuesito > 0;
                    const temSubquesitos = aq.subQuesitosAvaliados?.length > 0;
                    if (!temNota && !temSubquesitos) continue;

                    const subquesitos =
                        aq.subQuesitosAvaliados?.map((sq) => ({
                            nomeSubQuesito: sq.SubQuesito?.nomeSubquesito ?? "",
                            nota: sq.notaSubQuesito ?? 0,
                        })) ?? [];

                    blocoMap.quesitos.set(aq.Quesito.idQuesito, {
                        nomeQuesito: aq.Quesito.nomeQuesito,
                        notaQuesito: aq.notaQuesito,
                        comentario: aq.comentario ?? null,
                        subquesitos,
                    });

                    blocoMap.totalBloco += aq.notaQuesito ?? 0;
                    avaliador.totalAvaliador += aq.notaQuesito ?? 0;
                    totalFinal += aq.notaQuesito ?? 0;
                }

                continue;
            }

            // 🔹 Avaliações normais (avaliadores humanos)
            const idAvaliador = avaliacao.Usuario.idUsuario;

            if (!avaliadoresMap.has(idAvaliador)) {
                avaliadoresMap.set(idAvaliador, {
                    nomeAvaliador: avaliacao.Usuario.nomeCompleto,
                    blocos: new Map(),
                    totalAvaliador: 0,
                });
            }

            const avaliador = avaliadoresMap.get(idAvaliador)!;

            for (const aq of avaliacao.quesitosAvaliados) {
                const quesito = aq.Quesito;
                const bloco = quesito?.BlocoProva;
                if (!quesito || !bloco) continue;

                // 🔹 Filtra quesitos sem nota e sem subquesitos
                const temNota = aq.notaQuesito !== null && aq.notaQuesito > 0;
                const temSubquesitos = aq.subQuesitosAvaliados?.length > 0;
                if (!temNota && !temSubquesitos) continue;

                if (!avaliador.blocos.has(bloco.idBloco)) {
                    avaliador.blocos.set(bloco.idBloco, {
                        nomeBloco: bloco.nomeBloco,
                        quesitos: new Map(),
                        totalBloco: 0,
                    });
                }

                const blocoMap = avaliador.blocos.get(bloco.idBloco)!;
                const subquesitos =
                    aq.subQuesitosAvaliados?.map((sq) => ({
                        nomeSubQuesito: sq.SubQuesito?.nomeSubquesito ?? "",
                        nota: sq.notaSubQuesito ?? 0,
                    })) ?? [];

                blocoMap.quesitos.set(quesito.idQuesito, {
                    nomeQuesito: quesito.nomeQuesito,
                    notaQuesito: aq.notaQuesito,
                    comentario: aq.comentario ?? null,
                    subquesitos,
                });

                blocoMap.totalBloco += aq.notaQuesito ?? 0;
                avaliador.totalAvaliador += aq.notaQuesito ?? 0;
                totalFinal += aq.notaQuesito ?? 0;
            }
        }

        const ficha = await this.prisma.fichaCandidato.findUnique({
            where: { candidatoId },
            include: {
                Candidato: {
                    select: {
                        idCandidato: true,
                        nomeCompleto: true,
                        Categoria: { select: { nomeCategoria: true } },
                        Concurso: { select: { nomeConcurso: true } },
                    },
                },
                Concurso: {
                    select: { nomeConcurso: true },
                },
            },
        });

        return {
            candidatoId,
            nomeCandidato: ficha?.Candidato.nomeCompleto,
            categoria: ficha?.Candidato.Categoria.nomeCategoria,
            concurso: ficha?.Concurso.nomeConcurso,
            notaCandidato: ficha?.notaCandidato,
            avaliadores: Array.from(avaliadoresMap.values())
                .sort((a, b) => a.nomeAvaliador.localeCompare(b.nomeAvaliador))
                .map((av) => ({
                    nomeAvaliador: av.nomeAvaliador,
                    blocos: Array.from(av.blocos.values())
                        .sort((a, b) => a.nomeBloco.localeCompare(b.nomeBloco))
                        .map((bl) => ({
                            nomeBloco: bl.nomeBloco,
                            quesitos: Array.from(bl.quesitos.values()).sort((a, b) =>
                                a.nomeQuesito.localeCompare(b.nomeQuesito)
                            ),
                            totalBloco: bl.totalBloco,
                        })),
                    totalAvaliador: av.totalAvaliador,
                })),
            totalFinal,
        };
    }

    async gerarRelatorioPorCategoriaConcurso(
        categoriaId: number,
        concursoIdConcurso: number
    ): Promise<(CandidatoResumo & { posicao: number })[]> {
        const candidatos = await prisma.candidato.findMany({
            where: { categoriaId, concursoIdConcurso },
            include: {
                Categoria: true,
                Concurso: true,
                CTG: true,
                fichaCandidato: true,
                avalicoes: {
                    include: {
                        Usuario: true,
                        ProvaPratica: true,
                        BlocoProva: true,
                        quesitosAvaliados: true,
                    },
                },
            },
        });

        // monta o relatório candidato por candidato
        const relatorio: CandidatoResumo[] = candidatos.map((c) => {
            const notaTeorica = c.fichaCandidato?.notaFinalProvaTeorica ?? 0;

            const avaliadores: AvaliadorResumo[] = (c.avalicoes ?? [])
                .filter((av: Avaliacao) => av.provaPraticaId !== null || av.blocoProvaId !== null)
                .map(
                    (
                        av: Avaliacao & {
                            Usuario: { nomeCompleto: string };
                            BlocoProva: BlocoProva | null;
                            quesitosAvaliados: AvaliacaoQuesito[];
                        }
                    ) => {
                        const nomeAvaliador = av.Usuario?.nomeCompleto ?? "—";
                        const nomeBloco = av.BlocoProva?.nomeBloco ?? "Bloco não informado";

                        const notaFinalBloco = (av.quesitosAvaliados ?? []).reduce(
                            (acc: number, q: AvaliacaoQuesito) => acc + (q.notaQuesito ?? 0),
                            0
                        );

                        const blocos: BlocoResumo[] = [{ nomeBloco, notaFinalBloco }];
                        const totalAvaliador = blocos.reduce((acc: number, b: BlocoResumo) => acc + b.notaFinalBloco, 0);

                        return { nomeAvaliador, blocos, totalAvaliador };
                    }
                );

            const notaPratica = avaliadores.reduce((acc: number, a: AvaliadorResumo) => acc + a.totalAvaliador, 0);
            const notaFinal = notaTeorica + notaPratica;

            return {
                candidatoId: c.idCandidato,
                nomeCandidato: c.nomeCompleto,
                CTG: c.CTG.nomeCTG,
                categoria: c.Categoria?.nomeCategoria ?? "",
                concurso: c.Concurso?.nomeConcurso ?? "",
                notaProvaTeorica: notaTeorica,
                notaProvasPraticas: notaPratica,
                notaFinal,
                avaliadores,
            };
        });

        const ordenado = relatorio.sort((a: CandidatoResumo, b: CandidatoResumo) => b.notaFinal - a.notaFinal);
        return ordenado.map((c: CandidatoResumo, idx: number) => ({ ...c, posicao: idx + 1 }));
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

export interface RelatorioIndividualDTO {
    candidatoId: number;
    avaliadores: {
        nomeAvaliador: string;
        blocos: {
            nomeBloco: string;
            quesitos: {
                nomeQuesito: string;
                notaQuesito: number;
                comentario: string | null;
                subquesitos: {
                    nomeSubQuesito: string;
                    nota: number;
                }[];
            }[];
            totalBloco: number;
        }[];
        totalAvaliador: number;
    }[];
    totalFinal: number;
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

export interface BlocoResumo {
    nomeBloco: string;
    notaFinalBloco: number;
}

export interface AvaliadorResumo {
    nomeAvaliador: string;
    blocos: BlocoResumo[];
    totalAvaliador: number;
}

export interface CandidatoResumo {
    candidatoId: number;
    nomeCandidato: string;
    CTG: string;
    categoria: string;
    concurso: string;
    notaProvaTeorica: number;
    notaProvasPraticas: number;
    notaFinal: number;
    avaliadores: AvaliadorResumo[];
}