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
const usuario_controller_1 = __importDefault(require("../controllers/usuario.controller"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_controller_1.default.criarUsuario(req, res);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_controller_1.default.atualizarUsuario(req, res);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_controller_1.default.buscarUsuarioPorId(req, res);
}));
router.get('/avaliadores', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_controller_1.default.buscarUsuariosAvaliadores(req, res);
}));
router.get('/secretarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_controller_1.default.buscarUsuariosSecretarios(req, res);
}));
router.get('/auxiliares', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_controller_1.default.buscarUsuariosAuxiliares(req, res);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_controller_1.default.buscarUsuarios(req, res);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_controller_1.default.deletarUsuario(req, res);
}));
exports.default = router;
