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
const subquesito_controller_1 = __importDefault(require("../controllers/subquesito.controller"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield subquesito_controller_1.default.criarsubQuesitos(req, res);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield subquesito_controller_1.default.atualizarsubQuesitos(req, res);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield subquesito_controller_1.default.buscarSubQuesitoPorId(req, res);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield subquesito_controller_1.default.buscarSubQuesitos(req, res);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield subquesito_controller_1.default.deletarSubQuesito(req, res);
}));
exports.default = router;
