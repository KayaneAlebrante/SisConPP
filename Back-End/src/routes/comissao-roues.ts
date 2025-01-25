import { Router } from "express";
import comissaoController from "../controllers/comissao-controller";

const router = Router();
/*
router.post("/comissoes", comissaoController.criarComissao);
router.post("/comissoes/usuario", comissaoController.adicionarUsuarioComissao);
router.post("/comissoes/auxiliar", comissaoController.adicionarAuxiliarComissao);
router.get("/comissoes/usuarios", comissaoController.listarUsuariosComissao);
router.delete("/comissoes/usuario/:usuarioId/:comissaoId", comissaoController.deletarUsuarioComissao);*/

export default router;