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
const pessoa_service_1 = __importDefault(require("../services/pessoa.service"));
class PessoaController {
    criarPessoa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nomeCompleto, cidade, estado, CTGId, numCarteirinha } = req.body;
            if (!nomeCompleto || !cidade || !estado) {
                return res.status(400).json({ mensagem: "Nome completo, cidade e estado são obrigatórios." });
            }
            try {
                const pessoa = yield pessoa_service_1.default.prototype.criarPessoa(nomeCompleto, cidade, estado, CTGId, numCarteirinha);
                return res.status(201).json(pessoa);
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
    atualizarPessoa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
            }
            try {
                const pessoa = yield pessoa_service_1.default.prototype.atualizarPessoa(Number(id), data);
                return res.status(200).json(pessoa);
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
    buscarPessoaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const pessoa = yield pessoa_service_1.default.prototype.buscarPessoaPorId(Number(id));
                if (!pessoa) {
                    return res.status(404).json({ mensagem: "Pessoa não encontrada." });
                }
                return res.status(200).json(pessoa);
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
    buscarPessoas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pessoas = yield pessoa_service_1.default.prototype.buscarPessoas();
                return res.status(200).json(pessoas);
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
    deletarPessoa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPessoa } = req.params;
            try {
                yield pessoa_service_1.default.prototype.deletarPessoa(Number(idPessoa));
                return res.status(204).end();
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
exports.default = new PessoaController();
