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
class CTGService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    criarCTG(nomeCTG, RTId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ctg = yield this.prisma.cTG.create({
                    data: {
                        nomeCTG: nomeCTG,
                        RTid: RTId,
                    },
                });
                return ctg.idCTG;
            }
            catch (error) {
                throw new Error("Erro ao criar CTG. Verifique os dados fornecidos.");
            }
        });
    }
    atualizarCTG(idCTG, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ctg = yield this.prisma.cTG.update({
                    where: { idCTG: idCTG },
                    data: data,
                });
                return ctg;
            }
            catch (error) {
                throw new Error("Erro ao atualizar CTG. Verifique os dados fornecidos.");
            }
        });
    }
    buscarCTGPorId(idCTG) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ctg = yield this.prisma.cTG.findUnique({
                    where: { idCTG: idCTG },
                });
                return ctg;
            }
            catch (error) {
                throw new Error("Erro ao buscar CTG.");
            }
        });
    }
    buscarCTGs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ctg = yield this.prisma.cTG.findMany();
                return ctg;
            }
            catch (error) {
                throw new Error("Erro ao buscar CTGs.");
            }
        });
    }
    deletarCTG(idCTG) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ctg = yield this.prisma.cTG.delete({
                    where: { idCTG: idCTG },
                });
                return ctg;
            }
            catch (error) {
                throw new Error("Erro ao deletar CTG.");
            }
        });
    }
}
const ctgService = new CTGService(prisma);
exports.default = ctgService;
