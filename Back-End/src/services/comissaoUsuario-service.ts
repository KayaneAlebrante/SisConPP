import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ComissaoUsuarioService {
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

export default new ComissaoUsuarioService();
