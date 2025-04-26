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
class FichaCandidatoService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    criarFichaCandidato(candidatoId, provaId, concursoId, categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fichaCandidato = yield this.prisma.fichaCandidato.create({
                    data: {
                        candidatoId,
                        provaId,
                        concursoId,
                        categoriaId,
                    }
                });
                return fichaCandidato;
            }
            catch (error) {
                console.error("Erro ao criar ficha do candidato:", error);
                throw new Error("Erro ao criar ficha do candidato");
            }
        });
    }
    anexarProvaTeorica(idFicha, candidatoId, numAcertosProvaTeorica, anexoGabarito, notaRedacao, anexoRedacao) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fichaCandidato = yield this.prisma.fichaCandidato.update({
                    where: {
                        idFicha: idFicha,
                        candidatoId: candidatoId
                    },
                    data: {
                        numAcertosProvaTeorica,
                        anexoGabarito,
                        notaRedacao,
                        anexoRedacao
                    }
                });
                return fichaCandidato;
            }
            catch (error) {
                console.error("Erro ao anexar prova teórica:", error);
                throw new Error("Erro ao anexar prova teórica");
            }
        });
    }
    anexarTermodeCiencia(idFicha, candidatoId, anexoTermodeCiencia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fichaCandidato = yield this.prisma.fichaCandidato.update({
                    where: {
                        idFicha: idFicha,
                        candidatoId: candidatoId
                    },
                    data: {
                        anexoTermodeCiencia,
                        dataTermo: new Date()
                    }
                });
                return fichaCandidato;
            }
            catch (error) {
                console.error("Erro ao anexar termo de ciência:", error);
                throw new Error("Erro ao anexar termo de ciência");
            }
        });
    }
    somarNotas(idFicha, candidatoId, avaliacoes, notaProvaTeorica, notaRedacao) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const somaAvaliacoes = avaliacoes.reduce((acc, curr) => acc + curr, 0);
                const notaFinal = somaAvaliacoes + notaProvaTeorica + notaRedacao;
                const fichaCandidato = yield this.prisma.fichaCandidato.update({
                    where: {
                        idFicha: idFicha,
                        candidatoId: candidatoId
                    },
                    data: {
                        notaCandidato: notaFinal,
                    }
                });
                return fichaCandidato;
            }
            catch (error) {
                console.error("Erro ao somar notas:", error);
                throw new Error("Erro ao somar notas");
            }
        });
    }
}
