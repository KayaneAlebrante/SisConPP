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
const ctg_service_1 = __importDefault(require("../services/ctg.service"));
class CTGController {
    criarCTG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nomeCTG, RTId } = req.body;
            if (!nomeCTG || !RTId) {
                return res.status(400).json({ mensagem: "Nome CTG e número CTG são obrigatórios." });
            }
            try {
                const ctg = yield ctg_service_1.default.criarCTG(nomeCTG, RTId);
                return res.status(201).json(ctg);
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
    atualizarCTG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
            }
            try {
                const ctg = yield ctg_service_1.default.atualizarCTG(Number(id), data);
                return res.status(200).json(ctg);
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
    buscarCTGPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const ctg = yield ctg_service_1.default.buscarCTGPorId(Number(id));
                if (!ctg) {
                    return res.status(404).json({ mensagem: "CTG não encontrado." });
                }
                return res.status(200).json(ctg);
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
    buscarCTGs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ctgs = yield ctg_service_1.default.buscarCTGs();
                return res.status(200).json(ctgs);
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
    deletarCTG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield ctg_service_1.default.deletarCTG(Number(id));
                return res.status(200).json({ mensagem: "CTG deletado com sucesso." });
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
exports.default = new CTGController();
