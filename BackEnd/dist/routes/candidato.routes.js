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
const candidato_controller_1 = __importDefault(require("../controllers/candidato.controller"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidato_controller_1.default.criarCandidato(req, res);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidato_controller_1.default.atualizarCandidato(req, res);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidato_controller_1.default.buscarCandidatoPorId(req, res);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidato_controller_1.default.buscarCandidatos(req, res);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidato_controller_1.default.deletarCandidato(req, res);
}));
router.post("/:id/anexos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidato_controller_1.default.anexarAnexos(req, res);
}));
router.get("/:id/anexos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidato_controller_1.default.visualizarAnexos(req, res);
}));
router.put("/:id/anexos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidato_controller_1.default.editarAnexos(req, res);
}));
exports.default = router;
