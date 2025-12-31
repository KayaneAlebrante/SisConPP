import { AvaliacaoSubQuesito, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AvaliacaoService {
    constructor(protected prisma: PrismaClient) { }

    async criarAvaliacaoCompleta(data: CriarAvaliacaoCompletaDTO) {
        try {
            return await this.prisma.$transaction(async (avaliacaoProva) => {
                const avaliacaoExistente = await avaliacaoProva.avaliacao.findFirst({
                    where: {
                        avaliadorId: data.avaliadorId,
                        candidatoId: data.candidatoId,
                        blocoProvaId: data.blocoProvaId,
                    },
                });

                if (avaliacaoExistente) {
                    throw new Error(
                        "Já existe uma avaliação cadastrada para este avaliador e candidato."
                    );
                }

                const avaliacao = await avaliacaoProva.avaliacao.create({
                    data: {
                        comissaoId: data.comissaoId,
                        avaliadorId: data.avaliadorId,
                        candidatoId: data.candidatoId,
                        blocoProvaId: data.blocoProvaId,
                        notaFinal: 0,
                    },
                });

                let notaFinal = 0;

                for (const quesito of data.quesitos) {
                    let notaQuesito = 0;

                    for (const sub of quesito.subQuesitos) {
                        notaQuesito += sub.notaSubQuesito;
                    }

                    const avaliacaoQuesito = await avaliacaoProva.avaliacaoQuesito.create({
                        data: {
                            avaliacaoId: avaliacao.idAvalicao,
                            quesitoId: quesito.quesitoId,
                            comentario: quesito.comentario,
                            notaQuesito,
                        },
                    });

                    for (const sub of quesito.subQuesitos) {
                        await avaliacaoProva.avaliacaoSubQuesito.create({
                            data: {
                                avaliacaoQuesitoId: avaliacaoQuesito.idAvaliacaoQuesito,
                                subQuesitoId: sub.subQuesitoId,
                                notaSubQuesito: sub.notaSubQuesito,
                            },
                        });
                    }

                    notaFinal += notaQuesito;
                }

                await avaliacaoProva.avaliacao.update({
                    where: { idAvalicao: avaliacao.idAvalicao },
                    data: { notaFinal },
                });


                // await avaliacaoProva.fichaCandidato.update({
                //    where: {candidatoId: data.candidatoId },

                //     data: {
                //         notaFinalProvasPraticas: notaFinal,
                //         anexoProvaPratica: data.ficha.anexoProvaPratica
                //             ? new Uint8Array(data.ficha.anexoProvaPratica)
                //             : undefined,
                //         notaCandidato:
                //             (data.ficha.notaFinalProvasPraticas ?? 0) + notaFinal,
                //     },
                // });

                return {
                    ...avaliacao,
                    notaFinal,
                };
            });
        } catch (error) {
            console.error("Erro ao criar avaliação:", error);
            throw error;
        }
    }

    async editarAvaliacao(
        idAvalicao: number,
        avaliadorId: number,
        candidatoId: number,
    ) {
        try {
            const avaliacao = await this.prisma.avaliacao.update({
                where: { idAvalicao, candidatoId },
                data: { avaliadorId },
            });
            return avaliacao;
        } catch (error) {
            throw new Error(`Erro ao editar avaliação: ${error}`);
        }
    }

    async visualizarAvaliacoes(
        candidatoId: number,
    ) {
        try {
            const avaliacoes = await this.prisma.avaliacao.findMany({
                where: { candidatoId },
            });
            return avaliacoes;
        } catch (error) {
            throw new Error(`Erro ao visualizar avaliações: ${error}`);
        }
    }

    async buscarEstruturaCompleta(
        avaliadorId: number,
        candidatoId: number,
        provasSelecionadas?: number[]
    ) {
        const candidato = await this.prisma.candidato.findUnique({
            where: { idCandidato: candidatoId },
            include: { Categoria: true },
        });

        if (!candidato) throw new Error("Candidato não encontrado");

        const provaPratica = await this.prisma.provaPratica.findMany({
            where: {
                categorias: {
                    some: {
                        idCategoria: candidato.categoriaId,
                    },
                },
                comissaoProvaPraticas: {
                    some: {
                        Comissao: {
                            usuarios: {
                                some: {
                                    usuarioId: avaliadorId,
                                },
                            },
                        },
                    },
                },
                ...(provasSelecionadas?.length && {
                    idProvaPratica: {
                        in: provasSelecionadas,
                    },
                }),
            },
            include: {
                blocosProvas: {
                    include: {
                        quesitos: {
                            include: {
                                subQuesitos: true,
                            },
                        },
                    },
                },
            },
        });

        return provaPratica;
    }

    async criarAvaliacaoTeorica(data: CriarAvaliacaoTeoricaDTO) {
        return this.prisma.$transaction(async (prisma) => {

            const existente = await prisma.avaliacao.findFirst({
                where: {
                    candidatoId: data.candidatoId,
                    provaTeoricaId: data.provaTeoricaId,
                },
            });

            if (existente) {
                throw new Error("Já existe uma avaliação teórica cadastrada para este candidato.");
            }

            const avaliacao = await prisma.avaliacao.create({
                data: {
                    avaliadorId: 1,
                    candidatoId: data.candidatoId,
                    provaTeoricaId: data.provaTeoricaId,
                    notaFinal: 0,
                },
            });

            // 🔹 CRIA QUESITOS E SUBQUESITOS
            for (const quesito of data.quesitos) {

                let notaQuesitoFinal = quesito.notaQuesito ?? 0;

                const avaliacaoQuesito = await prisma.avaliacaoQuesito.create({
                    data: {
                        avaliacaoId: avaliacao.idAvalicao,
                        quesitoId: quesito.quesitoId,
                        notaQuesito: notaQuesitoFinal,
                        comentario: quesito.comentario ?? null,
                    },
                });

                if (quesito.subQuesitos?.length) {
                    notaQuesitoFinal = 0;

                    for (const sub of quesito.subQuesitos) {
                        notaQuesitoFinal += sub.notaSubQuesito;

                        await prisma.avaliacaoSubQuesito.create({
                            data: {
                                avaliacaoQuesitoId: avaliacaoQuesito.idAvaliacaoQuesito,
                                subQuesitoId: sub.subQuesitoId,
                                notaSubQuesito: sub.notaSubQuesito,
                            },
                        });
                    }

                    await prisma.avaliacaoQuesito.update({
                        where: { idAvaliacaoQuesito: avaliacaoQuesito.idAvaliacaoQuesito },
                        data: { notaQuesito: notaQuesitoFinal },
                    });
                }
            }

            // 🔹 BUSCA A SOMA REAL DOS QUESITOS DA AVALIAÇÃO
            const somaQuesitos = await prisma.avaliacaoQuesito.aggregate({
                where: {
                    avaliacaoId: avaliacao.idAvalicao,
                },
                _sum: {
                    notaQuesito: true,
                },
            });

            const notaFinalProvaTeorica = somaQuesitos._sum.notaQuesito ?? 0;

            // 🔹 ATUALIZA AVALIAÇÃO
            await prisma.avaliacao.update({
                where: { idAvalicao: avaliacao.idAvalicao },
                data: { notaFinal: notaFinalProvaTeorica },
            });

            // 🔹 ATUALIZA FICHA DO CANDIDATO (APÓS BUSCAR)
            await prisma.fichaCandidato.update({
                where: { idFicha: data.ficha.idFicha },
                data: {
                    notaFinalProvaTeorica,
                    anexoGabarito: data.ficha.anexoGabarito ? new Uint8Array(data.ficha.anexoGabarito) : undefined,
                    anexoRedacao: data.ficha.anexoRedacao ? new Uint8Array(data.ficha.anexoRedacao) : undefined
                },
            });

            return {
                message: "Avaliação teórica criada com sucesso",
                notaFinalProvaTeorica,
            };
        });
    }


    async buscarEstruturaTeorica(candidatoId: number) {
        const candidato = await this.prisma.candidato.findUnique({
            where: { idCandidato: candidatoId },
            include: { Categoria: true },
        });

        if (!candidato) throw new Error("Candidato não encontrado");

        const provasTeoricas = await this.prisma.provaTeorica.findMany({
            where: {
                categorias: {
                    some: {
                        idCategoria: candidato.categoriaId
                    },
                },
            },
            include: {
                quesitos: {
                    include: {
                        subQuesitos: true,
                    },
                },
            },
        });

        console.log(provasTeoricas);
        return provasTeoricas;
    }

}

type CriarAvaliacaoCompletaDTO = {
    comissaoId: number
    avaliadorId: number
    candidatoId: number
    blocoProvaId?: number
    quesitos: {
        quesitoId: number
        comentario?: string
        subQuesitos: {
            subQuesitoId: number
            notaSubQuesito: number
        }[]
    }[];
}

type CriarAvaliacaoTeoricaDTO = {
    candidatoId: number;
    provaTeoricaId: number;

    quesitos: {
        quesitoId: number;
        notaQuesito: number;
        comentario?: string;
        subQuesitos?: {
            subQuesitoId: number;
            notaSubQuesito: number;
        }[];
    }[];

    ficha: {
        idFicha: number;
        concursoId: number;
        notaFinalProvaTeorica: number;
        anexoGabarito?: Buffer;
        anexoRedacao?: Buffer;
    };
}

const avaliacao = new AvaliacaoService(prisma);
export default avaliacao;