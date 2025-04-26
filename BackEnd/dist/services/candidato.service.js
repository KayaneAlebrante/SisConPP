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
const pessoa_service_1 = __importDefault(require("./pessoa.service"));
const prisma = new client_1.PrismaClient();
class CandidatoService extends pessoa_service_1.default {
    constructor(prisma) {
        super(prisma);
    }
    criarCandidato(nomeCompleto, cidade, estado, CTGId, numCarteirinha, categoriaId, CPF, RG, endereco, numEndereco, bairro, escolaridade, filiacao, ProvaCampeiraEsportiva, concursoId, anexoDocumento, anexoCarteirinha, anexoEscolaridade, anexoResidencia, anexoAtaConcurso, fichaInscricao, anexoTermoCandidato, anexoRelatorioVivencia, anexoResponsavel, anexoProvaEsportivaCampeira) {
        return __awaiter(this, void 0, void 0, function* () {
            const pessoaId = yield this.criarPessoa(nomeCompleto, cidade, estado, CTGId, numCarteirinha);
            const pessoaExistente = yield this.prisma.pessoa.findUnique({
                where: { idPessoa: pessoaId.idPessoa },
                include: { Usuario: true, Candidato: true },
            });
            if ((pessoaExistente === null || pessoaExistente === void 0 ? void 0 : pessoaExistente.Usuario) || (pessoaExistente === null || pessoaExistente === void 0 ? void 0 : pessoaExistente.Candidato)) {
                throw new Error("Esta pessoa já está associada a um usuário ou candidato.");
            }
            try {
                const candidato = yield this.prisma.candidato.create({
                    data: {
                        pessoaId: pessoaId.idPessoa,
                        CPF,
                        RG,
                        endereco,
                        numEndereco,
                        bairro,
                        escolaridade,
                        filiacao,
                        ProvaCampeiraEsportiva,
                        anexoDocumento,
                        anexoCarteirinha,
                        anexoEscolaridade,
                        anexoResidencia,
                        anexoAtaConcurso,
                        fichaInscricao,
                        anexoTermoCandidato,
                        anexoRelatorioVivencia,
                        anexoResponsavel,
                        anexoProvaEsportivaCampeira,
                        concursoId,
                        categoriaId
                    }
                });
                console.log("Candidato Criado con sucesso");
                return { candidato, pessoaId };
            }
            catch (error) {
                console.error("Erro detalhado:", error);
                throw new Error("Erro ao criar candidato. Verifique os dados fornecidos.");
            }
        });
    }
    atualizarCandidato(idCandidato, data, pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidato = yield this.prisma.candidato.update({
                    where: { idCandidato },
                    data,
                    include: { Pessoa: true },
                });
                if (pessoaData && candidato.pessoaId) {
                    const pessoa = yield this.atualizarPessoa(candidato.pessoaId, pessoaData);
                    return { candidato, pessoa };
                }
                return candidato;
            }
            catch (error) {
                console.error(error);
                throw new Error("Erro ao atualizar candidato. Verifique os dados fornecidos.");
            }
        });
    }
    buscarCandidatoPorId(idCandidato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidato = yield this.prisma.candidato.findUnique({
                    where: { idCandidato: idCandidato }
                });
                return candidato;
            }
            catch (error) {
                throw new Error("Erro ao buscar candidato.");
            }
        });
    }
    buscarCandidatos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidatos = yield this.prisma.candidato.findMany();
                return candidatos;
            }
            catch (error) {
                throw new Error("Erro ao buscar candidatos.");
            }
        });
    }
    deletarCandidato(idCandidato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("IdCandidato:", idCandidato);
                const candidato = yield this.prisma.candidato.findUnique({
                    where: { idCandidato },
                    include: { Pessoa: true },
                });
                if (!candidato) {
                    throw new Error("Candidato não encontrado.");
                }
                const idPessoa = candidato.pessoaId;
                yield this.prisma.candidato.delete({
                    where: { idCandidato },
                });
                if (idPessoa) {
                    yield this.deletarPessoa(idPessoa);
                    console.log("Pessoa Deletada com Sucesso!");
                }
                return { mensagem: "Candidato deletado com sucesso." };
            }
            catch (error) {
                console.error(error);
                throw new Error("Erro ao deletar candidato.");
            }
        });
    }
    anexarAnexos(idCandidato, anexos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidato = yield this.prisma.candidato.update({
                    where: { idCandidato: idCandidato },
                    data: anexos
                });
                return candidato;
            }
            catch (error) {
                throw new Error("Erro ao anexar anexos.");
            }
        });
    }
    visualizarAnexos(idCandidato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidato = yield this.prisma.candidato.findUnique({
                    where: { idCandidato: idCandidato }
                });
                if (candidato) {
                    return {
                        anexoDocumento: candidato.anexoDocumento,
                        anexoCarteirinha: candidato.anexoCarteirinha,
                        anexoEscolaridade: candidato.anexoEscolaridade,
                        anexoResidencia: candidato.anexoResidencia,
                        anexoAtaConcurso: candidato.anexoAtaConcurso,
                        fichaInscricao: candidato.fichaInscricao,
                        anexoTermoCandidato: candidato.anexoTermoCandidato,
                        anexoRelatorioVivencia: candidato.anexoRelatorioVivencia,
                        anexoResponsavel: candidato.anexoResponsavel,
                        anexoProvaEsportivaCampeira: candidato.anexoProvaEsportivaCampeira
                    };
                }
                else {
                    throw new Error("Candidato não encontrado.");
                }
            }
            catch (error) {
                throw new Error("Erro ao visualizar anexos.");
            }
        });
    }
    editarAnexos(idCandidato, anexos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidato = yield this.prisma.candidato.update({
                    where: { idCandidato: idCandidato },
                    data: anexos
                });
                return candidato;
            }
            catch (error) {
                throw new Error("Erro ao editar anexos.");
            }
        });
    }
}
const candidatoService = new CandidatoService(prisma);
exports.default = candidatoService;
