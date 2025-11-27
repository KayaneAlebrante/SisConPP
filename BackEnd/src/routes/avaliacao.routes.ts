import express, { Request, Response } from "express";
import avaliacaoController from "../controllers/avaliacao.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.adicionarAvaliacao(req, res);
});

router.get("/avaliacao/:idAvaliacao", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.visualizarAvaliacoes(req, res);
});

router.put("/avaliacao/:idAvaliacao", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.editarAvaliacao(req, res);
});

export default router;