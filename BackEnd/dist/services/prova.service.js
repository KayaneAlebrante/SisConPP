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
class ProvaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    criarProva(nomeProva, notaMaxima, categorias) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prova = yield this.prisma.prova.create({
                    data: {
                        nomeProva,
                        notaMaxima,
                        categorias: {
                            connect: categorias.map(id => ({ idCategoria: id }))
                        },
                    }
                });
                return prova;
            }
            catch (error) {
                console.error("Erro ao criar Prova:", error);
                throw error;
            }
        });
    }
    atualizarProva(idProva, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prova = yield this.prisma.prova.update({
                    where: { idProva: idProva },
                    data: {
                        nomeProva: data.nomeProva,
                        categorias: data.categorias ? {
                            set: data.categorias
                        } : undefined
                    },
                });
                return prova;
            }
            catch (error) {
                throw new Error("Erro ao atualizar Prova. Verefique os dados fornecidos.");
            }
        });
    }
    buscarProvas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provas = yield this.prisma.prova.findMany();
                return provas;
            }
            catch (error) {
                throw new Error("Erro ao buscar provas.");
            }
        });
    }
    deletarProvas(idProva) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prova = yield this.prisma.prova.delete({
                    where: { idProva: idProva },
                });
            }
            catch (error) {
                throw new Error("Erro ao deltar Prova.");
            }
        });
    }
}
exports.default = ProvaService;
