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
const subquesito_service_1 = __importDefault(require("../services/subquesito.service"));
class SubquesitoController {
    criarsubQuesitos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nomeSubquesito, notaSubequesito, quesitoId } = req.body;
            if (!nomeSubquesito || !notaSubequesito || !quesitoId) {
                return res.status(400).json({ mensagem: "Nome do Subquesito, Nota do Subquesito e ID do Quesito são obrigatórios." });
            }
            try {
                const subquesito = yield subquesito_service_1.default.criarsubQuesitos(nomeSubquesito, notaSubequesito, quesitoId);
                res.json(subquesito);
            }
            catch (error) {
                console.error("Erro ao criar Subquesito", error);
                return res.status(400).json({ mensagem: "Erro ao criar o Subquesito. Verifique os dados fornecidos." });
            }
        });
    }
    atualizarsubQuesitos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
            }
            try {
                const subquesito = yield subquesito_service_1.default.atualizarsubQuesitos(Number(id), data);
                return res.status(200).json(subquesito);
            }
            catch (error) {
                console.error("Erro ao atualizar Subquesito", error);
                return res.status(400).json({ mensagem: "Erro ao atualizar o Subquesito. Verifique os dados fornecidos." });
            }
        });
    }
    buscarSubQuesitoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const subquesito = yield subquesito_service_1.default.buscarSubQuesitoPorId(Number(id));
                if (!subquesito) {
                    return res.status(404).json({ mensagem: "Subquesito não encontrado." });
                }
                return res.json(subquesito);
            }
            catch (error) {
                console.error("Erro ao buscar Subquesito", error);
                return res.status(400).json({ mensagem: "Erro ao buscar o Subquesito. Verifique os dados fornecidos." });
            }
        });
    }
    buscarSubQuesitos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subquesitos = yield subquesito_service_1.default.buscarSubQuesitos();
                return res.json(subquesitos);
            }
            catch (error) {
                console.error("Erro ao buscar Subquesitos", error);
                return res.status(400).json({ mensagem: "Erro ao buscar os Subquesitos. Verifique os dados fornecidos." });
            }
        });
    }
    deletarSubQuesito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield subquesito_service_1.default.deletarSubQuesito(Number(id));
                return res.json({ mensagem: "Subquesito deletado com sucesso." });
            }
            catch (error) {
                console.error("Erro ao deletar Subquesito", error);
                return res.status(400).json({ mensagem: "Erro ao deletar o Subquesito. Verifique os dados fornecidos." });
            }
        });
    }
}
exports.default = new SubquesitoController();
