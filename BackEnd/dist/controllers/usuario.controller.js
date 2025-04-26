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
const usuario_service_1 = __importDefault(require("../services/usuario.service"));
class UsuarioController {
    criarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nomeCompleto, cidade, estado, CTGId, numCarteirinha, login, senha, funcao, concursoId, comissaoIdUsuario, numCredenciamento } = req.body;
            if (!login || !senha || !funcao || !CTGId) {
                return res.status(400).json({ mensagem: "Login, senha, função e CTG são obrigatórios." });
            }
            try {
                const Usuario = yield usuario_service_1.default.criarUsuario(nomeCompleto, cidade, estado, CTGId, numCarteirinha, login, senha, funcao, concursoId, comissaoIdUsuario, numCredenciamento);
                return res.status(201).json(Usuario);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Erro ao Criar Usuario: ", error);
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(400).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
    atualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
            }
            try {
                const { nomeCompleto, cidade, estado, CTGId, numCarteirinha, login, senha, funcao, numCredenciamento, concursoId, comissaoIdUsuario } = data;
                const userData = { login, senha, funcao, numCredenciamento, comissaoIdUsuario, concursoId };
                const pessoaData = { nomeCompleto, cidade, estado, CTGId, numCarteirinha };
                const Usuario = yield usuario_service_1.default.atualizarUsuario(Number(id), userData, pessoaData);
                return res.status(200).json(Usuario);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(400).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
    buscarUsuarioPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const Usuario = yield usuario_service_1.default.buscarUsuarioPorId(Number(id));
                if (!Usuario) {
                    return res.status(404).json({ mensagem: "Usuário não encontrado." });
                }
                return res.status(200).json(Usuario);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(400).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
    buscarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Usuarios = yield usuario_service_1.default.buscarUsuarios();
                return res.status(200).json(Usuarios);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(400).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
    buscarUsuariosAvaliadores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const avaliadores = yield usuario_service_1.default.listarUsuariosAvaliadores();
                res.status(200).json(avaliadores);
            }
            catch (error) {
                console.error('Erro ao buscar avaliadores:', error);
                res.status(500).json({ error: 'Erro ao buscar avaliadores' });
            }
        });
    }
    buscarUsuariosAuxiliares(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Usuarios = yield usuario_service_1.default.listarUsuariosAuxiliares;
                return res.status(200).json(Usuarios);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(400).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
    buscarUsuariosSecretarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Usuarios = yield usuario_service_1.default.listarUsuariosSecretarios;
                return res.status(200).json(Usuarios);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(400).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
    deletarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield usuario_service_1.default.deletarUsuario(Number(id));
                return res.status(204).send();
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(400).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
}
exports.default = new UsuarioController();
