import { AvaliacaoSubQuesito, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    }[]
}

export class AvaliacaoService {
    constructor(protected prisma: PrismaClient) { }

    async criarAvaliacaoCompleta(data: CriarAvaliacaoCompletaDTO) {
        return await this.prisma.$transaction(async (avaliacaoProva) => {

            const avaliacao = await avaliacaoProva.avaliacao.create({
                data: {
                    comissaoId: data.comissaoId,
                    avaliadorId: data.avaliadorId,
                    candidatoId: data.candidatoId,
                    blocoProvaId: data.blocoProvaId,
                    notaFinal: 0,
                },
            })

            let notaFinal = 0
            for (const quesito of data.quesitos) {

                let notaQuesito = 0
                for (const sub of quesito.subQuesitos) {
                    notaQuesito += sub.notaSubQuesito
                }
                console.log(notaQuesito);
                const avaliacaoQuesito = await avaliacaoProva.avaliacaoQuesito.create({
                    data: {
                        avaliacaoId: avaliacao.idAvalicao,
                        quesitoId: quesito.quesitoId,
                        comentario: quesito.comentario,
                        notaQuesito,
                    },
                })

                for (const sub of quesito.subQuesitos) {
                    await avaliacaoProva.avaliacaoSubQuesito.create({
                        data: {
                            avaliacaoQuesitoId: avaliacaoQuesito.idAvaliacaoQuesito,
                            subQuesitoId: sub.subQuesitoId,
                            notaSubQuesito: sub.notaSubQuesito,
                        },
                    })
                }
                notaFinal += notaQuesito
            }

            await avaliacaoProva.avaliacao.update({
                where: { idAvalicao: avaliacao.idAvalicao },
                data: { notaFinal },
            })

            return {
                ...avaliacao,
                notaFinal,
            }
        })
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
        console.log(candidato);

        const provasCategoria = await prisma.provaPratica.findMany({
            where: {
                categorias: {
                    some: { idCategoria: candidato.categoriaId },
                },
            },
        });

        console.log("Provas por categoria:", provasCategoria.length);

        const comissoes = await prisma.comissao.findMany({
            where: {
                usuarios: {
                    some: { usuarioId: avaliadorId },
                },
            },
        });

        console.log("Comissões do avaliador:", comissoes.length);

        const provasPorComissao = await prisma.provaPratica.findMany({
            where: {
                comissaoProvaPraticas: {
                    some: {
                        Comissao: {
                            usuarios: {
                                some: { usuarioId: avaliadorId},
                            },
                        },
                    },
                },
            },
        });

        console.log("Provas por comissão:", provasPorComissao.length);



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

        console.log(provaPratica);
        console.log(JSON.stringify(provaPratica, null, 2));

        return provaPratica;
    }
}

const avaliacao = new AvaliacaoService(prisma);
export default avaliacao;