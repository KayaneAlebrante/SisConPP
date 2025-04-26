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
class Avaliacao {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    adicionarAvaliacao(comissaoId, avaliadorId, candidatoId, provaId, blocoProvaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const avaliacao = yield this.prisma.avaliacao.create({
                    data: {
                        dataAvaliacao: new Date(),
                        comissaoId,
                        avaliadorId,
                        candidatoId,
                        provaId,
                        blocoProvaId,
                        nota: 0,
                    },
                });
                return avaliacao;
            }
            catch (error) {
                throw new Error(`Erro ao adicionar avaliação: ${error}`);
            }
        });
    }
    editarAvaliacao(idAvalicao, avaliadorId, candidatoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const avaliacao = yield this.prisma.avaliacao.update({
                    where: { idAvalicao, candidatoId },
                    data: { avaliadorId },
                });
                return avaliacao;
            }
            catch (error) {
                throw new Error(`Erro ao editar avaliação: ${error}`);
            }
        });
    }
    visualizarAvaliacoes(candidatoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const avaliacoes = yield this.prisma.avaliacao.findMany({
                    where: { candidatoId },
                });
                return avaliacoes;
            }
            catch (error) {
                throw new Error(`Erro ao visualizar avaliações: ${error}`);
            }
        });
    }
}
const avaliacao = new Avaliacao();
exports.default = avaliacao;
