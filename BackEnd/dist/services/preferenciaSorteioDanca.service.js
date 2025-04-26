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
class PreferenciaSorteioDancaService {
    selecionarPreferenciaSorteioDanca(nomeSorteioDanca, candidatoId, quesitos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const preferenciasCriadas = yield prisma.preferenciaSorteioDanca.create({
                    data: {
                        nomeSorteioDanca,
                        candidatoId,
                        quesitos: {
                            connect: quesitos.map(id => ({ idQuesito: id })),
                        },
                    },
                });
                return preferenciasCriadas;
            }
            catch (error) {
                throw new Error("Erro ao criar preferências de sorteio de dança: " + error.message);
            }
        });
    }
    visualizarPreferencias(candidatoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferencias = yield prisma.preferenciaSorteioDanca.findMany({
                where: { candidatoId },
                include: { quesitos: true },
            });
            if (!preferencias)
                throw new Error("Nenhuma preferência encontrada");
            return preferencias;
        });
    }
    atualizarSorteioDancaId(candidatoId, sorteioDancaId, nomeSorteioDanca) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenciaAtualizada = yield prisma.preferenciaSorteioDanca.updateMany({
                where: {
                    candidatoId,
                    nomeSorteioDanca,
                },
                data: {
                    sorteioDancaId,
                },
            });
            return preferenciaAtualizada;
        });
    }
    verificarSorteioDancaId(candidatoId, tipoDanca) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sorteioDanca = yield prisma.preferenciaSorteioDanca.findFirst({
                    where: {
                        candidatoId,
                        nomeSorteioDanca: tipoDanca,
                        sorteioDancaId: { not: null },
                    },
                });
                return sorteioDanca !== null;
            }
            catch (error) {
                console.error("Erro ao verificar sorteio de dança:", error);
                throw new Error("Erro ao verificar sorteio de dança: " + error.message);
            }
        });
    }
}
const preferenciaSorteioDanca = new PreferenciaSorteioDancaService();
exports.default = preferenciaSorteioDanca;
