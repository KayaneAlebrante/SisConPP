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
const preferenciaSorteioDanca_service_1 = __importDefault(require("./preferenciaSorteioDanca.service"));
const prisma = new client_1.PrismaClient();
class SorteioDanca {
    realizarSorteio(candidatoId, usuarioId, tipoDanca) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((yield preferenciaSorteioDanca_service_1.default.verificarSorteioDancaId(candidatoId, tipoDanca)) === true) {
                    return { message: "Sorteio já realizado para este candidato." };
                }
                const preferencias = yield prisma.preferenciaSorteioDanca.findMany({
                    where: {
                        candidatoId,
                        nomeSorteioDanca: tipoDanca,
                    },
                    include: { quesitos: true },
                });
                if (!preferencias || preferencias.length === 0) {
                    throw new Error("Nenhuma preferência encontrada para o candidato com o tipo de dança especificado.");
                }
                const todosQuesitos = preferencias.flatMap(preferencia => preferencia.quesitos.map(quesito => ({
                    idQuesito: quesito.idQuesito,
                    nomeQuesito: quesito.nomeQuesito,
                })));
                if (todosQuesitos.length === 0) {
                    throw new Error("Nenhum quesito encontrado nas preferências do candidato.");
                }
                const sorteioIndex = Math.floor(Math.random() * todosQuesitos.length);
                const quesitoSorteado = todosQuesitos[sorteioIndex];
                const sorteio = yield prisma.sorteioDanca.create({
                    data: {
                        resultadoSorteio: quesitoSorteado.idQuesito,
                        dataSorteio: new Date(),
                        candidatoId,
                        usuarioId,
                        tipoDanca
                    },
                });
                preferenciaSorteioDanca_service_1.default.atualizarSorteioDancaId(candidatoId, sorteio.idSorteio, tipoDanca);
                return {
                    message: "Sorteio realizado com sucesso.",
                    sorteio,
                    quesitoSorteado
                };
            }
            catch (error) {
                console.error("Erro ao realizar sorteio de dança:", error);
                throw new Error("Erro ao realizar sorteio de dança: " + error.message);
            }
        });
    }
}
const sorteioDanca = new SorteioDanca();
exports.default = sorteioDanca;
