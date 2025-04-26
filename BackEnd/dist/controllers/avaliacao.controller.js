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
const avaliacao_service_1 = __importDefault(require("../services/avaliacao.service"));
class AvaliacaoController {
    adicionarAvaliacao(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { comissaoId, avaliadorId, candidatoId, provaId, blocoProvaId } = req.body;
            if (!comissaoId || !avaliadorId || !candidatoId || !provaId || !blocoProvaId) {
                return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
            }
            try {
                const avaliacao = yield avaliacao_service_1.default.adicionarAvaliacao(comissaoId, avaliadorId, candidatoId, provaId, blocoProvaId);
                return res.status(201).json(avaliacao);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Erro ao adicionar avaliação:", error);
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(500).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
    editarAvaliacao(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idAvalicao, candidatoId, avaliadorId } = req.body;
            if (!idAvalicao || !avaliadorId || !candidatoId) {
                return res.status(400).json({ mensagem: "Id da Avaliação e Id do Avaliador e Id Candidato são obrigatórios." });
            }
            try {
                const avaliacao = yield avaliacao_service_1.default.editarAvaliacao(idAvalicao, candidatoId, avaliadorId);
                return res.status(200).json(avaliacao);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Erro ao editar avaliação:", error);
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(500).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
    visualizarAvaliacoes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { candidatoId } = req.params;
            if (!candidatoId) {
                return res.status(400).json({ mensagem: "Id do Candidato é obrigatório." });
            }
            try {
                const avaliacoes = yield avaliacao_service_1.default.visualizarAvaliacoes(Number(candidatoId));
                return res.status(200).json(avaliacoes);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Erro ao visualizar avaliações:", error);
                    return res.status(400).json({ mensagem: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(500).json({ mensagem: "Erro desconhecido." });
                }
            }
        });
    }
}
exports.default = new AvaliacaoController();
