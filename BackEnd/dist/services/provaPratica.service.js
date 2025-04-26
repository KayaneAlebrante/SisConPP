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
const prisma = new client_1.PrismaClient();
class ProvaPraticaService extends prova_service_1.default {
    constructor(prisma) {
        super(prisma);
        this.prisma = prisma;
    }
    criarProvaPratica(nomeProva, notaMaxima, categorias, blocodProva) {
        return __awaiter(this, void 0, void 0, function* () {
            const prova = yield this.criarProva(nomeProva, notaMaxima, categorias);
            try {
                const provaPratica = yield this.prisma.provaPratica.create({
                    data: {
                        provaId: prova.idProva,
                        blocosProvas: {
                            connect: blocodProva.map(id => ({ idBloco: id }))
                        },
                    }
                });
                return provaPratica;
            }
            catch (error) {
                console.error("Erro ao criar prova prática:", error);
                throw new Error("Erro ao criar prova prática. Verifique os dados fornecidos.");
            }
        });
    }
    buscarProvaPraticaPorId(idProvaPratica) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provaPratica = yield this.prisma.provaPratica.findUnique({
                    where: { idProvaPratica }
                });
                return provaPratica;
            }
            catch (error) {
                console.error("Erro ao listar prova prática:", error);
                throw new Error("Erro ao listar prova prática.");
            }
        });
    }
    buscarProvasPraticas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provasPraticas = yield this.prisma.provaPratica.findMany();
                return provasPraticas;
            }
            catch (error) {
                console.error("Erro ao listar provas práticas:", error);
                throw new Error("Erro ao listar provas práticas.");
            }
        });
    }
    atualizarProvaPratica(idProvaPratica, data, provaData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const provaPratica = yield this.prisma.provaPratica.update({
                    where: { idProvaPratica },
                    data: {
                        blocosProvas: {
                            set: ((_a = data.blocosProvas) === null || _a === void 0 ? void 0 : _a.map(id => ({ idBloco: id }))) || [],
                        },
                    },
                });
                if (provaData && provaPratica.provaId) {
                    const prova = yield this.atualizarProva(provaPratica.provaId, provaData);
                    return { provaPratica, prova };
                }
                return provaPratica;
            }
            catch (error) {
                console.error("Erro ao atualizar prova prática:", error);
                throw new Error("Erro ao atualizar prova prática. Verifique os dados fornecidos.");
            }
        });
    }
}
const provaPraticaService = new ProvaPraticaService(prisma);
exports.default = provaPraticaService;
