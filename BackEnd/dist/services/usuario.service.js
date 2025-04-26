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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pessoa_service_1 = __importDefault(require("./pessoa.service"));
const prisma = new client_1.PrismaClient();
class UsuarioService extends pessoa_service_1.default {
    constructor(prisma) {
        super(prisma);
    }
    criarUsuario(nomeCompleto, cidade, estado, CTGId, numCarteirinha, login, senha, funcao, concursoId, comissaoIdUsuario, numCredenciamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const pessoaId = yield this.criarPessoa(nomeCompleto, cidade, estado, CTGId, numCarteirinha);
            const pessoaExistente = yield this.prisma.pessoa.findUnique({
                where: { idPessoa: pessoaId.idPessoa },
                include: { Usuario: true, Candidato: true },
            });
            if ((pessoaExistente === null || pessoaExistente === void 0 ? void 0 : pessoaExistente.Usuario) || (pessoaExistente === null || pessoaExistente === void 0 ? void 0 : pessoaExistente.Candidato)) {
                throw new Error("Esta pessoa já está associada a um usuário ou candidato.");
            }
            try {
                const usuario = yield this.prisma.usuario.create({
                    data: {
                        login,
                        senha,
                        funcao,
                        pessoaId: pessoaId.idPessoa,
                        concursoId: concursoId,
                        comissaoUsuarioId: comissaoIdUsuario,
                        numCredenciamento: numCredenciamento,
                    },
                });
                return { usuario, pessoaId };
            }
            catch (error) {
                console.error("Erro detalhado:", error);
                throw new Error("Erro ao criar usuário com pessoa. Verifique os dados fornecidos.");
            }
        });
    }
    atualizarUsuario(idUsuario, data, pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.prisma.usuario.update({
                    where: { idUsuario },
                    data,
                    include: { Pessoa: true },
                });
                console.log(data);
                if (pessoaData && usuario.pessoaId) {
                    const pessoa = yield this.atualizarPessoa(usuario.pessoaId, pessoaData);
                    return { usuario, pessoa };
                }
                return usuario;
            }
            catch (error) {
                console.error(error);
                throw new Error("Erro ao atualizar usuário com pessoa. Verifique os dados fornecidos.");
            }
        });
    }
    listarUsuariosAvaliadores() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield this.prisma.usuario.findMany({
                    where: { funcao: client_1.Funcao.AVALIADOR },
                    include: { Pessoa: true },
                });
                return usuarios;
            }
            catch (error) {
                console.error(error);
                throw new Error("Erro ao listar usuários avaliadores.");
            }
        });
    }
    ;
    listarUsuariosSecretarios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield this.prisma.usuario.findMany({
                    where: { funcao: client_1.Funcao.SECRETARIO },
                    include: { Pessoa: true },
                });
                return usuarios;
            }
            catch (error) {
                console.error(error);
                throw new Error("Erro ao listar usuários secretários.");
            }
        });
    }
    listarUsuariosAuxiliares() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield this.prisma.usuario.findMany({
                    where: { funcao: client_1.Funcao.AUXILIAR },
                    include: { Pessoa: true },
                });
                return usuarios;
            }
            catch (error) {
                console.error(error);
                throw new Error("Erro ao listar usuários auxiliares.");
            }
        });
    }
    buscarUsuarioPorId(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Usuario = yield this.prisma.usuario.findUnique({
                    where: { idUsuario: idUsuario },
                });
                return Usuario;
            }
            catch (error) {
                throw new Error("Erro ao buscar usuário.");
            }
        });
    }
    buscarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Usuarios = yield this.prisma.usuario.findMany();
                return Usuarios;
            }
            catch (error) {
                throw new Error("Erro ao buscar usuários.");
            }
        });
    }
    deletarUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("IdUsuario:", idUsuario);
                const usuario = yield this.prisma.usuario.findUnique({
                    where: { idUsuario },
                    include: { Pessoa: true },
                });
                if (!usuario) {
                    throw new Error("Usuário não encontrado.");
                }
                const idPessoa = usuario.pessoaId;
                yield this.prisma.usuario.delete({
                    where: { idUsuario },
                });
                if (idPessoa) {
                    yield this.deletarPessoa(idPessoa);
                    console.log("Pessoa Deletada com Sucesso!");
                }
                return { mensagem: "Usuário deletado com sucesso." };
            }
            catch (error) {
                console.error(error);
                throw new Error("Erro ao deletar usuário.");
            }
        });
    }
}
const usuarioService = new UsuarioService(prisma);
exports.default = usuarioService;
