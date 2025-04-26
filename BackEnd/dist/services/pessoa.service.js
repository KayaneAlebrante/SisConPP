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
class PessoaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    criarPessoa(nomeCompleto, cidade, estado, CTGId, numCarteirinha) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("CTG ID:", CTGId);
            try {
                const ctgExiste = yield this.prisma.cTG.findUnique({
                    where: { idCTG: CTGId }
                });
                if (!ctgExiste) {
                    throw new Error('CTG não encontrado');
                }
                const pessoa = yield this.prisma.pessoa.create({
                    data: {
                        nomeCompleto,
                        cidade,
                        estado,
                        CTG: {
                            connect: { idCTG: CTGId }
                        },
                        numCarteirinha: numCarteirinha !== null && numCarteirinha !== void 0 ? numCarteirinha : ''
                    }
                });
                return pessoa;
            }
            catch (error) {
                console.error("Erro ao criar pessoa:", error);
                throw error;
            }
        });
    }
    atualizarPessoa(idPessoa, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pessoa = yield this.prisma.pessoa.update({
                    where: { idPessoa: idPessoa },
                    data: data
                });
                return pessoa;
            }
            catch (error) {
                throw new Error("Erro ao atualizar pessoa. Verifique os dados fornecidos.");
            }
        });
    }
    buscarPessoaPorId(idPessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pessoa = yield this.prisma.pessoa.findUnique({
                    where: { idPessoa: idPessoa }
                });
                return pessoa;
            }
            catch (error) {
                throw new Error("Erro ao buscar pessoa.");
            }
        });
    }
    buscarPessoas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pessoas = yield this.prisma.pessoa.findMany();
                return pessoas;
            }
            catch (error) {
                throw new Error("Erro ao buscar pessoas.");
            }
        });
    }
    deletarPessoa(idPessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.pessoa.delete({
                    where: { idPessoa: idPessoa }
                });
                return { message: 'Pessoa deletada com sucesso.' };
            }
            catch (error) {
                console.error('Erro ao deletar pessoa:', error);
                throw new Error(`Erro ao deletar pessoa: ${error.message}`);
            }
        });
    }
}
exports.default = PessoaService;
