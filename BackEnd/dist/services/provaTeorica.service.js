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
const prova_service_1 = __importDefault(require("./prova.service"));
const prisma = new client_1.PrismaClient;
class ProvaTeoricaService extends prova_service_1.default {
    constructor(prisma) {
        super(prisma);
        this.prisma = prisma;
    }
    criarProvaTeorica(nome, notaMaxima, categorias, gabaritoOficial, numQuestao) {
        return __awaiter(this, void 0, void 0, function* () {
            const prova = yield this.criarProva(nome, notaMaxima, categorias);
            try {
                const provaTeorica = yield this.prisma.provaTeorica.create({
                    data: {
                        provaId: prova.idProva,
                        gabaritoOficinal: gabaritoOficial,
                        numQuestao,
                    }
                });
                return provaTeorica;
            }
            catch (error) {
                console.error("Erro ao criar prova Teorica:", error);
                throw new Error("Erro ao criar prova Teorica. Verifique os dados fornecidos.");
            }
        });
    }
    buscarProvaTeoricaPorId(provaTeoricaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provaTeorica = yield this.prisma.provaTeorica.findUnique({
                    where: { idprovaTeorica: provaTeoricaId }
                });
                return provaTeorica;
            }
            catch (error) {
                console.error("Erro ao listar prova Teorica:", error);
                throw new Error("Erro ao listar prova Teorica.");
            }
        });
    }
    buscarProvasTeoricas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provasTeoricas = yield this.prisma.provaTeorica.findMany();
                return provasTeoricas;
            }
            catch (error) {
                console.error("Erro ao listar provas Teoricas:", error);
                throw new Error("Erro ao listar provas Teoricas.");
            }
        });
    }
    atualizarProvaTeorica(provaTeoricaId, data, provaData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provaTeorica = yield this.prisma.provaTeorica.update({
                    where: { idprovaTeorica: provaTeoricaId },
                    data: {
                        gabaritoOficinal: data.gabaritoOficinal,
                        numQuestao: data.numQuestao
                    },
                });
                if (provaData && provaTeorica.provaId) {
                    const prova = yield this.atualizarProva(provaTeorica.provaId, provaData);
                    return { provaTeorica, prova };
                }
                return provaTeorica;
            }
            catch (error) {
                throw new Error("Erro ao atualizar Prova Teorica. Verefique os dados fornecidos.");
            }
        });
    }
}
const provaTeoricaService = new ProvaTeoricaService(prisma);
exports.default = provaTeoricaService;
