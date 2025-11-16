import express, { Request, Response } from "express";
import comissaoController from "../controllers/comissao.controller";

const router = express.Router();

router.post("/avaliador", async (req: Request, res: Response) => {
    await comissaoController.adicionarAvaliadorComissao(req, res);
});

router.post("/auxiliar", async (req: Request, res: Response) => {
    await comissaoController.adicionarAuxiliarComissao(req, res);
});

router.get("/usuarios", async (req: Request, res: Response) => {
    await comissaoController.listarUsuariosComissao(req, res);
});

router.delete("/usuario/:usuarioId/:comissaoId", async (req: Request, res: Response) => {
    await comissaoController.deletarUsuarioComissao(req, res);
});

router.post("/", async (req: Request, res: Response) => {
    await comissaoController.criarComissao(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
    await comissaoController.atualizarComissao(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
    await comissaoController.buscarComissaoPorId(req, res);
});

router.get("/", async (req: Request, res: Response) => {
    await comissaoController.buscarTodasComissoes(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
    await comissaoController.deletarComissao(req, res);
});

export default router;
