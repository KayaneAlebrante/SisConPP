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
const prisma = new client_1.PrismaClient;
class RecursoServie {
    constructor(prisma) {
        this.prisma = prisma;
    }
    solicitarRecurso(nomeRecurso, justificativa, arquivo, candidato, avaliador, quesitoRecurso, provaTeoricaIdprovaTeorica, provaPraticaIdProvaPratica) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recurso = yield this.prisma.recurso.create({
                    data: {
                        nomeRecurso,
                        justificativa,
                        status: false,
                        dataRecurso: new Date(),
                        arquivos: arquivo,
                        candidato,
                        avaliador,
                        quesitoRecurso,
                        provaTeoricaIdprovaTeorica,
                        provaPraticaIdProvaPratica
                    },
                });
                return recurso;
            }
            catch (error) {
                console.error("Erro ao criar recurso:", error);
                throw new Error("Erro ao criar recurso. Verifique os dados fornecidos.");
            }
        });
    }
    listarRecursos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recursos = yield this.prisma.recurso.findMany();
                return recursos;
            }
            catch (error) {
                console.error("Erro ao listar recursos:", error);
                throw new Error("Erro ao listar recursos.");
            }
        });
    }
    visualizarRecursoPorId(idRecurso) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recurso = yield this.prisma.recurso.findUnique({
                    where: { idRecurso }
                });
                return recurso;
            }
            catch (error) {
                console.error("Erro ao listar recurso:", error);
                throw new Error("Erro ao listar recurso.");
            }
        });
    }
    alterarStatusRecurso(idRecurso, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recurso = yield this.prisma.recurso.update({
                    where: { idRecurso },
                    data: { status }
                });
                return recurso;
            }
            catch (error) {
                console.error("Erro ao alterar status do recurso:", error);
                throw new Error("Erro ao alterar status do recurso.");
            }
        });
    }
}
const recursoService = new RecursoServie(prisma);
exports.default = recursoService;
