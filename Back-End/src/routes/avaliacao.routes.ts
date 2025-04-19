import express, { Request, Response } from "express";
import avaliacaoController from "../controllers/avaliacao.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await avaliacaoController.adicionarAvaliacao(req, res);
});

router.get("/avaliacao/:idAvaliacao", async (req: Request, res: Response) => {
    await avaliacaoController.visualizarAvaliacoes(req, res);
});

router.put("/avaliacao/:idAvaliacao", async (req: Request, res: Response) => {
    await avaliacaoController.editarAvaliacao(req, res);
});

export default router;