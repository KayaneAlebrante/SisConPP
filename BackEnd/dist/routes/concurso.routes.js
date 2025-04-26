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
const concurso_controller_1 = __importDefault(require("../controllers/concurso.controller"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield concurso_controller_1.default.criarConcurso(req, res);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield concurso_controller_1.default.atualizarConcurso(req, res);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield concurso_controller_1.default.buscarConcursoPorId(req, res);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield concurso_controller_1.default.buscarConcursos(req, res);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield concurso_controller_1.default.deletarConcurso(req, res);
}));
router.get("/:idConcurso/candidatos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield concurso_controller_1.default.bsucarCandidadosConcurso(req, res);
}));
router.put("/:id/anexo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield concurso_controller_1.default.anexarEdital(req, res);
}));
exports.default = router;
