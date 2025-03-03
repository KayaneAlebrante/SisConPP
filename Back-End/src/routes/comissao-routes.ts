import express, { Request, Response } from "express";
import comissaoController from "../controllers/comissao-controller";

const router = express.Router();

router.post("/", async(req: Request, res: Response) => {
    await comissaoController.criarComissao(req, res);
});

router.put("/:id", async(req:Request, res: Response) => {
    await comissaoController.atualziarComissao(req, res);
});

router.get("/:id", async(req:Request, res: Response) => {
    await comissaoController.buscarComissaoPorId(req, res);
});

router.get("/", async(req:Request, res: Response) => {
    await comissaoController.buscarTodasComissoes(req, res);
});

router.delete("/:id", async(req: Request, res: Response) => {
    await comissaoController.deletarComissao(req, res);
});




export default router;