"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ComissaoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    criarComissao(nomeComissao, concursoId, avaliacoes, usuarios) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comissao = yield this.prisma.comissao.create({
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
            }
            catch (error) {
                console.error("Erro ao criar comissão:", error);
                throw new Error("Erro ao criar comissão. Verifique os dados fornecidos.");
            }
        });
    }
    atualizarComissao(comissaoId, dadosAtualizados) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comissao = yield this.prisma.comissao.update({
                    where: { idComissao: comissaoId },
                    data: dadosAtualizados,
                });
                return comissao;
            }
            catch (error) {
                console.error("Erro ao editar comissão:", error);
                throw new Error("Erro ao editar comissão. Verifique os dados fornecidos.");
            }
        });
    }
    buscarComissaoPorId(idComissao) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comissao = yield this.prisma.comissao.findUnique({
                    where: { idComissao: idComissao }
                });
                return comissao;
            }
            catch (error) {
                console.error("Erro ao visualizar comissão:", error);
                throw new Error("Erro ao visualizar comissão. Verifique os dados fornecidos.");
            }
        });
    }
    buscarTodasComissoes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comissoes = yield this.prisma.comissao.findMany();
                return comissoes;
            }
            catch (error) {
                console.error("Erro ao consultar comissões:", error);
                throw new Error("Erro ao consultar comissões.");
            }
        });
    }
    deletarComissao(comissaoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.comissao.delete({
                    where: { idComissao: comissaoId },
                });
                return { message: "Comissão deletada com sucesso." };
            }
            catch (error) {
                console.error("Erro ao deletar comissão:", error);
                throw new Error("Erro ao deletar comissão. Verifique os dados fornecidos.");
            }
        });
    }
    createComissaoUsuario(usuarioId, comissaoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.comissaoUsuario.create({
                data: {
                    usuarioId: usuarioId,
                    comissaoId: comissaoId,
                },
            });
        });
    }
    listComissaoUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.comissaoUsuario.findMany();
        });
    }
    adicionarUsuarioComissao(usuarioId, comissaoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield prisma.usuario.findUnique({
                where: { idUsuario: usuarioId },
            });
            if (!usuario) {
                throw new Error("Usuário não encontrado");
            }
            if (usuario.funcao !== "AVALIADOR") {
                throw new Error("Usuário não é um Avaliador");
            }
            return yield this.createComissaoUsuario(usuarioId, comissaoId);
        });
    }
    adicionarAuxiliarComissao(usuarioId, comissaoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield prisma.usuario.findUnique({
                where: { idUsuario: usuarioId },
            });
            if (!usuario) {
                throw new Error("Usuário não encontrado");
            }
            if (usuario.funcao !== "AUXILIAR") {
                throw new Error("Usuário não é um Auxiliar");
            }
            return yield this.createComissaoUsuario(usuarioId, comissaoId);
        });
    }
    deletarUsuarioComissao(usuarioId, comissaoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comissaoUsuario = yield prisma.comissaoUsuario.findFirst({
                where: {
                    usuarioId: usuarioId,
                    comissaoId: comissaoId,
                },
            });
            if (!comissaoUsuario) {
                throw new Error("Usuário não encontrado na comissão");
            }
            return yield prisma.comissaoUsuario.delete({
                where: {
                    idComissaoUsuario: comissaoUsuario.idComissaoUsuario,
                },
            });
        });
    }
}
const comissaoService = new ComissaoService(prisma);
exports.default = comissaoService;
