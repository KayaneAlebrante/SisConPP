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
const express_1 = __importDefault(require("express"));
const comissao_controller_1 = __importDefault(require("../controllers/comissao.controller"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield comissao_controller_1.default.criarComissao(req, res);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield comissao_controller_1.default.atualziarComissao(req, res);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield comissao_controller_1.default.buscarComissaoPorId(req, res);
}));
router.get("/comissoes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield comissao_controller_1.default.buscarTodasComissoes(req, res);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield comissao_controller_1.default.deletarComissao(req, res);
}));
router.post("/comissao/avaliador", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield comissao_controller_1.default.adicionarAvaliadorComissao(req, res);
}));
router.post("/comissao/auxiliar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield comissao_controller_1.default.adicionarAuxiliarComissao(req, res);
}));
router.get("/comissao/usuarios", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield comissao_controller_1.default.listarUsuariosComissao(req, res);
}));
router.delete("/comissao/usuario/:usuarioId/:comissaoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield comissao_controller_1.default.deletarUsuarioComissao(req, res);
}));
exports.default = router;
