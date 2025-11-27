import express, { Request, Response } from "express";
import comissaoController from "../controllers/comissao.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/avaliador", authMiddleware, async (req: Request, res: Response) => {
    await comissaoController.adicionarAvaliadorComissao(req, res);
});

router.post("/auxiliar", authMiddleware, async (req: Request, res: Response) => {
    await comissaoController.adicionarAuxiliarComissao(req, res);
});

router.get("/usuarios", authMiddleware, async (req: Request, res: Response) => {
    await comissaoController.listarUsuariosComissao(req, res);
});

router.delete("/usuario/:usuarioId/:comissaoId", authMiddleware,  async (req: Request, res: Response) => {
    await comissaoController.deletarUsuarioComissao(req, res);
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    await comissaoController.criarComissao(req, res);
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    await comissaoController.atualizarComissao(req, res);
});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
    await comissaoController.buscarComissaoPorId(req, res);
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    await comissaoController.buscarTodasComissoes(req, res);
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    await comissaoController.deletarComissao(req, res);
});

export default router;
