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
const recurso_service_1 = __importDefault(require("../services/recurso.service"));
class RecursoController {
    solicitarRecurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nomeRecurso, justificativa, arquivo, candidato, avaliador, quesitoRecurso, provaTeoricaIdprovaTeorica, provaPraticaIdProvaPratica } = req.body;
            if (!nomeRecurso || !justificativa || !arquivo || !candidato || !avaliador || !quesitoRecurso) {
                return res.status(400).json({ mensagem: "Nome do recurso, justificativa, arquivo, candidato, avaliador e quesito do recurso são obrigatórios." });
            }
            try {
                const recurso = yield recurso_service_1.default.solicitarRecurso(nomeRecurso, justificativa, arquivo, candidato, avaliador, quesitoRecurso, provaTeoricaIdprovaTeorica, provaPraticaIdProvaPratica);
                return res.status(201).json(recurso);
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
    listarRecursos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recursos = yield recurso_service_1.default.listarRecursos();
                return res.status(200).json(recursos);
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
    visualizarRecursoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const recurso = yield recurso_service_1.default.visualizarRecursoPorId(Number(id));
                if (!recurso) {
                    return res.status(404).json({ mensagem: "Recurso não encontrado." });
                }
                return res.status(200).json(recurso);
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
    alterarStatusRecurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            if (status === undefined) {
                return res.status(400).json({ mensagem: "Status é obrigatório." });
            }
            try {
                const recurso = yield recurso_service_1.default.alterarStatusRecurso(Number(id), status);
                return res.status(200).json(recurso);
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
exports.default = new RecursoController();
