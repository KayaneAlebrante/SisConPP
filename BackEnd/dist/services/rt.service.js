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
class RTService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    criarRT(nomeRT, numeroRT) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rt = yield this.prisma.rT.create({
                    data: {
                        nomeRT: nomeRT,
                        numeroRT: numeroRT,
                    },
                });
                return rt;
            }
            catch (error) {
                throw new Error("Erro ao criar RT. Verifique os dados fornecidos.");
            }
        });
    }
    atualizarRT(idRt, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rt = yield this.prisma.rT.update({
                    where: { idRT: idRt },
                    data: data,
                });
                return rt;
            }
            catch (error) {
                throw new Error("Erro ao atualizar RT. Verifique os dados fornecidos.");
            }
        });
    }
    buscarRTPorId(idRt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rt = yield this.prisma.rT.findUnique({
                    where: { idRT: idRt },
                });
                return rt;
            }
            catch (error) {
                throw new Error("Erro ao buscar RT.");
            }
        });
    }
    buscarRTs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rt = yield this.prisma.rT.findMany();
                return rt;
            }
            catch (error) {
                throw new Error("Erro ao buscar RTs.");
            }
        });
    }
    deletarRT(idRt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rt = yield this.prisma.rT.delete({
                    where: { idRT: idRt },
                });
                return rt;
            }
            catch (error) {
                throw new Error("Erro ao deletar RT.");
            }
        });
    }
}
const rtService = new RTService(prisma);
exports.default = rtService;
