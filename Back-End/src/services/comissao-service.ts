import { PrismaClient, Avaliacao, ComissaoUsuario } from "@prisma/client";
import ComissaoUsuarioService from "./comissaoUsuario-service";

const prisma = new PrismaClient();

class ComissaoService {
    constructor(private prisma: PrismaClient) {}

    async criarComissao(
        nomeComissao: string,
        concursoId: number,
        avaliacoes: Avaliacao[],
        usuarios: ComissaoUsuario[]
    ) {
        try {
            const comissao = await this.prisma.comissao.create({
                data: {
                    nomeComissao: nomeComissao,
                    concursoId: concursoId,
                    avalicao: {
                        create: avaliacoes,
                    },
                    usuarios: {
                        create: usuarios,
                    },
                },
            });

            return comissao;
        } catch (error) {
            console.error("Erro ao criar comissão:", error);
            throw new Error("Erro ao criar comissão. Verifique os dados fornecidos.");
        }
    }

    async atualizarComissao(comissaoId: number, dadosAtualizados: any) {
        try {
            const comissao = await this.prisma.comissao.update({
                where: { idComissao: comissaoId },
                data: dadosAtualizados,
            });
            return comissao;
        } catch (error) {
            console.error("Erro ao editar comissão:", error);
            throw new Error("Erro ao editar comissão. Verifique os dados fornecidos.");
        }
    }

    async buscarComissaoPorId(idComissao: number) {
        try {
            const comissao = await this.prisma.comissao.findUnique({
                where: { idComissao: idComissao }
            });

            return comissao;
        } catch (error) {
            console.error("Erro ao visualizar comissão:", error);
            throw new Error("Erro ao visualizar comissão. Verifique os dados fornecidos.");
        }
    }

    async buscarTodasComissoes() {
        try {
            const comissoes = await this.prisma.comissao.findMany();
            return comissoes;
        } catch (error) {
            console.error("Erro ao consultar comissões:", error);
            throw new Error("Erro ao consultar comissões.");
        }
    }

    async deletarComissao(comissaoId: number) {
        try {
            await this.prisma.comissao.delete({
                where: { idComissao: comissaoId },
            });
            return { message: "Comissão deletada com sucesso." };
        } catch (error) {
            console.error("Erro ao deletar comissão:", error);
            throw new Error("Erro ao deletar comissão. Verifique os dados fornecidos.");
        }
    }

    async createComissaoUsuario(usuarioId: number, comissaoId: number) {
        return await prisma.comissaoUsuario.create({
            data: {
                usuarioId: usuarioId,
                comissaoId: comissaoId,
            },
        });
    }

    async listComissaoUsuarios() {
        return await prisma.comissaoUsuario.findMany();
    }

    async adicionarUsuarioComissao(usuarioId: number, comissaoId: number) {
        const usuario = await prisma.usuario.findUnique({
            where: { idUsuario: usuarioId },
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        if (usuario.funcao !== "AVALIADOR") {
            throw new Error("Usuário não é um Avaliador");
        }

        return await this.createComissaoUsuario(usuarioId, comissaoId);
    }

    async adicionarAuxiliarComissao(usuarioId: number, comissaoId: number) {
        const usuario = await prisma.usuario.findUnique({
            where: { idUsuario: usuarioId },
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        if (usuario.funcao !== "AUXILIAR") {
            throw new Error("Usuário não é um Auxiliar");
        }

        return await this.createComissaoUsuario(usuarioId, comissaoId);
    }

    async deletarUsuarioComissao(usuarioId: number, comissaoId: number) {
        const comissaoUsuario = await prisma.comissaoUsuario.findFirst({
            where: {
                usuarioId: usuarioId,
                comissaoId: comissaoId,
            },
        });

        if (!comissaoUsuario) {
            throw new Error("Usuário não encontrado na comissão");
        }

        return await prisma.comissaoUsuario.delete({
            where: {
                idComissaoUsuario: comissaoUsuario.idComissaoUsuario,
            },
        });
    }
    
}

const comissaoService = new ComissaoService(prisma);
export default comissaoService;
